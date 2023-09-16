import React from 'react';
import { Tabs, TabsProps} from "antd";
import FileUpload from "@/component/upload";
import Search from "@/component/search";

function App() {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Upload',
            children: <FileUpload />,
        },
        {
            key: '2',
            label: 'SearchById',
            children:  <Search />,
        }
    ];


    return (
        <div className="App">
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
}

export default App;
