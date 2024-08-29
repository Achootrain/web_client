import React, { useEffect } from 'react';
import {useState} from 'react';
function ShowAlert({ type, message }) {
  const getColor = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500'; // Default color
    }
  };
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✔';
      case 'error':
        return 'X';
      case 'warning':
        return '!';
      default:
        return 'fa-info-circle'; // Default icon
    }
  }

  
  return (
    <div className={`fixed flex flex-row top-4 left-1/2 transform -translate-x-1/2 h-12 w-1/3 ${getColor()} text-white p-4 z-50 rounded-md shadow-lg items-center`}>
      <div className="relative left-2 text-2xl">{getIcon()}</div>
     <div className="relative left-8"> {message}</div>
    </div>
  );
}

export default ShowAlert;
