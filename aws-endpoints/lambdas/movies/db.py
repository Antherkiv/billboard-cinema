"""DB connection.

Attributes:
    engine (DB connection):Connection to postgres rds instance
    session (TYPE): Session on postgres rds
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine(
    'postgresql+psycopg2://Antherkiv:j3Rm998877@testdbinstance.cyzxh8ucfmfj'
    '.us-east-1.rds.amazonaws.com/movies'
)
session = scoped_session(sessionmaker(bind=engine))
