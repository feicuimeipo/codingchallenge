# !/bin/bash

npm run build
export CDK_DEFAULT_ACCOUNT=703449490149
export CDK_DEFAULT_REGION=ap-east-1
cdk deploy -c key_pair=cdk-test-ec2-key --require-approval=never

