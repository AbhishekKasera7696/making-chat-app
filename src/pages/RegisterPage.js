import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { uploadFile } from "../helpers/uploadFile";
import toast from "react-hot-toast";
import axios from "axios";


const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState("");
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUplaodPhoto = async(e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    setUploadPhoto(file);
    setData((prev) => {
      return {
        ...prev,
        profile_pic : uploadPhoto?.url
      }
    })
  }

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleSubmit = async(e) => {
     e.preventDefault();
     e.stopPropagation();
     const url = `${process.env.REACT_APP_BACKEND_URL}/api/register`;
     try {
        const response = await axios.post(url, data)
        toast.success(response?.data?.message);
        if(response?.data?.success){
          setData({
            name: "",
            email: "",
            password: "",
            profile_pic: "",
          })
          navigate("/email")
        }
     } catch (error) {
         toast.error(error?.response?.data?.message)
     }

  }

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-auto rounded overflow-hidden p-4">
        Welcome to Chat App
        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>
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
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">Profile Picture:
            <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
              <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">{uploadPhoto ? uploadPhoto?.name : "Upload Profile Pic"}</p>
             {
              uploadPhoto?.name && (
                <button className="text-lg ml-2 hover:text-red-600" onClick={handleClearUploadPhoto}>{<IoClose/>}</button>
              )
             }
            </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              placeholder="Enter your profile picture URL"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleUplaodPhoto}
            />
          </div>
          <button
            className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white"
           >Register
          </button>
        </form>
        <p className="my-3 text-center">Already have account ? <Link to={"/email"} className="hover: text-primary font: font-semibold">Login</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
