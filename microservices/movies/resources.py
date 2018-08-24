from falcon.media.validators import jsonschema
from falcon import HTTP_409, HTTP_201

from sqlalchemy.sql import exists

from arrow import get

from .schemas import movie_json_schema, movie_schema
from .models import Movie, MovieReview
from .db import session


class Movies(object):
    @jsonschema.validate(movie_json_schema)
    def on_post(self, req, resp, **params):
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
