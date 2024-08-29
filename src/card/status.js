function Status({ status }) {
const getstatus=()=>{
   switch(status){
       case "inProgress":
           return "text-yellow-500";
       case "finish":
           return "text-emerald-500";
       case "notStarted":
           return "text-red-500";
        case "active":
            return "text-emerald-500";
        case "closed":
            return "text-red-500";
       default:
           return "text-blue-500";
   }
}

return (
<div className="flex flex-row text-sm">  
    <div className=""> Status :</div>
    <div className={`${getstatus()} relative left-1 font-bold`}>
       {status}
    </div>
</div> 

);
    
}
export default Status;