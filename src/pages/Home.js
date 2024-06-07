import React, {useEffect} from 'react';
import axios from 'axios';
import { Outlet, useLocation } from 'react-router-dom';
import { logOut, setUser } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async() => {
    try {
 
     const url = `${process.env.REACT_APP_BACKEND_URL}/api/user-detail`;
     const response = await axios({
        url : url,
        withCredentials: true
     })
     dispatch(setUser(response?.data?.data));

     if(response?.data?.logout){
       dispatch(logOut());
       navigate("/email")
     }
    } catch (error) {
       console.log(error)
    }
 }
 
 useEffect(()=>{
   fetchUserDetails()
 }, []);
   
 const basePath = location.pathname === "/"
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen'>
         <section className={`bg-white ${!basePath && "hidden"}`}>
            <Sidebar />
         </section>
        
        <section className={`${basePath && "hidden"}`}>
            <Outlet />
        </section>
    </div>
  )
}
export default Home
