import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './components/Error';
import Post from './pages/Post';
import { ShowModalProvider } from './utils/modalProvider';
import Employees from './pages/Employees';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ShowModalProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/:id" element={<Post />} />
          <Route path="/allEmployees" element={<Employees />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </ShowModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
