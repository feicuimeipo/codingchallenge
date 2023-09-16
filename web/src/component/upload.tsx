import React, { useState} from 'react';
import {Button, Form, Input, message, Space,  Upload} from "antd";
import {  UploadOutlined } from '@ant-design/icons';
import {handleSubmit,  upload} from "@/api/upload";
import {newId} from "@/utils";

function FileUpload() {
    const [inputFile,setInputFile] = useState([""])

    const onFinish = async (values: any) => {
       //values.event.preventDefault();
        if (!values.upload){
            return false
        }
        console.log('Received values of form: ', values);
        const formData = new FormData();
        formData.append("input_text", values.input_text);
        formData.append("input_file_path", inputFile.splice(1).toString());
        formData.append("id",newId())

        handleSubmit(formData).then((data) => {
            console.log("SUCCESS = " + data)
            message.success("保存成功！")
        }).catch((err) =>{
            console.log("ERROR = " + err.message)
            message.success(err.message)
        })
    };

    // const onFinishFailed = (value:any) => {
    //
    // }

    const normFile = (e:any) => {
        console.log('Upload event:', e);
        const formData = new FormData();
        formData.append("file", e.file);
        upload(formData).then(data => {
            const url = data.data.url;
            const newInputFile = [...inputFile, url];
            setInputFile(newInputFile)
        }).catch((err) =>{
            console.log("ERROR = " + err)
            message.success(err)
        })
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };




    return (
        <div className="App">
            <Form
                name="validate_other"
                onFinish={onFinish}
                initialValues={{
                    'fileDesc': '',
                }}
                style={{ maxWidth: 600 }}
            >

                <Form.Item
                    name="input_text"
                    label="Input Text"
                    rules={[{ required: true, message: 'Please input description ' }]}
                >
                    <Input placeholder="Please input your fileDesc" />
                </Form.Item>

                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Please input description ' }]}

                >
                    <Upload name="logo" listType="picture" beforeUpload={()=>{return false}} maxCount={1}  accept={".txt"}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item >
                    <Space>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button htmlType="reset">reset</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}

export default FileUpload;
