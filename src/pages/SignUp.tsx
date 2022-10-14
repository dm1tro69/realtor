import React, {ChangeEvent, FormEvent, useState} from 'react';
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import OAuth from "../components/OAuth";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {serverTimestamp, setDoc, doc} from 'firebase/firestore'
import {db, app} from "../firebase";
import {toast} from "react-toastify";



interface IFormData {
    name: string
    email: string
    password?: string
    timestamp?: any
}

const SignUp = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const {email, password, name} = formData
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {

            const auth = getAuth(app)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            updateProfile(auth.currentUser!, {
                displayName: name
            })
            const user = userCredential.user
            const formDataCopy: IFormData = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()
            await setDoc(doc(db, "users", user.uid), formDataCopy)
            // toast.success('Sign Up was successful')
            // navigate('/')

        }catch (e) {
            toast.error('Something went wrong with the registration')
        }
    }

    return (
        <section>
            <h1 className={'text-3xl text-center mt-6 font-bold'}>Sign Up</h1>
            <div className={'flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'}>
                <div className={'md:w-[67%] lg:w-[50%] mb-12 md:mb-6'}>
                    <img className={'w-full rounded-2xl'} src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" alt="key"/>
                </div>
                <div  className={'w-full md:w-[67%] lg:w-[40%] lg:ml-20'}>
                    <form onSubmit={handleSubmit}>
                        <div className={'relative mb-6'}>
                            <input
                                className={'mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'}
                                type="text"
                                id={'name'}
                                value={name}
                                onChange={handleChange}
                                placeholder={'Full name'}
                            />
                            <input
                                className={'mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'}
                                type="email"
                                id={'email'}
                                value={email}
                                onChange={handleChange}
                                placeholder={'Email address'}
                            />
                            <input
                                className={'w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'}
                                type={showPassword ? 'text': 'password'}
                                id={'password'}
                                value={password}
                                onChange={handleChange}
                                placeholder={'Password'}
                            />
                            {showPassword ? (<AiFillEyeInvisible onClick={()=> setShowPassword(!showPassword)} className={'absolute right-3 bottom-3 text-xl cursor-pointer'}/>): (<AiFillEye onClick={()=> setShowPassword(!showPassword)} className={'absolute right-3 bottom-3 text-xl cursor-pointer'}/>)}
                        </div>
                        <div className={'flex justify-between whitespace-nowrap text-sm sm:text-lg'}>
                            <p className={'mb-6'}>Have a account?
                                <Link className={'text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'} to={'/sign-in'}>Sign in</Link>
                            </p>
                            <p><Link className={'text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'} to={'/forgot-password'}>Forgot password?</Link></p>
                        </div>
                        <button className={'w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'} type={'submit'}>Sign up</button>
                        <div className={'my-4 before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'}>
                            <p className={'text-center font-semibold mx-4'}>OR</p>
                        </div>
                        <OAuth/>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
