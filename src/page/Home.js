import { useNavigate} from 'react-router-dom';
function Home() {
  let navigator=useNavigate();
  let log=sessionStorage.getItem('log'); 
  const handleClick=()=>{
      if(log)
      navigator('/page/Account_infor');
  }


return (
<div className="h-screen ">
  <div className="">
    <div className="text-xl font-sans p-28 relative top-24 grid-rows-2 ">
        <div className="text-4xl font-sans font-bold ">Welcome to ACTProManager</div>
        <div className="relative top-6 grid-rows-3">
            <div > Simplifies task management, progress tracking,and goal setting,  </div>
            <div > empowering you to achieve project success with ease.</div>
            <button className="text-white border rounded bg-emerald-500 h-12 w-96 relative top-4 hover:opacity-60 focus:ring-white focus:ring" onClick={handleClick}>
                Get Started
            </button>
        </div>
    </div>
  </div>
</div>
  );
}

export default Home;