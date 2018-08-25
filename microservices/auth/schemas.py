from marshmallow_sqlalchemy import ModelSchema
from .db import session
from .models import User

class UserSchema(ModelSchema):
    class Meta:
        model = User
        sqla_session = session

registration_user_schema = {
    'type': 'object',
    'properties': {
        'full_name': {
            "type" : "string",
        },
        'email': {
            "type" : "string",
            "format" : "email"
        },
        'password': {
            'type': 'string'
        },
    },
    'required': ['full_name', 'email', 'password']
}

login_user_schema = {
    'type': 'object',
    'properties': {
        'email': {
            "type" : "string",
            "format" : "email"
        },
        'password': {
            'type': 'string'
        },
    },
    'required': ['email', 'password']
}

