import React, {useState} from 'react';
import {Button, Form, Input, message, Space } from "antd";
import {getFile} from "@/api/upload";
import TextArea from "antd/lib/input/TextArea";

function Search() {
    const [result,setResult] = useState("")
    const onFinish = async (values: any) => {
        if (!values.fileId){
            return false
        }
        getFile(values.fileId).then((data) => {
            console.log("SUCCESS = " + data)
            setResult(data.data)
            message.success(data.data)
        }).catch((err) =>{
            console.log("ERROR2 = " + err)
            message.success(err)
        })
    };


    return (
        <div className="App">
            <Form
                name="form"
                onFinish={onFinish}
                initialValues={{
                    'fileId': '',
                }}
                style={{ maxWidth: 600 }}
            >

                <Form.Item
                    name="fileId"
                    label="fileId"
                    rules={[{ required: true, message: 'Please input description ' }]}
                >
                    <Input placeholder="Please input your file id" />
                </Form.Item>

                <Form.Item
                    name="Result"
                    label="Result"
                >
                    <TextArea rows={10} id={"textAreaRef"}  value={result} />
                </Form.Item>

                <Form.Item >
                    <Space>
                        <Button type="primary" htmlType="submit">Search</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Search;
