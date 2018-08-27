from marshmallow_sqlalchemy import ModelSchema
from .db import session
from .models import Movie, MovieReview


class MovieSchema(ModelSchema):
    class Meta:
        model = Movie
        sqla_session = session

movie_schema = MovieSchema()

class MovieReviewSchema(ModelSchema):

    class Meta:
        model = MovieReview
        sqla_session = session


movie_review_schema = MovieReviewSchema()

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
        'poster': {
            'type': 'string',
            "format": "url"

        },
        'review': {
            'type':'object'
        },
        'release_date': {
            'type': 'string',
            'format': "date-time",
        },
    },
    'required': ['synopsis', 'title', 'review', 'release_date', 'poster']
}
