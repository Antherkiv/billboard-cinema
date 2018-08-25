from falcon.media.validators import jsonschema
from falcon import HTTP_200, HTTP_201, HTTP_401, HTTP_409

from sqlalchemy.sql import exists
from sqlalchemy.orm.exc import NoResultFound

from .schemas import registration_user_schema, login_user_schema
from .models import User
from .db import session


class Registration(object):
    @jsonschema.validate(registration_user_schema)
    def on_post(self, req, resp):
        media = req.media.copy()
        if session.query(
                exists().where(User.email == media['email'])).scalar():
            resp.media = {
                "description":
                "User exists on our system, please login instead of register",
                "title":
                "User exists"
            }

            resp.status = HTTP_409

        else:
            user = User(**media)
            session.add(user)
            session.commit()

            resp.media = {'id': str(user.id)}

            resp.status = HTTP_201


class Token(object):
    @jsonschema.validate(login_user_schema)
    def on_post(self, req, resp):
        media = req.media.copy()

        try:
            user = session.query(User).filter_by(email=media['email']).one()
        except NoResultFound:
            user = None

        if not (user and  user.check_password(media['password'])):
            resp.media = {
                "description":
                "User or password are incorrect",
                "title":
                "Unauthorized"
            }
            resp.status = HTTP_401

        else:
            from jose import jwt
            # FIXME: We need to provide a RSA KEY, for development porpouses  I don't
            token = jwt.encode({'user': str(user.id)}, 'dracula', algorithm='HS256')
            resp.set_cookie('access_token', token, domain='localhost')

            resp.media = {'access_token': token, 'token_type': 'Bearer'}

            resp.status = HTTP_201

class WhoAmI(object):
    def on_get(self, req, resp, jwt_claims):
        user_id = jwt_claims['user']
        try:
            user = session.query(User).filter_by(id=user_id).one()
            resp.media = {'full_name': user.full_name}
            resp.status = HTTP_200
        except NoResultFound:
            resp.status = HTTP_401






