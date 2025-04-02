import time
import sys
from generate_uuid import generate_uuid
from get_ip import get_ip
import requests

print("Welcome to the product from *DAX_knoel*")

time.sleep(2)

if input("Do you want to register the product? (Y/n): ").lower not in ["", " ", "  ", "   ", "    ", "y", "ye", "yes", "ys", "yse", "sye"]:
    sys.exit("The product is still unused.")

uuid: str = generate_uuid()
ip: str = get_ip()

if ip.startswith("Error"):
    sys.exit(ip)

# request...
# logged in...