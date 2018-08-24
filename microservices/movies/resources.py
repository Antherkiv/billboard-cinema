from falcon.media.validators import jsonschema
from falcon import HTTP_409, HTTP_201, HTTP_200, HTTP_404

from sqlalchemy.sql import exists
from sqlalchemy import desc, func
from sqlalchemy.orm.exc import NoResultFound

from slugify import slugify
from uuid import UUID

from arrow import get

from .schemas import movie_json_schema, movie_schema, movie_review_schema
from .models import Movie, MovieReview
from .db import session

DEFAULT_OFFSET = 0
DEFAULT_LIMIT = 10


class Movies(object):
    def on_get(self, req, resp):
        query = session.query(Movie).order_by(desc(
            Movie.release_date)).order_by(Movie.title).limit(
                req.params.get('limit', DEFAULT_LIMIT)).offset(
                    req.params.get('offset', DEFAULT_OFFSET))

        total = session.query(func.count(Movie.id)).scalar()

        resp.media = {
            'total': total,
            'results': movie_schema.dump(query, many=True).data
        }

        resp.status = HTTP_200

    @jsonschema.validate(movie_json_schema)
    def on_post(self, req, resp, **params):
        print(params)
        media = req.media.copy()
        if session.query(
                exists().where(Movie.title == media['title'])).scalar():
            resp.media = {
                "description":
                "The movie is on our system, please use the edition panel",
                "title":
                "Movie exists"
            }

            resp.status = HTTP_409
        else:
            review = media.pop('review')
            media['release_date'] = get(media['release_date']).datetime
            media['slug'] = slugify(media['title'])
            movie = Movie(**media)

            movie_review = MovieReview(
                body=review, movie=movie, slug=media['slug'])

            session.add(movie)
            session.add(movie_review)
            session.commit()

            resp.media = movie_schema.dump(movie).data

            resp.status = HTTP_201


class MovieReviews(object):
    def on_get(self, req, resp, lookup_arg):

        try:
            UUID(lookup_arg, version=4)
            lookup_field = 'movie_id'
        except ValueError:
            lookup_field = 'slug'

        query_kwarg = dict(((lookup_field, lookup_arg),))

        try:
            review = session.query(MovieReview).filter_by(**query_kwarg).one()

            resp.media = movie_review_schema.dump(review).data

            resp.status = HTTP_200
        except NoResultFound:
            resp.status = HTTP_404
