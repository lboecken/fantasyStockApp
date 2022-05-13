import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useOutletContext,
} from 'react-router-dom';
import './index.css';
import App from './App';

import Home from '@Home';

import Trading from '@Trading';
import Portfolio from '@Trading/portfolio';
import Stock from '@Trading/stock';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route
            index
            element={<PublicRoute restricted element={<Home />} />}></Route>
          <Route
            path='trading'
            element={<PrivateRoute element={<Trading />} />}>
            <Route path='portfolio' element={<Portfolio />} />
            <Route path='stocks'>
              <Route path=':symbol' element={<Stock />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

function PublicRoute({ restricted, element }) {
  const { isLoggedIn } = useOutletContext();
  if (isLoggedIn && restricted) {
    return <Navigate to='./trading/portfolio' replace={true} />;
  } else {
    return element ? element : <Outlet />;
  }
}

function PrivateRoute({ element }) {
  const { isLoggedIn } = useOutletContext();
  if (isLoggedIn) {
    return element ? element : <Outlet />;
  } else {
    return <Navigate to='../' replace={true} />;
  }
}
