import time
import sys
from generate_uuid import generate_uuid
from get_ip import get_ip
import requests

print("Welcome to the product from *DAX_knoel*")

time.sleep(2)

if input("Do you want to register the product? (Y/n): ").lower() not in ["", " ", "  ", "   ", "    ", "y", "ye", "yes", "ys", "yse", "sye"]:
    sys.exit("The product is still unused.")

uuid = generate_uuid()
ip = get_ip()

if ip.startswith("Error"):
    sys.exit(ip)

check_pair_url = "https://license-file.onrender.com/check-pair"
send_pair_url = "https://license-file.onrender.com/send-pair"

payload = {
    "UUID": uuid,
    "ipAddress": ip
}

check_pair_response = requests.post(check_pair_url, json=payload)

if check_pair_response.status_code != 200:
    sys.exit(check_pair_response)

send_pair_response = requests.post(send_pair_url, payload)

if send_pair_response.status_code != 201:
    sys.exit(send_pair_response)

print("Successfully registered!")