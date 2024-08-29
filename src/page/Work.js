import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {DatePicker,Form,Input,} from 'antd';
import moment from 'moment';
import { nanoid } from 'nanoid';
import ShowAlert from "../card/alert";
import Status from "../card/status";


function Work() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [OpenModal1, setOpen1] = useState(false);
  const [OpenModal2, setOpen2] = useState(false);
  const [project, setProject] = useState([]);
  const [joinedProject, setJoinedProject] = useState([]);
  const [showalert,setshowAlert]=useState(false);
  const [showalert2,setshowAlert2]=useState(false);
  const [alert,setAlert]=useState({type:"",message:""});
  const [alert2,setAlert2]=useState({type:"",message:""});
  const format =(date)=> {
    return moment(date).format('DD/MM/YYYY')
      
  }
  
  const handleCreate = async() => {
    const projectname = form.getFieldValue('project_name');
    const description = form.getFieldValue('description');
    const startdate = form.getFieldValue('start_date');
    const enddate = form.getFieldValue('end_date');
    const url = form.getFieldValue('url');
    const password = form.getFieldValue('password');
    if(projectname!==undefined&&description!==undefined&&startdate!==undefined&&enddate!==undefined&&password!==undefined
      &&projectname.trim()!==""&&description.trim()!==""
    ){
    const data={};
    data.name=projectname;
    data.description=description;
    data.start_date=startdate;
    data.end_date=enddate;
    data.url=url;
    data.password=password;
    data.status="active";
    data.unique_id=nanoid(10);//generate a unique id
    const res=await axios.post("https://magnificent-playfulness-production.up.railway.app/Project/created",data,{headers: {token: sessionStorage.getItem("token")}}) 
    if(res.data.error){setAlert({type:"error",message:res.data.error});}//async only work with set object state 
    else{setAlert({type:"success",message:res.data.message});}
    fetchManagedProjects();
    form.resetFields();
    setOpen1(false);
  }
  };
 const handleCreate2=()=>{
  handleCreate();
  setshowAlert(true);
  setTimeout(() => {
    setshowAlert(false);
  }, 3000);
 }

  const handleJoin = async() => {
    const project_id = form2.getFieldValue('project_id');
    const password = form2.getFieldValue('password');
    if(project_id!==undefined&&password!==undefined&&project_id.trim()!==""){
      const data={};
      data.unique_id=project_id;
      data.password=password;
      const res=await axios.post("https://magnificent-playfulness-production.up.railway.app/Project_joined",data,{headers: {token: sessionStorage.getItem("token")}})
      if(res.data.error){
        setAlert2({type:"error",message:res.data.error});}
      else{setAlert2({type:"success",message:res.data.message});}
      fetchJoinedProjects();
      form2.resetFields();
      setOpen2(false);
    }
  };
  const handleJoin2=()=>{
    handleJoin();
    setshowAlert2(true);
    setTimeout(() => {
      setshowAlert2(false);
    }, 3000);
  }
  const handleClickedProject = (id) => {
    sessionStorage.setItem('project_id',id);
    navigate('/page/Manage');
  }

  const fetchManagedProjects = async () => {
    try {
      const res = await axios.post("https://magnificent-playfulness-production.up.railway.app/Project/managed", {}, {
        headers: { token: sessionStorage.getItem("token") }
      });

      if (!res.data.error) {
        const prj = res.data;
        setProject(prj);  // Corrected from 'response.data' to 'res.data'
      }
    } catch (error) {
      console.error("Error fetching managed projects:", error);
    }
  };

  const fetchJoinedProjects = async () => {
    const res = await axios.post("https://magnificent-playfulness-production.up.railway.app/Project_joined/joined", {}, {
      headers: { token: sessionStorage.getItem("token") }
    });
    if(!res.data.error){
      setJoinedProject(res.data);
    }
  }
  const log=sessionStorage.getItem('log')
  useEffect(() => {
    if(!log){navigate('/page/Login');}
    fetchManagedProjects();
    fetchJoinedProjects();
  }, []); 
  
  return (
  
    <div className="min-h-screen bg-slate-600">
      {showalert&&<ShowAlert type={alert.type} message={alert.message}/>}
      {showalert2&&<ShowAlert type={alert2.type} message={alert2.message}/>}

      <div className="grid grid-cols-2 place-items-center">
        <div className="flex flex-col p-9 gap-y-6 w-4/5 ">
          <div className="text-white text-2xl font-bold border-b-2">Your Project</div>
          <div className="flex flex-row h-20 bg-white rounded-lg border-slate-400 border-2 ">
            <div>
              <div
                onClick={() => setOpen1(true)}
                className="hover:opacity-70 bg-gray-300 w-16 h-16 rounded-full border-2 border-dashed border-gray-500 relative left-2 top-1.5 flex items-center justify-center cursor-pointer">
                <img src="https://i.ibb.co/6NjsFjn/plus.png" className="h-6" alt="Plus icon" />
              </div>
            </div>
            <div className="text-gray-800 relative left-9 top-2 flex flex-col">
              <div className="font-bold">Create New Project</div>
              <div className="flex-none text-sm text-slate-500">Just need a few steps to get started....</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-9 gap-y-6 w-4/5">
          <div className="text-white text-2xl font-bold border-b-2 ">Joined Project</div>
          <div className="flex flex-row h-20 bg-white rounded-lg border-slate-400 border-2">
            <div>
              <div
                onClick={() => setOpen2(true)}
                className="hover:opacity-70 bg-gray-300 w-16 h-16 rounded-full border-2 border-dashed border-gray-500 relative left-2 top-1.5 flex items-center justify-center cursor-pointer"
              >
                <img src="https://i.ibb.co/6NjsFjn/plus.png" className="h-6" alt="Plus icon" />
              </div>
            </div>
            <div className="text-gray-800 relative left-9 top-2 flex flex-col">
              <div className="font-bold">Joined New Project</div>
              <div className="flex-none text-sm text-slate-500">Find a project to join</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 place-items-center ">
        <div className="flex flex-col w-4/5 p-9 relative -top-10">
          {project&& project.map((item) => (
            <button onClick={()=>handleClickedProject(item.id)}>
              <div key={item.id} className="transition ease-in-out delay-100 flex flex-col mt-8 bg-white relative rounded-md  hover:scale-110">
                <div className=" flex flex-row relative left-4">
                      <div className="font-bold">{item.name}</div>
                      <div className="text-xs relative left-4 top-1 text-slate-600 bg-slate-200 h-4">{format(item.start_date)} -{format(item.end_date)}</div>
                </div>
                <div className="flex-none text-sm text-slate-500 text-left relative left-4">{item.description}</div>
                
                <div className="flex-none flex row text-sm text-slate-800 relative left-4">
                  <Status status={item.status}></Status>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="flex flex-col w-4/5 p-9 relative -top-10">
          {joinedProject&& joinedProject.map((item) => (
            <button onClick={()=>handleClickedProject(item.id)}>
              <div key={item.id} className="flex flex-col mt-8 bg-white relative rounded-md  hover:scale-110 transition ease-in-out delay-100">
                <div className=" flex flex-row relative left-4">
                      <div className="font-bold">{item.name}</div>
                      <div className="text-xs relative left-4 top-1 text-slate-600 bg-slate-200 h-4">{format(item.start_date)} -{format(item.end_date)}</div>
                </div>
                <div className="flex-none text-sm text-slate-500 text-left relative left-4">{item.description}</div>
                <div className="flex-none flex row text-sm text-slate-800 relative left-4">
                  Status :<div className={`relative left-1 font-bold ${item.status === 'active' ? 'text-green-500' : 'text-red-500' }`}>
                  {item.status}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      
      
      </div>
      {/* Modal */}
      
      {OpenModal1 && (
        <div className="fixed inset-0  bg-gray-800 bg-opacity-80 flex justify-center items-center  ">
          <div className="flex flex-col bg-white rounded-lg shadow-lg h-96 w-4/5 p-6 gap-y-4 relative top-16">
            <div className="text-xl font-bold ">Create new Project</div>
            <Form form={form}>
              <div >
                <Form.Item
                  className="w-1/2 "
                  label="Project Name"
                  name="project_name"
                  rules={[{ required: true, message: 'Please input!' }]}
                >
                  <Input className="bg-slate-200 w-80" placeholder="Project A"/>
                </Form.Item>
              </div>
              <div >
                <Form.Item
                  className="w-1/2"
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: 'Please input!' }]}
                >
                  <Input className="bg-slate-200 left-3" />
                </Form.Item>
              </div>
              <div className="flex flex-row gap-x-10">
                <Form.Item

                  label="Start Date"
                  name="start_date"
                  rules={[{ required: true, message: 'Please input!' }]}
                >
                  <DatePicker className="left-5"/>
                </Form.Item>
                
                <Form.Item
                  className=""
                  label="End Date"
                  name="end_date"
                  rules={[{ required: true, message: 'Please input!' }]}
                >
                  <DatePicker />
                </Form.Item>

              </div>
              <div >
                <Form.Item
                  className="w-1/2 relative left-3"
                  label="Project url"
                  name="url"

                >
                  <Input className="bg-slate-200 left-5" placeholder="Link to your project"/>
                </Form.Item>
              </div>
              <div >
                <Form.Item
                  className="w-1/2 relative"
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input!' }]}
                >
                  <Input.Password className="bg-slate-200 left-5" />
                </Form.Item>
              </div>
             
              <div className="grid grid-cols-2 relative left-2">
                <div className="">
                    <button className="bg-emerald-500 text-white  w-20 rounded-md  hover:opacity-60"
                    onClick={handleCreate2}
                    > Create
                    </button>
                </div>
                <div className="flex justify-end">
                  <button className="bg-emerald-500 text-white  w-20 rounded-md  hover:opacity-60 "
                  onClick={() => setOpen1(false)}
                  > Close 
                  </button>
                </div>   
              </div>
            </Form>
          </div>
        </div>
      )}
    {OpenModal2 && (
      <div>
        <div className="fixed inset-0  bg-gray-800 bg-opacity-80 flex justify-center items-center ">
          <div className="w-1/2 h-1/2 bg-white rounded-lg p-6">
            <div className="flex flex-col gap-y-3"> 
              <div className="text-xl font-bold ">Join Project</div>
              <Form form={form2}  layout="vertical">
                <Form.Item
                    label="Project id"
                    name="project_id"
                    rules={[{ required: true, message: 'Please input project id' }]}
                  >
                    <Input className="left-2 w-1/2 bg-slate-200"/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input password!' }]}
                  >
                    <Input.Password className="left-2 w-1/2 bg-slate-200"/>
                </Form.Item>
                <div className="flex flex-row gap-x-2 relative left-2">
                  <div className="">
                      <button className="bg-emerald-500 text-white  w-20 rounded-md  hover:opacity-60"
                      onClick={handleJoin2}
                      > Join
                      </button>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-emerald-500 text-white  w-20 rounded-md  hover:opacity-60 "
                    onClick={() => setOpen2(false)}
                    > Close
                    </button>
                  </div>   
                </div>
              </Form>
            </div> 
          </div>
        </div>
      </div>
    )}
  </div>
  );
}

export default Work;
