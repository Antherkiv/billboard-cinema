"""SQLAlchemy schemas.

Attributes:
    movie_review_schema (ModelSchema instance):
            Schema to map movie model to json
    movie_schema (ModelSchema instance): Schema to map movie model to json
"""
from marshmallow_sqlalchemy import ModelSchema
from db import session
from models import Movie, MovieReview


class MovieSchema(ModelSchema):
    """MovieSchema.

    Marshmallow schema to map SQLAlchemy model to json
    """

    class Meta:
        """Meta class.

        Attributes:
            model (SQLAlchemy model): Movie model
            sqla_session (SQLAlchemy session): db session
        """

        model = Movie
        sqla_session = session

movie_schema = MovieSchema()


class MovieReviewSchema(ModelSchema):
    """MovieReviewSchema.

    Factory to map SQLAlchemy model to Marshmallow serializer
    """

    class Meta:
        """Metaclass.

        Attributes:
            model (SQLAlchemy model): MovieReview model
            sqla_session (SQLAlchemy session): db session
        """

        model = MovieReview
        sqla_session = session


movie_review_schema = MovieReviewSchema()
