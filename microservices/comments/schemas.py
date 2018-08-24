from marshmallow_sqlalchemy import ModelSchema
from .db import session
from .models import Comment


class CommentSchema(ModelSchema):
    class Meta:
        model = Comment
        sqla_session = session


comment_schema = CommentSchema()

comment_json_schema = {
    'type': 'object',
    'properties': {
        'comment': {
            'type': 'object',
        },
    },
    'required': ['comment']
}
