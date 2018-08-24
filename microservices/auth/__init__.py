from falcon import API

from .resources import Registration

api = API()
api.add_route('/register', Registration())

