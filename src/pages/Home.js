import React, {useEffect} from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { logOut, setUser } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
       console.log("error>>>>",error)
    }
 }
 
 useEffect(()=>{
   fetchUserDetails()
 }, []);

  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen'>
         <section className='bg-white'>
            Sidebar
         </section>
        
        <section>
            <Outlet />
        </section>
    </div>
  )
}
export default Home
