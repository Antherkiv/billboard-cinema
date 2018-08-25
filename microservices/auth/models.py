from uuid import uuid4
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method

from utils.auth import make_password, check_password

from .db import engine

Base = declarative_base()


class User(Base):
    id = Column(UUID(as_uuid=True), default=uuid4, primary_key=True)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    _password = Column(String, nullable=False)

    __tablename__ = 'users'

    def __init__(self, email, password, full_name):
        self.email = email
        self.full_name = full_name
        self.password = password

    def __repr__(self):
        return '<User(email={self.email!r})>'.format(self=self)

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, plain_password):
        self._password = make_password(plain_password)

    @hybrid_method
    def check_password(self, plain_password):
        return check_password(plain_password, self.password)


Base.metadata.create_all(engine)
