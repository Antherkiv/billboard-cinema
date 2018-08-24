from argon2 import PasswordHasher

password_haser = PasswordHasher()


def make_password(plain_password):
    return password_haser.hash(plain_password)


def check_password(plain_password, hashed_password):
    from argon2.exceptions import VerifyMismatchError
    try:
        return password_haser.verify(hashed_password, plain_password)
    except VerifyMismatchError:
        return False
