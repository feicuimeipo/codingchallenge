import os
import uuid


def delete_all_in_folder(self, folderpath):
    """删除目标文件夹下的所有文件"""
    filelist = os.listdir(folderpath)
    for file in filelist:
        os.remove(folderpath + file)  # 该命令删除文件
        print("【{}】文件已删除".format(file))


def getId():
    l_uuid = str(uuid.uuid4()).replace('-', '')
    return l_uuid