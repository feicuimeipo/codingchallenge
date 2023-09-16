"""
Create by NianXiaoLing on 2023/04/13

# 一、发送http请求，两种方式
# 1. urllib，- python自带
# 2. requests(推荐) - 需要引入
# - 2.1 安装步骤1： 启动pipenv shell
# - 2.2 安装步骤2： pipenv install requests -i https://pypi.tuna.tsinghua.edu.cn/simple
# - 2.3 安装步骤3： 查看安装情况 pip list


# 二、定义类

"""
__author__ = "carmen"

import json
from urllib import request
from urllib.parse import quote


class HttpUrllib:
    # 1. get方法
    def get_with_request(self, url, return_json=True):
        url = quote(url, safe='/:?=&')
        try:
            with request.urlopen(url) as r:
                result_str = r.read()
                result_str = str(result_str, encodings='utf-8')

            return json.load(result_str) if return_json else result_str
            # if return_json:
            #     return json.load(result_str)
            # else:
            #     return result_str
        except OSError as e:
            # 对于外部的数据，如果出现异常，最好不要抛出来，而是应该默认值处理
            print(e.reason)
            return {} if return_json else None

    # 2. post方法
    def get_with_proxy(self,  return_json=True):
        pass



