import { useState,useEffect,useRef } from "react";
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ShowAlert from "../card/alert";

function Login() {
    const navigate = useNavigate();
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    
    const [alert,setAlert]=useState({type:"",message:""});
    const [showAlert,setShowAlert] = useState(false);

    const log=sessionStorage.getItem('log');
    useEffect(() => {
      if(log){
        navigate('/page/Home');
      }
    },[log])
   
    const handleLogin = async() => {
    if(userName.trim()!==''&&password.trim()!==''){
        const usr=await axios.post(`${process.env.REACT_APP_SERVER}/users/login`,{
            username: userName,
            password: password
        });
      setUserName('');
      setPassword('');
      if(usr.data.error){
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        setAlert({type:'error',message:usr.data.error});

      }
      else{
        setShowAlert(true);
        setAlert({type:'success',message:'Login successful'})
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);;
        sessionStorage.setItem('token',usr.data);
        sessionStorage.setItem('log',true);
        sessionStorage.setItem('username',userName);
        
      }
    }
    else{
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setAlert({type:'warning',message:'Please fill in all field'});}}

    const handleclick2 = () => {
      navigate('/page/Account');
    };  

 
    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'Enter') {
            handleLogin();
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 3000);
          }
        };
        window.addEventListener('keydown', handleKeyDown);
    
        // Cleanup listener on component unmount
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [userName,password]); // Effect runs whenever userName or password or log changes
    return (
    <div className="bg-slate-600 min-h-screen text-white">
    {showAlert && <ShowAlert type={alert.type} message={alert.message} />}
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-800 p-8 rounded-lg w-96">
                <h1 className="text-2xl font-bold mb-4 ">Login</h1>
                <input type="text" placeholder="Username" className="text-black w-full p-2 border border-gray-300 rounded-lg mb-4" 
                onChange={(e) => setUserName(e.target.value)} 
                value={userName}
               />
                <input type="password" placeholder="Password" className="text-black w-full p-2 border border-gray-300 rounded-lg mb-4"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 />
                <button className="p-y-1 mb-2" onClick={handleclick2}>Don't have account yet ?</button> 
                <button  onClick={handleLogin} className="w-full bg-emerald-600 text-white p-2 rounded-lg hover:opacity-50 focus:ring-emerald-500 focus:ring ">Sumbit</button>
            </div>
        </div>
        

    </div>
  );
}

export default Login;
