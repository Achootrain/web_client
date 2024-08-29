function UserCard({name,username,avatar,bachelors}){
const getname=()=>{
   if(name){
       return name;
   }
   else return "Name";
}
const getusername=()=>{
    if(username){
        return username;
    }
    else return "Username";
}
const getavatar=()=>{
    if(avatar){
        return avatar;
    }
    else return "https://i.ibb.co/0DqWK03/user.png";
}

const getbachelors=()=>{
    if(bachelors){
        return bachelors;
    }
    else return "Invalid";
}
return (
<button>   
    <div className="bg-white rounded-md flex flex-row h-16 w-64 hover:scale-110   ">
        <div className="">
            <img src={getavatar()} alt="avatar" className="h-16 rounded-full p-2"/>
        </div>
        <div className="flex flex-col text-left pl-2 place-content-center text-black">
            <div className="text-base  font-bold overflow-hidden ">{getname()}</div>
            <div className="text-sm  overflow-hidden">{getusername()}</div>
            <div className="text-sm overflow-hidden">{getbachelors()}</div>
        </div>
    </div>
</button>
)

}


export default UserCard;