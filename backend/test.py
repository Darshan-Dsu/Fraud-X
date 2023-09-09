# import flast module
from flask import Flask, jsonify, request
import sqlite3 as sql
import requests, json
from bardapi import Bard
from flask_cors import CORS
import re

# instance of flask application
app = Flask(__name__)
CORS(app)
IP_DICT = {}


# home route that returns below text when root url is accessed
@app.route("/")
def home():
	return IP_DICT

@app.route("/bard_response", methods = ['POST'])
def bard_response():
    """_summary_ : This method return the bard response for specific question

    Returns:
        dict : response with dict of dict 
    """
    data = request.get_json()
    # print("data ",data)
    response = get_bard_response(data["question"])
    # print("response ",response)
    return response


def get_bard_response(question : str):
    """this method will take query in term of question value
    and return the data

    Args:
        question (str): query requested by the user side

    Returns:
        jsonify: data in json format
    """
    token = "agg7hswnoW1bIST5X_EhRoDJ-RrdO6EgpmI1QvoCjY8cDLbcQV6wIsWdX5U5VQGc7V5Uzg."
    check_prompt = False
    bard_response_ip={}
    splitted_sentance = question.split()
    for s in splitted_sentance:
        if s in str(IP_DICT).lower(): 
            check_prompt = True
            break
    if check_prompt :
        # print(question)
        question = str(question).replace("fraud score", "fraud_score")
        request = question+" in "+str(IP_DICT)
        response = (Bard(token=token).get_answer(str(request)))
        bard_response_ip = get_ip_from_response(str(response))
        # print(response['content'], bard_response_ip)
        if "assist" in response["content"] or "help" in response["content"]:
            data=jsonify(bard_response  =response["content"] , bard_response_ip = bard_response_ip)
            return data
    else:
        response = (Bard(token=token).get_answer(str(question)))
        
    # print(response['content'], bard_response_ip)
    # response = (Bard(token=token).get_answer(str(request)))
    data=jsonify(bard_response = response["content"], bard_response_ip = bard_response_ip)
    return data

def get_ip_from_response(response : str):
    """from response of bard api filtering only ip's

    Args:
        response (str): taking response from bard api

    Returns:
        dict: bard_response_ip contains ip adress and it parameters
    """
    bard_response_ip = {}

    ip_pattern = r'\b(?:\d{1,3}\.){3}\d{1,3}\b'

    ip_addresses = set(re.findall(ip_pattern, response))
    # print(ip_addresses)
    for ip in ip_addresses:
        if ip in IP_DICT:
            bard_response_ip.update({ip : IP_DICT[ip]})
    
    
    return bard_response_ip

def create_connection_to_db():
    """connecting to created DataBase

    Returns:
        Bool : cursor and connection if True/False
    """
    with sql.connect("fraud_database.db") as con:
        cur = con.cursor()
    return cur, con

def add_user(cur,con, easy_id, ip_address): 
    """
    adding data to add_user table
    """ 
    cur.execute("INSERT INTO user (easy_id,ip_address) VALUES (?,?)",(easy_id,ip_address) )
    
    con.commit()
    
    return True

def add_trans(cur,con,easy_id,transaction_id):
    """adding data to transaction table
    """
    cur.execute("INSERT INTO transactions (transaction_id,easy_id) VALUES (?,?)",(transaction_id,easy_id) )

    con.commit()
    
    return True

def def_list(cur,con):
    """
    listing out the data which are present in both tables
    """
    con.row_factory = sql.Row
    cur.execute("select * from user")
    rows = cur.fetchall()
    cur.execute("select * from transactions")
    rows = cur.fetchall()

    
    return True

def get_ipaddres(cur):
    #SQL query to get same key data with 2 different tables data
    cur.execute("select u.ip_address from user u where EXISTS (select t.easy_id from transactions t where  t.easy_id == u.easy_id)")
    
    ip_list = [] #to store ip list fetched by above query
    rows = cur.fetchall() #helps to get all the data
    
    for row in rows:
        for col in row:
            ip_list.append(col)
            
    return ip_list

def payment_transaction_fraud_prev(ip) -> dict:
    """Method used to lookup Payment & Transaction Fraud Prevention API 

    Args:
        ip (str): description
        vars (dict, optional): Reffer to https://www.ipqualityscore.com/documentation/proxy-detection/transaction-scoring for variables.. Defaults to {}.

    Returns:
        dict: description
    """
    
    generated_key = "NxHgcqOjPxBU03HXjcbgQ5a6liI1WwsN"
    # print("api ket ",generated_key)
    
    if not bool(vars):
        return {}

    url = "https://www.ipqualityscore.com/api/json/ip/%s/%s" %(generated_key, ip)
    # print("key ",generated_key, ip)
    x = requests.get(url)
    return (json.loads(x.text))

def format_ip_dict(get_ipaddres_list):
    final_list_ip = []
    for ip in get_ipaddres_list:
        splitted = str(ip).replace("(","")
        splitted = str(ip).replace(")","")
        splitted = str(ip).replace(",","")
        final_list_ip.append(splitted)
    
    for ip in final_list_ip:
        # print(payment_transaction_fraud_prev(ip))
        quality_ip=payment_transaction_fraud_prev(ip)
        if quality_ip["proxy"]==True:
            quality_ip["description"]="Comment/forum spam, HTTP referer spam, or other CMS spam."
        elif quality_ip["vpn"]==True:
            quality_ip["category"]="VPN IP"
            quality_ip["description"]="System using from particular IP but showing different geolocation to hide the location"
            
        IP_DICT.update({ip:quality_ip})
        
    return True


cur, con = create_connection_to_db()

get_ipaddres_list = get_ipaddres(cur)

state = format_ip_dict(get_ipaddres_list)

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=2025)

