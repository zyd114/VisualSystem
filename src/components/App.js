// 本文件是界面UI的根目录

import React from 'react';

import AssistView from './AssistView';
import ControlPanel from './ControlPanel';
import Overview from './Overview';
import Data_SQ_SD_BMI from './SQ_SD_BMI';
import Data_SQ_SD_BP from './SQ_SD_BP';
import Data_Sex_Age_SD from './Sex_Age_SD';
import Data_Sex_Age_SQ from './Sex_Age_SQ';
import DetailView from './DetailView';
import '../css/App.css'

// App组件
function App() {

    return <div className='root'>
        <div className='controlPanel'>
          <ControlPanel/>
        </div>
        <div className='mainPanel'>
          <div className='SQ_SD_BMI'><Data_SQ_SD_BMI/></div>
          <div className='SQ_SD_BP'><Data_SQ_SD_BP/></div>
          <div className='Sex_Age_SD'><Data_Sex_Age_SD/></div>
          <div className='Sex_Age_SQ'><Data_Sex_Age_SQ/></div>
          <div className='otherview'>
            <div className='assistView'><AssistView/></div>
            <div className='detailView'><DetailView/></div>
          </div>
        </div>
    </div>;
}

export default App;