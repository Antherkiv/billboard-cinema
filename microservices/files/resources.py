import mimetypes
from falcon import HTTP_201, HTTP_200, HTTP_404

# A quik and dirty file directory, it could be insecure, not ready for production,
# and maybe it violates one of the owasp rules.


class Files(object):
    def __init__(self, *args, **kwargs):
        import os
        self.server_url = 'http://localhost:8004'
        self.base_file_url = os.path.dirname(os.path.realpath(__file__))

    def get_base_path(self, user):
        return '{dir_path}/images/{user}/'.format(
            dir_path=self.base_file_url, user=user)

    def get_file_relative_path(self, file_name, ext):
        return '/{file_name}.{ext}'.format(file_name=file_name, ext=ext)

    def on_post(self, req, resp, file_name, ext, jwt_claims=None):
        import os
        user = jwt_claims['user']

        file_directory = self.get_base_path(user)

        relative_path = self.get_file_relative_path(file_name, ext)

        if not os.path.exists(file_directory):
            os.makedirs(file_directory)

        with open(
                '{file_directory}{relative_path}'.format(
                    file_directory=file_directory,
                    relative_path=relative_path), 'wb') as dest:
            while True:
                chunk = req.stream.read(4096)
                if not chunk:
                    break

                dest.write(chunk)
            dest.flush()

            resp.media = {
                'file_url':
                '{server_url}/{user}/{relative_path}'.format(
                    server_url=self.server_url, user=user, relative_path=relative_path)
            }  # NOTE IT'S A MOCKUP URL

            resp.status = HTTP_201

    def on_get(self, req, resp, user, file_name, ext):
        import os
        file_directory = self.get_base_path(user)

        relative_path = self.get_file_relative_path(file_name, ext)

        file_absolute_path = '{file_directory}{relative_path}'.format(
            file_directory=file_directory, relative_path=relative_path)

        if (os.path.isfile(file_absolute_path)):
            resp.content_type = mimetypes.guess_type(
                '{file_name}.{ext}'.format(file_name=file_name,
                                           ext=ext))[0]
            resp.stream = open(file_absolute_path, 'rb')
            resp.stream_len = os.path.getsize(file_absolute_path)
            resp.satatus = HTTP_200
        resp.satatus = HTTP_404
