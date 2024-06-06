import React, { useState } from "react";
import { PiUserCircle } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
     e.preventDefault();
     e.stopPropagation();
     const url = `${process.env.REACT_APP_BACKEND_URL}/api/email`;
     try {
        const response = await axios.post(url, data)
        toast.success(response?.data?.message);
        if(response?.data?.success){
          setData({
            email: "",
          })
          navigate("/password", {
            state: response?.data?.data
          })
        }
     } catch (error) {
         toast.error(error?.response?.data?.message)
     }
  };

  return (
    <div className="mt-5">
    <div className="bg-white w-full max-w-sm mx-auto rounded overflow-hidden p-4">
     <div className="w-fit mx-auto mb-2">
         <PiUserCircle size={80}/>
     </div>
      Welcome to Chat App
      <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="bg-slate-100 px-2 py-1 focus:outline-primary"
            value={data.email}
            onChange={handleOnChange}
            required
          />
        </div>
        <button
          className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white"
         >Let's Go
        </button>
      </form>
      <p className="my-3 text-center">New User ? <Link to={"/register"} className="hover: text-primary font: font-semibold">Register</Link></p>
    </div>
  </div>
  )
}

export default CheckEmailPage
