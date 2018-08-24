from falcon import API

from .resources import Registration, Token

api = API()
api.add_route('/register', Registration())
api.add_route('/token', Token())

