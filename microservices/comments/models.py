from uuid import uuid4
from sqlalchemy import Column
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID, JSON

from sqlalchemy_utc import UtcDateTime, utcnow

from .db import engine

Base = declarative_base()

class Comment(Base):
    id = Column(UUID(as_uuid=True), default=uuid4, primary_key=True)
    author_id = Column(UUID(as_uuid=True), nullable=False)
    target_id = Column(UUID(as_uuid=True), nullable=False, )
    created_at = Column(UtcDateTime(), nullable=False, default=utcnow())
    comment = Column(JSON(), nullable=False)

    __tablename__ = 'comments'


Base.metadata.create_all(engine)
