import React from 'react';
import ReactDOM from 'react-dom';
import {RecoilRoot} from 'recoil';
import { MantineProvider } from '@mantine/core';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/main.css'

ReactDOM.render(
    <React.StrictMode>
      <RecoilRoot>
        <MantineProvider theme={{
                    fontFamily: "iA Writer QuattroS"
                    }}>
          <App />
        </MantineProvider>
      </RecoilRoot>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
