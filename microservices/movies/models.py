from uuid import uuid4
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import relationship, backref

from sqlalchemy_utc import UtcDateTime

from .db import engine

Base = declarative_base()


class Movie(Base):
    id = Column(UUID(as_uuid=True), default=uuid4, primary_key=True)
    poster = Column(String, nullable=False)
    synopsis = Column(String, nullable=False)
    slug = Column(String, nullable=False, unique=True)
    title = Column(String, nullable=False, unique=True)
    release_date = Column(UtcDateTime(), nullable=False)
    __tablename__ = 'movies'


class MovieReview(Base):
    id = Column(UUID(as_uuid=True), default=uuid4, primary_key=True)
    slug = Column(String, unique=True, nullable=False, )
    movie_id = Column(UUID(as_uuid=True), ForeignKey("movies.id"), nullable=False, )
    movie = relationship("Movie", backref=backref('reviews'),)
    body = Column(JSON(), nullable=False)

    __tablename__ = 'reviews'


Base.metadata.create_all(engine)
