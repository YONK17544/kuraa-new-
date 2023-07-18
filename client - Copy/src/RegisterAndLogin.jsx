import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "./slice/authSlice.js";


const RegisterAndLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const[isLoginOrRegister, setIsLoginOrRegister] = useState('register');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const data = {
            username,
            password,
          };
          const url = isLoginOrRegister === 'register' ? 'register' : 'login';
          const response = await axios.post(`http://localhost:8082/users/${url}`, data);
       
       if(response.status){
        if(isLoginOrRegister === 'login'){
          dispatch(login(response.data));
          console.log(response.data.jwt);
        }
        navigate("/chat");
       }
    }
  
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit = {handleSubmit}>
      <input value={username}
               onChange={(e) => setUsername(e.target.value)}
               type="text" placeholder="username"
               className="block w-full rounded-sm p-2 mb-2 border" />
        <input value={password}
               onChange={(e) => setPassword(e.target.value)}
               type="password"
               placeholder="password"
               className="block w-full rounded-sm p-2 mb-2 border" />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>
        <div className = "text-center mt-2">
          {   isLoginOrRegister === 'register' && (
                <div>
                      Already a member?
                   <button 
                     onClick = {() => {setIsLoginOrRegister('login')}}>
                      Login here
                   </button>
                </div>
              )
           }
           {
            isLoginOrRegister === 'login' && (
                <div>
                     Do not have an account?
                   <button 
                     onClick = {() => {setIsLoginOrRegister('register')}}>
                      Register here
                   </button>
                </div>
              )
           }
        </div>
      </form>
    </div>
  )
}

export default RegisterAndLogin
