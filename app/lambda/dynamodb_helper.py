import boto3

"""
Your module description
"""


class DynamoDBHelper(object):
    def __init__(self):
        self.region_name = 'ap-east-1'
        self.table_name = 'CodingChallengeDB'
        self.dynamodb = boto3.resource(service_name='dynamodb')

    def new_item(self, item):
        table = self.dynamodb.Table(self.table_name)
        try:
            table.put_item(
                Item={
                    'id': 'abc',
                    'input_tex': 'def',
                    'input_file_path': 'sh'
                    # 'id': item["id"],
                    # 'input_tex': item["input_text"],
                    # 'input_file_path': item["input_file_path"]
                }
            )
            return '200'
        except Exception as e:
            print('DynamoDBHelper-添加记录出错了：' + str(e))
            return str(e)