from falcon import API
from falcon_jwt_checker import JwtChecker

from json import JSONEncoder
from uuid import UUID

from .resources import Movies, MovieReviews


JSONEncoder_olddefault = JSONEncoder.default
def JSONEncoder_newdefault(self, o):
    if isinstance(o, UUID): return str(o)
    return JSONEncoder_olddefault(self, o)

JSONEncoder.default = JSONEncoder_newdefault


jwt_checker = JwtChecker(
    secret='dracula',
    algorithm='HS256',
    exempt_methods=['GET'],
)

api = API(middleware=[jwt_checker])
api.add_route('/movies', Movies())
api.add_route('/movies/{lookup_arg}/review', MovieReviews())


