import time
import sys
from generate_uuid import generate_uuid
from get_ip import get_ip
import requests

print("Welcome to the product from *DAX_knoel*")
time.sleep(2)
uuid = input("Your product key: ")

ip = get_ip()
if ip.startswith("Error"):
    sys.exit(ip)
print("ip:", ip)
check_uuid_url = "https://license-file.onrender.com/check-uuid"
send_pair_url = "https://license-file.onrender.com/send-pair"
check_pair_url = "https://license-file.onrender.com/check-pair"

check_uuid_response = requests.post(check_uuid_url, json={"UUID": uuid})
if check_uuid_response.status_code != 200:
    sys.exit("Wrong product key.")

payload = {
    "UUID": uuid,
    "ipAddress": ip
}

send_pair_response = requests.post(send_pair_url, json=payload)
if send_pair_response.status_code != 201:
    sys.exit(send_pair_response.json())

check_pair_response = requests.post(check_pair_url, json=payload)
if check_pair_response.status_code != 200:
    sys.exit(check_pair_response.json())

print("Successfully registered!")
time.sleep(5)