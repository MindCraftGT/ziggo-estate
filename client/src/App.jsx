import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreatingList from './pages/CreatingList';

export default function App() {
  return <BrowserRouter>
  <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          < Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/create-listing' element={<CreatingList />}/>
          </Route>
          <Route path='/sign-in' element={<Signin />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/about' element={<About />}/>
        </Routes>
      </BrowserRouter>
}
