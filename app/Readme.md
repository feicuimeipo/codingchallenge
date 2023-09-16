```angular2html
<Form.Item name="files" >
    <Upload
      listType="picture-card"
      headers={{ 'content-type': 'multipart/form-data' }}
      fileList={fileList}  //存已上传到页面的图片列表
      onPreview={this.handlePreview} //点击文件链接或预览图标时的回调
      onChange={this.handleChange}  //删除或者新上传时的回调
      beforeUpload={() => false}  //上传文件之前的钩子，参数为上传的文件，若返回 `false` 则停止上传。我们采用手动上传。
    >
      {fileList.length >= 1 ? null : (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>上传</div>
        </div>
      )}
    </Upload>
 </Form.Item> 
```


```angular2html
        const handleSubmitData = new FormData();
        handleSubmitData.append("output_file_path", data.data);
        handleSubmitData.append("id",newId())
        //TODO: 可改为getFile方法中一起实现
        handleSubmit(handleSubmitData).then((data) => {
            console.log("SUCCESS = " + data)
            // message.success("保存成功！")
        }).catch((err) =>{
            console.log("ERROR1 = " + err)
            message.success(err)
        })
```