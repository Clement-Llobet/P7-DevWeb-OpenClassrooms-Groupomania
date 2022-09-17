import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Error from './pages/Errors/Error';
import Post from './pages/Post/Post';
import Employees from './pages/Employees/Employees';
import UserProvider from './utils/context/context';
import { GlobalStyle } from './indexStyle';
import EmployeeProfile from './pages/EmployeeProfile/EmployeeProfile';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/:id" element={<Post />} />
          <Route path="/allEmployees" element={<Employees />} />
          <Route path="/employee/:id" element={<EmployeeProfile />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
