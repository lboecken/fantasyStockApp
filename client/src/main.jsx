import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import './index.css';
import App from './App';

import { useContextManager } from '@Hooks';
import Home from '@Public/home';
import { TradingWrapper, TradingRoutes } from '@Private';

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
            element={<PrivateRoute element={<TradingWrapper />} />}>
            {TradingRoutes}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

function PublicRoute({ restricted, element }) {
  const { isLoggedIn } = useContextManager();
  if (isLoggedIn && restricted) {
    return <Navigate to='../' replace={true} />;
  } else {
    return element ? element : <Outlet />;
  }
}

function PrivateRoute({ element }) {
  const { isLoggedIn } = useContextManager();
  if (isLoggedIn) {
    return element ? element : <Outlet />;
  } else {
    return <Navigate to='../' replace={true} />;
  }
}
