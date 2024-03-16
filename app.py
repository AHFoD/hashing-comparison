import hashlib
import bcrypt

def hash_password(password):
    # MD5 hashing
    md5_hash = hashlib.md5(password.encode()).hexdigest()
    print(f"MD5 Hash: {md5_hash}")

    # Bcrypt hashing
    salt = bcrypt.gensalt()
    bcrypt_hash = bcrypt.hashpw(password.encode(), salt)
    print(f"Bcrypt Hash: {bcrypt_hash.decode()}")

if __name__ == "__main__":
    password = input("Enter a password: ")
    hash_password(password)