from falcon import API
from utils.middlewares import CORS

from .resources import Registration, Token



api = API(middleware=[CORS()])

# FIXME: remove this on production mode it's only for development pourposes
api.resp_options.secure_cookies_by_default = False

api.add_route('/register', Registration())
api.add_route('/token', Token())

