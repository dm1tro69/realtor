import React, {ChangeEvent, useState} from 'react';
import {getAuth, updateProfile} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";
import {FcHome} from "react-icons/fc";
import {Link} from 'react-router-dom'

const Profile = () =>{
    const navigate = useNavigate()
    const auth: any = getAuth()
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })
    const [changeDetail, setChangeDetail] = useState(false)
    const {name, email} = formData
    const handleChange = () => {
         setChangeDetail(!changeDetail)
    }
    const handlerSubmit = async () => {

        try {
          if (auth.currentUser.displayName !==name){
              await updateProfile(auth.currentUser, {
                  displayName: name
              })
              const docRef = doc(db, 'users', auth.currentUser.uid)
              await updateDoc(docRef, {
                  name
              })
          }
          // toast.success('Profile details updated')
        }catch (e) {
            toast.error('Could not update profile details')
        }
    }
    const onLogOut = () => {
      auth.signOut()
        navigate('/')
    }
       const onChange = (e: ChangeEvent<HTMLInputElement>) => {
         setFormData((prevState)=> ({
             ...prevState,
             [e.target.id]: e.target.value
         }))
       }
    return (
        <>
           <section className={'max-w-6xl mx-auto flex justify-center items-center flex-col'}>
               <h1 className={'text-3xl text-center mt-6 font-bold'}>My Profile</h1>
               <div className={'w-full md:w-[50%] mt-6 px-3'}>
                   <form>
                       <input onChange={onChange} type="text" id={'name'} value={name} disabled={!changeDetail} className={'mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'}/>
                       <input className={'mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'}  type="email" id={'email'} value={email}/>

                       <div className={'flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'}>
                           <p onClick={handlerSubmit} className={'flex items-center'}>Do you want change your name?
                               <span onClick={()=> {
                                   changeDetail && handlerSubmit()
                                   handleChange()
                               }} className={'cursor-pointer text-red-600 hover:text-red-700 ml-1'}>{changeDetail ? 'Apply change': 'Edit'}</span>
                           </p>

                           <p onClick={onLogOut} className={'text-blue-600 hover:text-blue-800 cursor-pointer'}>Sign out</p>
                       </div>

                   </form>
                   <button className={'w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700'} type={'submit'}>
                       <Link className={'flex justify-center items-center'} to={'/create-listing'}>
                           <FcHome className={'mr-2 text-3xl bg-red-200 rounded-full p-1 border-2'}/> Sell or rent your home
                       </Link>

                   </button>
               </div>
           </section>
        </>
    );
};

export default Profile;
