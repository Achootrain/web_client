import { useCallback, useState,useEffect } from "react";
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create_Account() {
    const navigate = useNavigate();
    const log=sessionStorage.getItem('log');
    useEffect(() => {
      if(log){
        navigate('/page/Account_infor');
      }
    },[log])

    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [state,setState] = useState("Add username");
    const handleLogin = async() => {
    if(userName.trim()!==''&&password.trim()!==''){
        const usr=await axios.post(`${process.env.REACT_APP_SERVER}/users`,{
            username: userName,
            password: password
        });
        setUserName('');
        setPassword('');
        setState('Add username');
        if(usr.data.error){
            alert(usr.data.error);}
        else{alert("Sucessfully created account");navigate('/page/Login');}
    }
    else{
        alert("Please fill in all fields");}
    }

    const handleclick2=()=>{
      navigate('/page/Login');
    }
    const handleMouse = useCallback(() => {
       if(state==="Add username"){
           return "Add username"}
        else if(state==="Add password"){
            return "Add password"
        }
      },[state]);
      
      useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'Enter') {
            handleLogin();
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        // Cleanup listener on component unmount
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [userName, password]); // Effect runs whenever userName or password changes

    return (
    <div className="bg-slate-600 w-screen h-screen text-white">
        <div className="flex justify-center items-center h-full">
            <div className="bg-slate-800 p-8 rounded-lg w-96">
                <h1 className="text-2xl font-bold mb-4 ">{handleMouse()}</h1>
                <input type="text" placeholder="Username" className="text-black w-full p-2 border border-gray-300 rounded-lg mb-4" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onFocus={(e)=>setState("Add username")}
                />
                <input type="password" placeholder="Password" className="text-black w-full p-2 border border-gray-300 rounded-lg mb-4"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 onFocus={(e)=>setState("Add password")}
                 />
                <button className="p-y-1 mb-2" onClick={handleclick2}>Already have account ?</button> 
                <button onClick={handleLogin} className="w-full bg-emerald-600 text-white p-2 rounded-lg hover:opacity-50 focus:ring-emerald-500 focus:ring ">Create Account</button>
            </div>
        </div>
        

    </div>
  );
}

export default Create_Account;
