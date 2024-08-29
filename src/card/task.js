import Status from "./status";
function Task({ task,startdate,enddate,link,status,onbuttonclick,onedit }) {
    return (
    
      <div className="flex flex-col text-white p-2  w-56 rounded-md bg-slate-700 ">
        <div className="text-lg font-bold   flex flex-row">
        <button onClick={onbuttonclick}>
          <div className="hover:text-slate-300">{task}</div>
        </button>
          <button className="ml-auto hover:opacity-30"><img className="h-4 w-4 " src="https://i.ibb.co/YbzGGh0/edit.png"></img></button>
        </div>
        <div className="text-sm ">{startdate} - {enddate}</div>
        <div>
          <a href={link} className="text-sm overflow-x-hidden text-blue-300 truncate text-clip block" >{link}</a>
        </div>
       <Status status={status}></Status> 
      </div>
   
    );
  }
  
  export default Task;