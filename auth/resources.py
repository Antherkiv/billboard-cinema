from falcon.media.validators import jsonschema
from falcon import HTTP_409, HTTP_201
from sqlalchemy.sql import exists

from utils.resource_mixins import CreateResourceMixin

from .schemas import user_schema
from .models import User
from .db import session


class Registration(CreateResourceMixin):
    @jsonschema.validate(user_schema)
    def on_post(self, req, resp):
        media = req.media.copy()
        if session.query(
                exists().where(User.username == media['username'])).scalar():
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

            resp.media = {'id': user.id}

            resp.status = HTTP_201
