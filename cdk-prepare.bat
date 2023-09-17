rem "install node.js & typescript"
call npm i -g aws-cdk
call msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

rd /s /q autocdk
call mkdir autocdk
call cd autocdk
cdk init app --language typescript
npm install -s @aws-cdk/aws-ec2
npm install -s @aws-cdk/s3


cd bookstrap