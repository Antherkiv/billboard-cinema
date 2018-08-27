from falcon import API
from utils.middlewares import CORS
from falcon_jwt_checker import JwtChecker

from .resources import Registration, Token, WhoAmI

# FIXME: We need to provide a RSA PUBLI KEY, for development porpouses  I don't
jwt_checker = JwtChecker(
    secret='dracula',
    algorithm='HS256',
    exempt_routes=['/register', '/token',],
)


api = API(middleware=[CORS(), jwt_checker])

# FIXME: remove this directive on production mode, it's only for development pourposes
api.resp_options.secure_cookies_by_default = False

api.add_route('/register', Registration())
api.add_route('/token', Token())
api.add_route('/who-am-i', WhoAmI())

