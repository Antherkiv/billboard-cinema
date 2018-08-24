from falcon.media.validators import jsonschema
from falcon import HTTP_409, HTTP_201, HTTP_200

from sqlalchemy.sql import exists
from sqlalchemy import desc, func

from arrow import get

from .schemas import movie_json_schema, movie_schema
from .models import Movie, MovieReview
from .db import session

DEFAULT_OFFSET = 0
DEFAULT_LIMIT = 10


class Movies(object):
    def on_get(self, req, resp):
        query = session.query(Movie).order_by(desc(Movie.release_date)).order_by(Movie.title).limit(
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
            movie = Movie(**media)

            session.add(movie)
            movie_review = MovieReview(body=review, movie=movie)
            session.add(movie_review)
            session.commit()

            resp.media = movie_schema.dump(movie).data

            resp.status = HTTP_201
