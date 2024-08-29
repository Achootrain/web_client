function Report({username,desciption,date,attachment,onclickbutton}){
    
    const getUsername=()=>{
        if(!username){return "Username"}
        else{return username}
    }
    const getDescription=()=>{
        if(!desciption){return "Description"}
        else{return desciption}
    }
    const getDate=()=>{
        if(!date){return "Date"}
        else{return date}
    }
    const getAttachment=()=>{
        if(!attachment){return "Attachment"}
        else{return attachment}
    }
    return (
        <div className="flex flex-col bg-slate-600 rounded-md text-white w-56 p-2 ">
            <div className="flex flex-col gap-1">   
                <div className="bg-slate-900 rounded-md hover:text-slate-300">
                    <button onClick={onclickbutton}><div className="text-lg font-bold ml-1 text-left">{getDescription()}</div></button>
                </div>
                <div className="bg-slate-900 rounded-md p-1">
                   
                    <div className="text-slate-300 text-base">{getUsername()}</div>
                    <div className="text-sm">{getDate()}</div> 
                    <a href={getAttachment} className="text-blue-400 overflow-x-hidden truncate block">{getAttachment()}</a>
                </div>
            </div>
        </div>
    )
}
export default Report;