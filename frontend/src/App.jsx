import React from 'react';
import AuthInput from './components/Inputs/AuthInput';
import MainLayout from './Layouts/MainLayout';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import GovLayout from './Layouts/GovLayout';
import Tenders from './pages/Gov/Tenders';

function App() {
  return (
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/gov' element={<GovLayout />}>
            <Route path='tenders' element={<Tenders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}

export default App;
