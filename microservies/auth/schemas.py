from marshmallow_sqlalchemy import ModelSchema
from .db import session
from .models import User

class UserSchema(ModelSchema):
    class Meta:
        model = User
        sqla_session = session

user_schema = {
    'type': 'object',
    'properties': {
        'username': {
            "type" : "string",
            "format" : "email"
        },
        'password': {
            'type': 'string'
        },
    },
    'required': ['username', 'password']
}
