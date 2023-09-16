
# 工程介绍

### 下载代码
```angular2html
git clone https://github.com/feicuimeipo/codingchallenge.git
```
### 代码环境
1. 安装Node.js
2. 安装python + pipenv(可用其他虚环境)  + Flask
3. npm i -g aws-cdk
4. msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
5. aws config #本地配置aws

### 代码结构
```angular2html
1. web: react写的前端人
2. app: 后台实现
3. cdk: 创建与销毁虚拟机以及一些操作shell
```

### 可改进的部分
1. 任务2与任务3的功能改进(好处：该项目可以不用部署一个python后端) 
   1. "System Components" 任务1：可直接由前端将文件上传至S3
   2. "System Components" 任务3：可结合Lambda和前端代码，实现业务功能
2. 将前端代码转入s3： 我可以用cdk把他发布到s3,可没有这么操作，这个很抱歉原因。 在我的印像里，这样的工程有点小作坊的感觉，但我知道可以通过cdk将静态资源传入s3，再利用s3的加速功能提高优化效率


# 指南
### 本地
1. 启动
```angular2html
cd app
pipenv shell
flask run
```
2. 浏览器打开：http://localhost:5000/static/index.html 进行任务1，2，3的操作

### VM
1. cd app
  ./build.sh #编辑应用 - 会将前端代码编译至static文件夹下，同时将工程打包至s3，备用
2. cd cdk
  ./build.sh #打包生成ec2, 并记录公网IP
  ./ssh.sh 公网IP地址，会将文件夹一的ssh开头的.sh cp至ec2, 远程执行aws-client安装与初始化操作, 并远程登录至ec2
3. 在远程主机上
  cd ~
  ./ssh-prepare-python.sh #完成python环境的安装与环境配置
  ./ssh-app-install-start.sh #下载app.tar，解压，并运行工程 

4. 浏览器打开：http://localhost:5000/static/index.html 进行任务1，2，3的操作

5. 销毁 
  ./unbuild.sh
  或( cdk destroy -c key_pair=cdk-test-ec2-key --require-approval=never  )


# Basic requirements
  满足

# Bonus
1. ● Early submission is a big plus ： 我原来擅长Java，熟练go, 这个小项目我想让他变有更有意义，所以用python做了新尝试，花费了一些时间：Python + Flask
2. ● Use AWS Cognito as API-Gateway Authorizer： Cognito在香港区无法使用（Amazon Cognito 是 Web 和移动应用程序的身份平台。）
3. ● Your frontend code is hosted in S3 or Amplify (not backend)：时间关系没有使用 (S3和Amplify: 可用于加速，托管前端代码)
4. ● Use Flowbite TailwindCSS and ReactJS for Responsive UI： 用了React + Antd
   1). Flowbite是建立在 Tailwind CSS 框架之上的最受欢迎的组件库,具有下拉、导航栏、模式等交互元素
   2). Tailwind CSS 是一个功能性实用性很的的 CSS

