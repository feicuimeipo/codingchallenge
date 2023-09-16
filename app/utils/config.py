import os
import configparser;


class BasePath(object):
    PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # 根目录
    CONFIG_FILE = os.path.join(PROJECT_ROOT, "config.ini")  # 配置文件目录
    FILE_STATION = os.path.join(PROJECT_ROOT, "FilesStation/")  # 文件工作站-用于处理文件数据
    S3FILES = os.path.join(FILE_STATION, "S3Files/")  # 用于处理S3下载的文件


class Config:
    @staticmethod
    def read_config_ini(sectionName):
        config = configparser.ConfigParser()
        config.read(BasePath.CONFIG_FILE, encoding="utf-8")
        section = config[sectionName]
        return section

    @staticmethod
    def read_config_s3():
        group = Config.read_config_ini("S3_FILE_CONF")
        return group

    @staticmethod
    def read_config_dynamoDB():
        group = Config.read_config_ini("DynamoDB_CONF")
        return group

    @staticmethod
    def read_config_app():
        group = Config.read_config_ini("APP")
        return group
