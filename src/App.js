import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/homePage';
import ResourcesPage from './pages/resourcesPage/resourcesPage';
import UsersPage from './pages/usersPage/usersPage';
import BookingsPage from './pages/bookingsPage/bookingsPage';
import LoginPage from './pages/loginPage/loginPage';
import Protected from './components/Protected/Protected';


function App() {

  

  const [isLogin, setLogin] = useState(false);
  // console.log(isLogin);
  return (
   
    <Routes>
      <Route path='/' element={<Navbar isLogin={isLogin} setLogin={setLogin}/>} >

        <Route index element={<HomePage />} />
        <Route path='/login' element={<LoginPage setLogin={setLogin}/>} />
        <Route path='/users' element={<Protected page={UsersPage}/>} />
        <Route path='/resources' element={<Protected page={ResourcesPage}/>} />
        <Route path='/bookings' element={<Protected page={BookingsPage}/>} />
      </Route>

    </Routes>
  );
}

export default App;
