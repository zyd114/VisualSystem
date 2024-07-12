// 本文件是界面UI的根目录

import React from 'react';

import AssistView from './AssistView';
import ControlPanel from './ControlPanel';
import Overview from './Overview';
import DetailView from './DetailView';
import '../css/App.css'

// App组件
function App() {

    return <div className='root'>
        <div className='controlPanel'>
          <ControlPanel/>
        </div>
        <div className='mainPanel'>
          <div className='overview'><Overview/></div>
          <div className='otherview'>
            <div className='assistView'><AssistView/></div>
            <div className='detailView'><DetailView/></div>
          </div>
        </div>
    </div>;
}

export default App;
