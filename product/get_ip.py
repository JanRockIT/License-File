import requests

def get_ip():
    try:
        response = requests.get('https://api.ipify.org?format=json')
        return response.json()['ip']
    except Exception as e:
        return f"Error while fetching ip-address: {e}"

if __name__ == "__main__":
    print(get_ip())
