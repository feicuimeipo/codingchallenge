import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {setEnvironmentData} from "worker_threads";

/**
 * > cdk synth \
 *   -c KEY=VALUE \
 *   -c KEY2=VALUE2
 * 对应取值
 * this.node.tryGetContext('KEY')
 *
 *
 * cdk deploy \
 *   -c vpc_id=vpc-06902b788e0f8efdf \
 *   -c key_pair=cdk-test-ec2-key \
 *   -c cidr_ip=xxx.xxx.xxx.xxx/32
 *   -c cidr_ip=172.31.0.0/16
 *
 */
//https://www.codenong.com/e35fd8c6af7dff9f2624/
//https://zhuanlan.zhihu.com/p/359213735?utm_id=0
//https://www.zhihu.com/column/c_1317794401452994560
export class AutocdkStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
      // const vpc = new ec2.Vpc(this, "VPC", {
      //   natGateways: 0,
      // });
      //导入现有的VPC
      // let vpc = ec2.Vpc.fromLookup(this, 'VPC', {
      //     vpcId: this.node.tryGetContext('vpc_id')
      // });

      let vpc = ec2.Vpc.fromLookup(this, 'DefaultVPC', { isDefault: true });
    //const cidrIp = this.node.getContext("cidr_ip")
     const mySecurityGroup = new ec2.SecurityGroup(this, "SecurityGroup", {
        vpc,
        description: "Allow ssh access to ec2 instances from anywhere",
        allowAllOutbound: true, //默认
    });
    //mySecurityGroup.addEgressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic());
    mySecurityGroup.addIngressRule(
        //ec2.Peer.ipv4(cidrIp),
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(22),
        "allow public ssh access"
    );
      let ec2Instance = new ec2.CfnInstance(this, 'myInstance', {
          imageId: new ec2.AmazonLinuxImage().getImage(this).imageId,
          instanceType: new ec2.InstanceType('t3.small').toString(),
          networkInterfaces: [{
              associatePublicIpAddress: true,
              deviceIndex: '0',
              groupSet: [mySecurityGroup.securityGroupId],
              subnetId: vpc.publicSubnets[0].subnetId
          }],
          keyName: this.node.tryGetContext('key_pair')
      });
      new cdk.CfnOutput(this, 'Id', { value: ec2Instance.ref });
      new cdk.CfnOutput(this, 'PublicIp', { value: ec2Instance.attrPublicIp });


      // // const vpc = new ec2.Vpc(this, "VPC", {
      // //     natGateways: 0,
      // // });
      // let vpc = ec2.Vpc.fromLookup(this, 'DefaultVPC', { isDefault: true });
      //
      // const mySecurityGroup = new ec2.SecurityGroup(this, "SecurityGroup", {
      //     vpc,
      //     description: "Allow ssh access to ec2 instances from anywhere",
      //     allowAllOutbound: true,
      // });
      // mySecurityGroup.addIngressRule(
      //     ec2.Peer.anyIpv4(),
      //     ec2.Port.tcp(22),
      //     "allow public ssh access"
      // );
      //
      // const ec2Instance = new ec2.Instance(this, "Instance", {
      //     vpc,
      //     instanceType: ec2.InstanceType.of(
      //         ec2.InstanceClass.T3,
      //         ec2.InstanceSize.NANO
      //     ),
      //     machineImage: new ec2.AmazonLinuxImage(),
      //     securityGroup: mySecurityGroup,
      //     vpcSubnets: {
      //         subnetType: ec2.SubnetType.PUBLIC,
      //     },
      //     keyName: this.node.tryGetContext('key_pair'),
      // });
      // new cdk.CfnOutput(this, 'Id', { value: ec2Instance.instanceId});
      // new cdk.CfnOutput(this, 'PublicIp', { value: ec2Instance.instancePublicIp});

    //EC2 Instance <> EIP
    // let eip = new ec2.CfnEIP(this, "Ip");
    // let ec2Assoc = new ec2.CfnEIPAssociation(this, "Ec2Association", {
    //   eip: eip.ref,
    //   instanceId: ec2Instance.instanceId
    // });

  }
}
