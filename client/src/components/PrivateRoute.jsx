import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

//making the profile page private
export default function PrivateRoute() {
    const { currentUser} = useSelector(state => state.user);
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />
}
