call npm run build
set CDK_DEFAULT_ACCOUNT=703449490149
set CDK_DEFAULT_REGION=ap-east-1
call  cdk deploy -c key_pair=cdk-test-ec2-key --require-approval=never

