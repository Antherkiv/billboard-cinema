from falcon import API
from falcon_jwt_checker import JwtChecker
from utils.middlewares import CORS

from json import JSONEncoder
from uuid import UUID

from .resources import Movies, MovieReviews


JSONEncoder_olddefault = JSONEncoder.default
def JSONEncoder_newdefault(self, o):
    if isinstance(o, UUID): return str(o)
    return JSONEncoder_olddefault(self, o)

JSONEncoder.default = JSONEncoder_newdefault

# FIXME: We need to provide a RSA PUBLI KEY, for development porpouses  I don't
jwt_checker = JwtChecker(
    secret='dracula',
    algorithm='HS256',
    exempt_methods=['GET'],
)

api = API(middleware=[CORS(), jwt_checker])
api.add_route('/movies', Movies())
api.add_route('/movies/{lookup_arg}/review', MovieReviews())


