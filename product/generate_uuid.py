import uuid

def generate_uuid():
    return str(uuid.uuid4()).__str__()

if __name__ == "__main__":
    print(generate_uuid())
