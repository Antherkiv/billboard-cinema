from falcon.media.validators import jsonschema
from falcon import HTTP_201, HTTP_200

from sqlalchemy import desc, func

from .schemas import comment_json_schema, comment_schema
from .models import Comment
from .db import session


DEFAULT_OFFSET = 0
DEFAULT_LIMIT = 10


class Comments(object):
    def on_get(self, req, resp, target_id):
        query = session.query(Comment).filter_by(target_id=target_id).order_by(desc(
            Comment.created_at)).limit(
                req.params.get('limit', DEFAULT_LIMIT)).offset(
                    req.params.get('offset', DEFAULT_OFFSET))

        total = session.query(func.count(Comment.id)).scalar()

        resp.media = {
            'total': total,
            'results': comment_schema.dump(query, many=True).data
        }

        resp.status = HTTP_200

    @jsonschema.validate(comment_json_schema)
    def on_post(self, req, resp, target_id, jwt_claims):
        media = req.media.copy()
        comment = Comment(target_id=target_id, author_id= jwt_claims['user'], **media,)
        session.add(comment)
        session.commit()

        resp.media = comment_schema.dump(comment).data

        resp.status = HTTP_201






