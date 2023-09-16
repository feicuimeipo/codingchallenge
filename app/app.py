from flask import Flask, request
from flask_cors import CORS

from utils.awsS3Helper import S3Helper
from utils.config import Config
from utils.dynamoDBHelper import DynamoDBHelper
from utils.index import getId
from utils.response import Response

APP_CONF = Config.read_config_app()
__author__ = APP_CONF.get("author")
__name__ = APP_CONF.get("name")

app = Flask(__name__, static_url_path="/static")
CORS(app, resources=r'/*')


@app.route('/hello')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/file/upload', methods=['POST', 'GET'])
def fileUpload():
    if 'file' not in request.files:
        return Response.error("没有文件被上传")

    file = request.files['file']
    if file.filename == '':
        return Response.error("没有选择文件")

    # 文件检查通过后，保存文件
    if file:
        S3 = S3Helper()
        file_name = file.filename
        bucket = S3.bucket_name
        local_path = S3.local_path
        local_file = local_path + "/" + file_name
        file.save(local_file)
        s3_url = S3.upload_file_s3(file_name, bucket, local_file)
    return Response.success({'url': s3_url})


@app.route('/file/<fileId>', methods=['GET'])
def fileInfo(fileId=""):
    if fileId == "":
        return Response.error("请输入文件编号")
    DB = DynamoDBHelper()
    S3 = S3Helper()
    item = DB.getFileById(fileId)
    if item is not None:
        bucket = S3.bucket_name
        input_file_path = item["input_file_path"]
        input_text = item["input_text"]
        output_file_name = "OutputFile.txt"

        output_file = S3.download_file_s3(bucket, input_file_path, input_text, output_file_name)

        S3.upload_file_s3(bucket + "/" + output_file_name, bucket,  output_file)

        DB.new_item_output_file(getId(), output_file)

        return Response.success(output_file)
    else:
        return Response.error("文件不存在！")


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0.', port=5000)
    #app.run()

