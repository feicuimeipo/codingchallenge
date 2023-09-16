
export remoteIP=43.198.100.130
scp -i ./cdk-test-ec2-key.pem ssh-*.sh ec2-user@$remoteIP:~/

ssh -i ./cdk-test-ec2-key.pem ec2-user@$remoteIP "cd ~;./ssh-prepare-aws.sh"

ssh -i ./cdk-test-ec2-key.pem ec2-user@$remoteIP

