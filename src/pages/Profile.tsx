import React, {ChangeEvent, FormEvent, useState} from 'react';
import {getAuth} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const Profile = () =>{
    const navigate = useNavigate()
    const auth: any = getAuth()
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })
    const {name, email} = formData
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value
          })

      )
    }
    const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
        try {

        }catch (e) {

        }
    }
    const onLogOut = () => {
      auth.signOut()
        navigate('/')
    }

    return (
        <>
           <section className={'max-w-6xl mx-auto flex justify-center items-center flex-col'}>
               <h1 className={'text-3xl text-center mt-6 font-bold'}>My Profile</h1>
               <div className={'w-full md:w-[50%] mt-6 px-3'}>
                   <form onSubmit={handlerSubmit}>
                       <input onChange={handleChange} type="text" id={'name'} value={name} disabled className={'mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'}/>
                       <input className={'mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'} onChange={handleChange} type="email" id={'email'} value={email}/>

                       <div className={'flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'}>
                           <p className={'flex items-center'}>Do you want change your name?
                               <span className={'cursor-pointer text-red-600 hover:text-red-700 ml-1'}>Edit</span>
                           </p>

                           <p onClick={onLogOut} className={'text-blue-600 hover:text-blue-800 cursor-pointer'}>Sign out</p>
                       </div>

                   </form>
               </div>
           </section>
        </>
    );
};

export default Profile;
