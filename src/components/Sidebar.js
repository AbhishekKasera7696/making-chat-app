import React, { useState } from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avatar from './Avatar';
import { FiArrowUpLeft } from "react-icons/fi"
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import SearchUser from './SearchUser';

const Sidebar = () => {
    const user = useSelector(state => state?.user);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [allUser, setAllUser] = useState([]);
    const [openSearchUser, setOpenSearchUser] = useState(false);
  return (
    // <div className='w-full h-full grid grid-cols-[48px, 1fr]'>
    //   <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
    //       <div>
    //         <NavLink className={({isActive})=>`w-12 h-12 cursor-pointer justify-center items-center hover:bg-slate-200 rounded ${isActive} && bg-slate-200`} title='chat'>
    //         <IoChatbubbleEllipses 
    //             size={20}
    //         />
    //         </NavLink>
    //         <div title='add-friends' className='w-12 h-12 cursor-pointer justify-center items-center hover:bg-slate-200 rounded'>
    //             <FaUserPlus 
    //             size={20}
    //             />

    //         </div>
    //       </div>
    //       <div className='flex flex-col items-center'>
    //         <button className='mx-auto' title={user?.name} onClick={()=>setEditUserOpen(true)}>
    //             <Avatar 
    //                width={40}
    //                height={40}
    //                name={user?.name}
    //                imageUrl={user?.profile_pic}
    //             />
    //         </button>
    //          <button title='logout' className='w-12 h-12 cursor-pointer justify-center items-center hover:bg-slate-200 rounded'>
    //           <span className='-ml-2'>
    //           <BiLogOut 
    //              size={20}
    //            />
    //           </span>
    //          </button>
    //       </div>
    //   </div>
       
    //    <div className='w-full bg-red-500'>
    //       sidebar
    //    </div>


    //      {/* edit user detail */}

    //      {
    //         editUserOpen && (
    //             <EditUserDetails onClose={()=>setEditUserOpen(false)} user={user}
    //             />
    //         )
    //      }
    // </div>

    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
  <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
    <div>
      <NavLink className={({ isActive }) => `w-12 h-12 cursor-pointer flex justify-center items-center hover:bg-slate-200 rounded ${isActive ? 'bg-slate-200' : ''}`} title="chat">
        <IoChatbubbleEllipses size={20} />
      </NavLink>
      <div title="add-friends" onClick={()=>{setOpenSearchUser(true)}} className="w-12 h-12 cursor-pointer flex justify-center items-center hover:bg-slate-200 rounded">
        <FaUserPlus size={20} />
      </div>
    </div>
    <div className="flex flex-col items-center">
      <button className="mx-auto" title={user?.name} onClick={() => setEditUserOpen(true)}>
        <Avatar width={40} height={40} name={user?.name} imageUrl={user?.profile_pic} userId={user?._id} />
      </button>
      <button title="logout" className="w-12 h-12 cursor-pointer flex justify-center items-center hover:bg-slate-200 rounded">
        <span className="-ml-2">
          <BiLogOut size={20} />
        </span>
      </button>
    </div>
  </div>

  <div className="w-full h-full">
    <div className='h-16 flex items-center'>
    <h2 className='text-xl font-bold p-4 text-slate-800'>Message</h2>
    </div>
     <div className='bg-slate-200 p-[0.5px]'></div>
     <div className= 'h-[calc(100vh-65px)]overflow-x-hidden overflow-y-auto scrollbar'>
        {
          allUser.length === 0 && (
            <div className='mt-12'>
              <div className='flex justify-center items-center my-4 text-slate-500'>
                 <FiArrowUpLeft size={50}/>
               </div>
               <p className='text-lg text-center text-slate-400'>Explore a user to start a conversation with.</p>
            </div>
          )
        }
     </div>
  </div>

  {/* Edit User Detail */}
  {editUserOpen && <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />}
    
    {/* search user */}

    {
      openSearchUser && (
         <SearchUser onClose={()=>setOpenSearchUser(false)}/>
      )
    }

</div>

  )
}

export default Sidebar
