import sqlite3

conn = sqlite3.connect('fraud_database.db')
print("Opened database successfully")

conn.execute('CREATE TABLE IF NOT EXISTS user (easy_id INT PRIMARY KEY, ip_address VARCHAR(255))')
conn.execute('CREATE TABLE IF NOT EXISTS transactions (transaction_id VARCHAR(255) PRIMARY KEY, easy_id INT)')
print("Table created successfully")
conn.close()