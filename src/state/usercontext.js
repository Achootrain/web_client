import React, { createContext, useState } from 'react';

// Create Context
export const UserContext = createContext();

// Create Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({id:null,username:null});
  const [clickedProject,setClickedProject] = useState({id:null,name:"",description:"",start_date:"",end_date:"",status:"",url:"",unique_id:"",password:""});
  
  return (
    <UserContext.Provider value={{ user, setUser,clickedProject,setClickedProject }}>
      {children}
    </UserContext.Provider>
  );
};
