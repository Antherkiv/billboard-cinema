"""
    I take this middleware from here for fast:
    https://falcon.readthedocs.io/en/stable/user/faq.html#how-do-i-implement-cors-with-falcon
"""
class CORS(object):
    def process_response(self, req, resp, resource, req_succeeded):
        # NOTE: Obviusly this in unsecure but it's for development pourposes
        resp.set_header('Access-Control-Allow-Origin', 'http://localhost:1234')
        resp.set_header('Access-Control-Allow-Credentials', 'true')

        if (req_succeeded
            and req.method == 'OPTIONS'
            and req.get_header('Access-Control-Request-Method')
        ):
            allow = resp.get_header('Allow')
            resp.delete_header('Allow')

            # Allow all headers for a fast implementation
            allow_headers = req.get_header(
                'Access-Control-Request-Headers',
                default='*'
            )

            resp.set_headers((
                ('Access-Control-Allow-Methods', allow),
                ('Access-Control-Allow-Headers', allow_headers),
                ('Access-Control-Max-Age', '86400'),  # 24 hours
            ))
