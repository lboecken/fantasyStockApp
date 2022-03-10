import React from 'react';
import { render } from 'react-dom';
import App from './App';
import Home from 'modules/home/';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
