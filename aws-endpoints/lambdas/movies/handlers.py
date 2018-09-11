"""Movies microservice.

This handlers are intended to manage the crud of a mock up movies
microservices on aws
"""

from json import dumps
from sqlalchemy.sql import exists
from sqlalchemy import desc, func
from sqlalchemy.orm.exc import NoResultFound

from slugify import slugify
from uuid import UUID

from arrow import get

from schemas import movie_schema, movie_review_schema
from models import Movie, MovieReview
from db import session

DEFAULT_OFFSET = 0
DEFAULT_LIMIT = 10


def list_movies(event, context):
    """List movies function.

    Args:
        event (aws event): This is an aws http request event
        context (aws context): Aws context

    Returns:
        TYPE: List of movies
    """
    query_params = event.get('params', {}).get('querystring', {})
    query = session.query(Movie).order_by(desc(Movie.release_date)).order_by(
        Movie.title).limit(query_params.get('limit', DEFAULT_LIMIT)).offset(
            query_params.get('offset', DEFAULT_OFFSET))

    total = session.query(func.count(Movie.id)).scalar()

    response = {
        "statusCode":
        200,
        'body':
        dumps({
            'total': total,
            'results': movie_schema.dump(query, many=True).data
        })
    }

    return response


def create_movie(event, context):
    """Create movies.

    Args:
    event (aws event): This is an aws http request event
    context (aws context): Aws context
    """
    body = event.get('body', {}).copy()
    if session.query(exists().where(Movie.title == body['title'])).scalar():
        response = {
            "statusCode": 409,
            'body': {
                "description":
                "The movie is on our system, please use the edition panel",
                "title":
                "Movie exists"
            }
        }

        return response
    else:
        review = body.pop('review')
        body['release_date'] = get(body['release_date']).datetime
        body['slug'] = slugify(body['title'])
        movie = Movie(**body)

        movie_review = MovieReview(
            body=review, movie=movie, slug=body['slug'])

        session.add(movie)
        session.add(movie_review)
        session.commit()

        response = {
            "statusCode": 201,
            'body': movie_schema.dump(movie).data
        }

        return response


def get_movie_review(event, context):
    """Movie reviews GET endpoint.

    Args:
        event (aws event): This is an aws http request event
        context (aws context): Aws context

    Returns:
        JSON: Returns a particular review
    """
    lookup_arg = event.get('path', {}).get('lookup_arg')
    try:
        UUID(lookup_arg, version=4)
        lookup_field = 'movie_id'
    except ValueError:
        lookup_field = 'slug'

        query_kwarg = dict(((lookup_field, lookup_arg),))

        response = {}

    response = {}

    try:

        review = session.query(MovieReview).filter_by(**query_kwarg).one()
        response['body'] = movie_review_schema.dump(review).data
        response["statusCode"] = 200

    except NoResultFound:
        response["statusCode"] = 404

    return response
