import boto3
import re

from boto3 import dynamodb
from boto3.dynamodb.conditions import Key

from utils.config import Config

DynamoD_CONF = Config.read_config_dynamoDB()


class DynamoDBHelper(object):
    def __init__(self):
        self.access_key = DynamoD_CONF.get("ACCESS-KEY")
        self.secret_key = DynamoD_CONF.get("SECRET-KEY")
        self.region_name = DynamoD_CONF.get("REGION-NAME")
        self.endpoint_url = DynamoD_CONF.get("ENDPOINT-URL")
        self.table_name = DynamoD_CONF.get("TABLE-NAME")

        # headers = {'X-Amz-Date': amz_date,
        #            'x-amz-security-token': amz_security_token,
        #            'Content-Type': content_type,
        #            'x-amz-content-sha256': amz_content_sha256,
        #            'Accept': 'application/json; charset=utf-8',
        #            'Authorization': authorization_header,
        #            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 7.0; Nexus 9 Build/NRD90M)'}

        self.dynamodb = boto3.resource(service_name='dynamodb',
                                       region_name=self.region_name,
                                       aws_access_key_id=self.access_key,
                                       aws_secret_access_key=self.secret_key
                                       )

        # self.client = boto3.client('dynamodb',
        #                            region_name=self.region_name,
        #                            aws_access_key_id=self.access_key,
        #                            aws_secret_access_key=self.secret_key,
        #                            )

    def getFileById(self, fileId):
        table = self.dynamodb.Table(self.table_name,)
        try:
            response = table.query(
                KeyConditionExpression=Key('id').eq(fileId)
             )
            count = response["Count"]
            if count == 0:
                return None
            else:
                items = response['Items']
                return items[0]
        except Exception as e:
            print('出错了：' + str(e))
            return None

    def new_item_output_file(self, fileId, output_file_path):
        table = self.dynamodb.Table(self.table_name)
        try:
            res = table.put_item(
                Item={
                    'id': fileId,
                    'output_file_path': output_file_path
                }
            )
        except Exception as e:
            print('出错了：' + str(e))
