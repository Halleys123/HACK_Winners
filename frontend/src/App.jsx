import React from 'react';
import MainLayout from './Layouts/MainLayout';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import GovLayout from './Layouts/GovLayout';
import Tenders from './pages/Gov/Tenders';
import Bidder from './pages/Bidder/Bidder';
import OpenBids from './pages/Bidder/OpenBids';
import BidderLayout from './Layouts/BidderLayout';

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
          <Route path='/bidder' element={<BidderLayout />}>
            <Route path='tenders' element={<Bidder />} />
            <Route path='open-tenders' element={<OpenBids />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}

export default App;
