import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/homePage';
import ResourcesPage from './pages/resourcesPage/resourcesPage';
import UsersPage from './pages/usersPage/usersPage';
import BookingsPage from './pages/bookingsPage/bookingsPage';
import LoginPage from './pages/loginPage/loginPage';


function App() {
<<<<<<< Updated upstream
  
  return (
   
    <Routes>
      <Route path='/' element={<Navbar />} >
=======
  const [isLogin, setLogin] = useState(false);
  console.log(isLogin);
  return (
   
    <Routes>
      <Route path='/' element={<Navbar isLogin={isLogin} setLogin={setLogin}/>} >
>>>>>>> Stashed changes
        <Route index element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/resources' element={<ResourcesPage />} />
        <Route path='/bookings' element={<BookingsPage />} />
      </Route>

    </Routes>
  );
}

export default App;
