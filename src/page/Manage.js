import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../card/usercard";
import Status from "../card/status";
import axios from "axios";
import moment from "moment";
import Report from "../card/report";
import Task from "../card/task";
import Comment from "../card/comment";
import {Input,Modal,Form,DatePicker,Cascader,Carousel} from 'antd';
import { Scrollbar } from 'react-scrollbars-custom';
import Schedule from "../card/schedule";
function Manage(){
const log=sessionStorage.getItem('log')
useEffect(() => {
    if(!log){navigate('/page/Login');}
    ;},[log])
const project_id=sessionStorage.getItem('project_id')
const username=sessionStorage.getItem('username')
const data={project_id:project_id}
const navigate = useNavigate();
const format =(date)=> {
        return moment(date).format('DD/MM/YYYY')
      }
const format2 =(date)=> {
    return moment(date).format('DD/MM/YYYY HH:mm')

}

//form
const [form] = Form.useForm();
const [reportform]=Form.useForm();
const [feedbackform]=Form.useForm();
const [commentform]=Form.useForm();

//password
const [visible,setVisible]=useState(false); 
const showPassword=()=>{setVisible(!visible);}

//create task modal
const [openModal,setOpenModal]=useState(false);
const closeModal=()=>{setOpenModal(false);}

// task modal
const [openTaskModal,setOpenTaskModal]=useState(false);
const closeTaskModal=()=>{setOpenTaskModal(false);}

//create report modal
const [openCreateReportModal,setOpenCreateReportModal]=useState(false);
const closeCreateReportModal=()=>{setOpenCreateReportModal(false);}

//show report modal
const [showReportModal,setShowReportModal]=useState(false);
const closeShowReportModal=()=>{setShowReportModal(false);}

const [task,setTask]=useState([]);
const [isManager,setIsManager]=useState(false);
const [manager_id,setManagerId]=useState(null);
const [report,setReport]=useState([]);
const [clickedTask,setClickedTask]=useState({task:"",description:"",start_date:"",end_date:"",status:"",link:""});
const [clickedTaskId,setClickedTaskId]=useState(null);


const [comment,setComment]=useState([]);
const fetchComment=async(id)=>{
    const data={task_id:id}
    const rec=await axios.post("https://magnificent-playfulness-production.up.railway.app/Comment/findComment",data,{headers: {token: sessionStorage.getItem("token")}});
    setComment(rec.data);
}
const sentComment=async()=>{
    const data={};
    data.username=username;
    data.project_id=project_id;
    data.task_id=clickedTaskId;
    data.comment=commentform.getFieldValue("comment")===undefined?"":commentform.getFieldValue("comment");
   if(data.comment.trim()!==""){
    await axios.post("https://magnificent-playfulness-production.up.railway.app/Comment/createComment",data,{headers: {token: sessionStorage.getItem("token")}})
    commentform.resetFields();
    fetchComment(clickedTaskId);

   }
}

const createReport=async()=>{
    const data={};
    data.project_id=project_id;
    data.task_id=clickedTaskId;
    data.date=moment();
    data.content=reportform.getFieldValue("content")===undefined?"":reportform.getFieldValue("content");
    data.description=reportform.getFieldValue("description")===undefined?"":reportform.getFieldValue("description");
    data.attachment=reportform.getFieldValue("attachment")===undefined?"":reportform.getFieldValue("attachment");
    data.manager_feedback="";
    if(data.content.trim()!==""&&data.description.trim()!==""){
        await axios.post("https://magnificent-playfulness-production.up.railway.app/Report/create_report",data,{headers: {token: sessionStorage.getItem("token")}})
        reportform.resetFields();
        fetchReport(clickedTaskId); 
        closeCreateReportModal();   
    }
    }

const fetchReport=async(id)=>{
    const data={task_id:id}
    const rec=await axios.post("https://magnificent-playfulness-production.up.railway.app/Report/find_report",data,{headers: {token: sessionStorage.getItem("token")}})
    setReport(rec.data);
}
const handleClickedTask=(id)=>{
    fetchReport(id);//only fetch report when user click on the task
    fetchComment(id);//only fetch comment when user click on the task
    setClickedTaskId(id);
    setOpenTaskModal(true);
    const tsk=task.find((item)=>item.id===id);
    setClickedTask(tsk);
}
const [clickedReport,setClickedReport]=useState({id:null,description:"",content:"",attachment:"",manager_feedback:""});
const handleClickedReport=(id)=>{
    const rp=report.find((item)=>item.id===id);
    const res={}
    res.id=id;
    res.description=rp.description;
    res.content=rp.content;
    res.attachment=rp.attachment;
    res.manager_feedback=rp.manager_feedback;
    setClickedReport(res);
    fetchFeedback(id);//only fetch feedback when user click on the report
    setShowReportModal(true);
}
const [feedback,setFeedback]=useState([]);
const fetchFeedback=async(id)=>{
    const data={report_id:id,manager_id:manager_id}
    console.log(data);
    const rec=await axios.post("https://magnificent-playfulness-production.up.railway.app/Feedback/findFeedback",data,{headers: {token: sessionStorage.getItem("token")}})
    setFeedback(rec.data.dt);
    setManagerAvatar(rec.data.manager_avatar);
}
const sendFeedback=async()=>{
    const data={};
    data.username=username;
    data.report_id=clickedReport.id;
    data.feedback=feedbackform.getFieldValue("comment")===undefined?"":feedbackform.getFieldValue("comment");
    data.date=moment();
    if(data.feedback.trim()!==""){
    await axios.post("https://magnificent-playfulness-production.up.railway.app/Feedback/createFeedback",data,{headers: {token: sessionStorage.getItem("token")}})
    feedbackform.resetFields();
    fetchFeedback(clickedReport.id);
    }
}

const [project,setProject] = useState({id:null,name:"",description:"",start_date:"",end_date:"",status:"",url:"",unique_id:"",password:""});
const [member,setMember] = useState([]);
const handleCreate=async()=>{
    const data={}
    data.project_id=project_id;
    data.task=form.getFieldValue("task_name")===undefined?"":form.getFieldValue("task_name");
    data.description=form.getFieldValue("description")===undefined?"":form.getFieldValue("description");
    data.start_date=form.getFieldValue("start_date")===undefined?"":form.getFieldValue("start_date");
    data.end_date=form.getFieldValue("end_date")===undefined?"":form.getFieldValue("end_date");
    data.link=form.getFieldValue("link")===undefined?"":form.getFieldValue("link");
    const status=form.getFieldValue("status")===undefined?"":form.getFieldValue("status");
    data.status=status[0]===undefined?"":status[0];
    if(data.task.trim()!==""&&data.description.trim()!==""&&data.status.trim()!==""){ 
    await axios.post("https://magnificent-playfulness-production.up.railway.app/Task/create",data,{headers: {token: sessionStorage.getItem("token")}})
    form.resetFields();
    setOpenModal(false);
    fetchTask(); }
}
const fetchTask=async()=>{
    const data={project_id:project_id}
    const rec=await axios.post("https://magnificent-playfulness-production.up.railway.app/Task/find",data,{headers: {token: sessionStorage.getItem("token")}})
    setTask(rec.data);
}
const [avatar,setAvatar]=useState("");
const [managerAvatar,setManagerAvatar]=useState("");
const getAvatar=async()=>{ 
    console.log(data);
    const rec=await axios.post("https://magnificent-playfulness-production.up.railway.app/basics/getUser",{},{headers: {token: sessionStorage.getItem("token")}})
    setAvatar(rec.data);
}
useEffect(() => {
axios.post("https://magnificent-playfulness-production.up.railway.app/Project/find",data,{headers: {token: sessionStorage.getItem("token")}}) 
.then((response)=>{
    setProject(response.data.dt);
    setManagerId(response.data.dt.manager_id);
    if(response.data.uid===response.data.dt.manager_id){setIsManager(true);
    }
})

axios.post("https://magnificent-playfulness-production.up.railway.app/Project_joined/find",data,{headers: {token: sessionStorage.getItem("token")}})
.then((response)=>{
setMember(response.data);})
fetchTask();
getAvatar();

},[])


return(
<div className="bg-slate-500 bg-scroll min-h-screen text-white ">
    
    <Modal title="Create new task" open={openModal} onOk={handleCreate} onCancel={closeModal} className="relative top-1/4">
        <Form form={form}>   
            <Form.Item
                  className="w-1/2 "
                  label="Task Name"
                  name="task_name"
                  rules={[{ required: true, message: 'Please input!' }]}
                >
                  <Input className="bg-slate-200 w-80" placeholder="To do 1..."/>
            </Form.Item>
            <Form.Item
                  className="w-1/2 "
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: 'Please input!' }]}
                >
                  <Input className="bg-slate-200 w-80" placeholder="Do something..."/>
            </Form.Item>
            <Form.Item
                  className="w-1/2 relative left-4 "
                  label="Url"
                  name="link"
                >
                  <Input className="bg-slate-200 w-80 relative left-14" placeholder="Do something..."/>
            </Form.Item>
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
            <Form.Item label="Status" name="status" className="w-56 relative left-3"
            rules={[{ required: true, message: 'Please select'}]}
            >
                <Cascader className="relativ left-8"
                options={[
                    {value: 'inProgress',label: 'In Progress',style:{color:'red'}},{value: 'notStarted',label: 'Not Started',},
                    {value: 'finish',label: 'Finished',},
                ]}
                />
            </Form.Item>
        </Form>
    </Modal>
 
    <Modal  title=""  open={openTaskModal} onCancel={closeTaskModal} width={1200} onOk={closeTaskModal} >
        <div className="grid grid-cols-3 gap-x-8">
            <div className="col-span-2 flex flex-col bg-slate-800 text-white rounded-md p-4 gap-y-6">
                <div>
                    <div className="text-xl font-bold">{clickedTask.task}</div>
                    <div className="text-gray-300">{clickedTask.description}</div>
                    <div>{format(clickedTask.start_date)} to {format(clickedTask.end_date)}</div> 
                    <Status status={clickedTask.status}></Status>
                    <a href={clickedTask.link} className="text-blue-300 overflow-x-hidden truncate block">{clickedTask.link}</a>                    
                </div>
                <Scrollbar style={{ width: 700, height: 400 }} noScrollX={true} className="relative top-4" >
                  <div className="p-4 flex flex-col gap-y-6 rounded-md bg-white">
                    <div className="text-xl text-black font-bold">Comment</div>
                    <Comment editable={true} avatar={avatar} onSubmit={()=>sentComment()} username={username} form={commentform} ></Comment>
                    {comment?.map((item)=>(
                        <Comment avatar={item.avatar} username={item.username} comment={item.comment}></Comment>
                    ))}
                </div>
                </Scrollbar>
            </div>  
            <div className="flex flex-col gap-y-2 ">
               <div className="text-xl flex flex-row">
                    <div className="font-bold">Report</div>
                    {!isManager&&(
                    <div className="text-base relative left-14 bg-slate-400 w-28 text-white font-bold rounded-md">
                        <div className="flex flex-row p-1">
                           <div className="relative "> Add report</div> 
                           <div className="relative -left-0.5">
                                <button onClick={()=>setOpenCreateReportModal(true)} className="relative top-0.5 left-2 rounded "><img src="https://i.ibb.co/6NjsFjn/plus.png" className="h-4 w-4"></img></button>
                           </div>
                        </div>
                    </div>)}
                  
                </div>
                <Carousel infinite={false} arrows dotPosition="left" slidesToShow={3} centerMode={false}>
                    {report?.map((item)=>
                    <div className="mt-2">
                    <Report onclickbutton={()=>handleClickedReport(item.id)} desciption={item.description} username={item.username}
                    date={format(item.date)} attachment={item.attachment}
                    ></Report>
                    </div>)} 
                </Carousel>
            </div> 
        </div>          
    </Modal>

    <Modal  open={openCreateReportModal} onCancel={closeCreateReportModal} width={1000} onOk={createReport} >
        <div className="flex gap-4">
            <div className="flex-1 p-4">
            <h3 className="text-xl font-bold relative">Report</h3>
                <Form form={reportform} layout="vertical" className="space-y-4">
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Input className="bg-slate-200 w-full" placeholder="" />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Input.TextArea className="bg-slate-200" rows={4} />
                </Form.Item>
                <Form.Item
                    label="Attachment"
                    name="attachment"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Input className="bg-slate-200" placeholder="Link to your attachment" />
                </Form.Item>
                </Form>
            </div>
        </div>
    </Modal>

    <Modal  open={showReportModal} onCancel={closeShowReportModal} width={1000} onOk={closeShowReportModal}>
        <div className="grid grid-cols-2">
            <div className="flex-1 p-4">
                <div className="relative top-2 flex flex-col gap-y-2">
                    <div className="text-xl font-bold">{clickedReport.description}</div>
                    <div className="text-balance"> 
                   {clickedReport.content}
                   </div>
                    </div>
                    <a className=" relative top-4 truncate block overflow-hidden text-cyan-500"href={clickedReport.attachment}>{clickedReport.attachment}</a>
            </div>
            <div className="flex-1 p-4">
                <h3 className="text-xl font-bold ">Feedback</h3>
                    <Scrollbar style={{ width: 500, height: 300 }} noScrollX={true} className="relative top-4" >
                    <div className="flex flex-col gap-y-3">   
                    {feedback?.map((item)=>(
                    <Comment username={item.username} isFeedback={true} comment={item.feedback} date={format2(item.date)}></Comment>))}
                    {isManager&&(
                    <Comment avatar={managerAvatar} username={username} isFeedback={true} editable={true} form={feedbackform} onSubmit={()=>sendFeedback()} ></Comment>)}
                    </div>
                </Scrollbar>  
            </div>
        </div>
    </Modal>
    
   
    <div className="grid grid-cols-3 gap-2 relative top-9  max-h-full">
        <div className="col-span-2 text-black bg-white relative left-20 rounded-xl w-11/12 ">
            <div className="grid  grid-cols-3 p-4 gap-4 ">
                <div className="text-white col-span-2 p-4 bg-gradient-to-tr from-black via-violet-800 to-pink-500 rounded-md ">
                    <div className=" text-lg font-bold" >{project?.name??"N?A"}</div>
                    <div className=" text-base text-slate-200 " >{project?.description??"N/A"}</div>
                    <a href={project?.url??"N/A"} className="text-sm overflow-x-hidden text-blue-300 truncate w-full block">{project?.url??"N/A"}</a>
                    <div className="text-sm text-slate-300">Start date: {format(project.start_date)} - End date: {format(project.end_date)}</div>
                </div>
                <div className="col-span-1 text-white text-base p-4 bg-gradient-to-tr from-indigo-950 via-violet-950 to-violet-900 rounded-md">
                    <div className="grid grid-row-3 gap-y-1 ">
                        <Status status={project?.status??"N/A"}></Status>
                        <div className="text-sm ">Invitation code: {project?.unique_id??"N/A"}</div>
                        {isManager&&
                        <div className="text-sm flex flex-row">
                            <div className="font-bold">Password: </div>
                            
                            <Input
                                type={visible? 'text':'password'}
                                className=" bg-slate-300 h-6 relative left-1"
                                value={project?.password??"N/A"}
                                readOnly
                            />
                            
                           <button onClick={showPassword}><img className="h-6 w-8 relative -left-4" src="https://i.ibb.co/WgRM5cV/hide.png"></img></button>
                        </div>}
                    </div>
                </div>
            </div>
            <div className="p-4 ">
                <div className="text-white bg-gradient-to-tr from-black via-amber-700 to-yellow-400 p-3 rounded-md flex flex-col gap-2 ">
                    <div className="text-xl grid grid-cols-2">
                        <div className="font-bold">Task</div>
                        {isManager&&
                         <div className="flex flex-row   justify-end text-sm ">
                            <div className="relative right-2 top-0.5 font-bold">Add task</div>
                            <button onClick={()=>setOpenModal(true)}><img src="https://i.ibb.co/6NjsFjn/plus.png" className="h-4 w-4"></img></button>
                        </div>}
                    </div>
                    <div>
                    <Carousel  dotPosition={'bottom'} slidesToScroll={1} slidesToShow={3} infinite={false} dots={true} >
                        {task?.map((item)=>(
                        <Task
                        onbuttonclick={()=>{handleClickedTask(item.id)}}
                        key={item.id}
                        task={item.task}
                        startdate={format(item.start_date)}
                        enddate={format(item.end_date)}
                        status={item.status}
                        link={item.link}
                        /> ))}
                    </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <div className=" bg-white w-64 relative left-4 rounded-xl flex flex-col text-black py-4 gap-y-4">
            <div className="text-center text-white relative -top-4 text-xl font-bold border-b-2 rounded-md bg-slate-800 ">Member</div>
            {member?.map((user)=>(<UserCard key={user.user_id} name={user.realname} username={user.username} avatar={user.avatar}  bachelors={user.bachelor} ></UserCard>))}
        </div>
    </div>
    <div className="p-20 relative mr-16">
        <div className="text-white bg-gradient-to-tr from-black via-emerald-700 to-yellow-400 p-3 rounded-md flex flex-col gap-2 ">
            <div className="text-xl flex flex-col">
                <div className="font-bold">Schedule</div>
                <Schedule task={task}/>
            </div>
        </div>
    </div>
</div>
)
}


export default Manage;