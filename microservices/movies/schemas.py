from uuid import uuid4
from marshmallow_sqlalchemy import ModelSchema
from marshmallow.fields import UUID
from .db import session
from .models import Movie, MovieReview


class MovieSchema(ModelSchema):
    id = UUID(missing=uuid4)
    class Meta:
        model = Movie
        sqla_session = session


class MovieReviewSchema(ModelSchema):
    id = UUID(missing=uuid4)
    movie_id = UUID(missing=uuid4)
    class Meta:
        model = MovieReview
        sqla_session = session


movie_schema = MovieSchema()

movie_json_schema = {
    'type': 'object',
    'properties': {
        'synopsis': {
            'type': 'string',
            "minLength": 50,
            "maxLength": 500
        },
        'title': {
            'type': 'string',
            "maxLength": 50
        },
        'review': {
            'type':'object'
        },
        'release_date': {
            'type': 'string',
            'format': "date-time",
        },
    },
    'required': ['synopsis', 'title', 'review', 'release_date']
}
