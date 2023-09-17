import json
from dynamodb_helper import DynamoDBHelper


def lambda_handler(event, context):
    data = json.dumps(event["body"])

    helper = DynamoDBHelper()
    ret = helper.new_item(data)

    response = {
        'statusCode': 200,
        'body': 'successful',
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }

    if ret == "200":
        return response
    else:
        response['statusCode'] = 500
        response['body'] = json.dumps(ret)
        return response
