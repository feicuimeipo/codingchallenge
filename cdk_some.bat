rem "install node.js & typescript"
call npm i -g aws-cdk
call msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

rd /s /q autocdk
call mkdir autocdk
call cd autocdk
cdk init app --language typescript
npm install -s @aws-cdk/aws-ec2
npm install -s @aws-cdk/s3


rem "yarn"
rem yarn run cdk-bootstrap-dev --aws-profile dev STAGE=dev
rem yarn run cdk-deploy-dev --profile dev STAGE=dev
rem yarn run cdk-destory-dev --profile dev STAGE=dev
rem "========="
rem "config"
rem $ aws configure --profile ithome
rem AWS Access Key ID [None]: AKIAI44QH8DHBEXAMPLE
rem AWS Secret Access Key [None]: je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
rem Default region name [None]: us-east-1
rem Default output format [None]: 