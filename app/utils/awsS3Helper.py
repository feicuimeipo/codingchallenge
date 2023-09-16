import boto3
import re
import pickle

from utils.config import Config

S3_FILE_CONF = Config.read_config_s3()


class S3Helper(object):
    def __init__(self):
        self.access_key = S3_FILE_CONF.get("ACCESS-KEY")
        self.secret_key = S3_FILE_CONF.get("SECRET-KEY")
        self.region_name = S3_FILE_CONF.get("REGION-NAME")
        self.bucket_name = S3_FILE_CONF.get("BUCKET-NAME")
        self.endpoint_url = S3_FILE_CONF.get("ENDPOINT-URL")
        self.local_path = S3_FILE_CONF.get("LOCAL-TMP-FOLDER")

        # 连接s3
        self.boto3 = boto3.resource(
            service_name='s3',
            endpoint_url=self.endpoint_url,
            aws_access_key_id=self.access_key,
            aws_secret_access_key=self.secret_key
        )

        self.client = boto3.client(
            service_name='s3',
            region_name=self.region_name,
            aws_access_key_id=self.access_key,
            aws_secret_access_key=self.secret_key,
        )

    def download_file_s3(self, bucket_name, input_file_path, input_text, output_file_name):
        file_name = input_file_path
        local_file = self.local_path
        bucket = self.boto3.Bucket(bucket_name)
        for obj in bucket.objects.all():
            if obj.key == file_name:
                p = re.compile(r'.*/(.*)')
                g = p.search(file_name);
                result = g.group(1)
                down_file = local_file + "/" + result
                output_file = local_file + "/" + output_file_name
                try:
                    bucket.download_file(file_name, down_file)
                    originalFile = open(down_file, "r")
                    binary_data = pickle.dumps(originalFile.read() + ":" + input_text)
                    outputFile = open(output_file, "wb")
                    outputFile.write(binary_data)
                    originalFile.close()
                    outputFile.close()
                    return output_file
                except Exception as e:
                    print('出错了：' + str(e))
                    return None

    def upload_file_s3(self, file_name, bucket, local_file):
        """
        上传本地文件到s3指定文件夹下
        :param local_file:
        :param file_name: 本地文件路径
        :param bucket: 桶名称
        :param s3_dir:要上传到的s3文件夹名称
        :return: 上传成功返回True，上传失败返回False，并打印错误
        """
        s3_file = bucket + "/" + file_name
        try:
            self.boto3.Object(bucket, s3_file).put(Body=open(local_file, 'rb'))
            return s3_file
        except Exception as e:
            print('出错了：' + str(e))
            return ""
