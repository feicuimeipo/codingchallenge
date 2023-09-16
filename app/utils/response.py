from flask import jsonify


class Response:
    @staticmethod
    def success(data=None):
        return Response.ret(0, '', data)

    @staticmethod
    def error(msg):
        return Response.ret(500, msg, None)

    @staticmethod
    def fail(code, msg):
        return Response.ret(code, msg, None)

    @staticmethod
    def ret(code, msg, data):
        json = {'code': code, 'message': msg, 'data': data}
        k = jsonify(json)
        return k
