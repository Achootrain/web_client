import { useState,useEffect } from "react";
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';
function Account_infor() {
  //check login
  const log=sessionStorage.getItem('log')
  const navigate = useNavigate();
  useEffect(() => {
    if(!log){navigate('/page/Login');}
    ;},[log])


  const format =(date)=> {
    return moment(date).format('MMMM Do YYYY')
  }
 
  const handleLogout = () => { 
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('log');
    navigate('/page/Login');
  }; 
  const adjustInfor=()=>{
    navigate('/page/Form');
  }
  const [basics, setBasics] = useState([]);
  const [location, setLocation] = useState([]);
  const [awards, setAwards] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [education, setEducation] = useState([]);
  const [interests, setInterests] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);
  const [skills, setSkills] = useState([]);
  const [volunteers, setVolunteer] = useState([]);
  const [works, setWork] = useState([]);
  const [profile, setProfile] = useState([]);

useEffect(() => {
  axios.post(`${process.env.REACT_APP_SERVER}/data/getData`, {},{
    headers: {token: sessionStorage.getItem("token")}
  }).then((response) => {
    if(!response.data.error){
      setBasics(response.data.basic);
      setLocation(response.data.location);
      setProfile(response.data.profile);
      setAwards(response.data.award);
      setCertificates(response.data.certificate);
      setEducation(response.data.education);
      setInterests(response.data.interest);
      setLanguages(response.data.language);
      setProjects(response.data.project);
      setPublications(response.data.publication);
      setSkills(response.data.skill);
      setVolunteer(response.data.volunteer);
      setWork(response.data.work);
    }
  })
}, []);
  
  const deleteWork =async (record_id) => {
      await axios.post(`${process.env.REACT_APP_SERVER}/works/delete`, {id:record_id});
      setWork(works.filter((item) => item.id !== record_id));}
  const deleteEducation =async (record_id) => {
      await axios.post(`${process.env.REACT_APP_SERVER}/educations/delete`, {id:record_id});
      setEducation(education.filter((item) => item.id !== record_id));}
  const deleteProject =async (record_id) => {
      await axios.post(`${process.env.REACT_APP_SERVER}/projects/delete`, {id:record_id});
      setProjects(projects.filter((item) => item.id !== record_id));}
  const deletePublication =async (record_id) => {
      await axios.post(`${process.env.REACT_APP_SERVER}/publications/delete`, {id:record_id});
      setPublications(publications.filter((item) => item.id !== record_id));}
  const deleteVolunteer =async (record_id) => {
      await axios.post(`${process.env.REACT_APP_SERVER}/volunteers/delete`, {id:record_id});
      setVolunteer(volunteers.filter((item) => item.id !== record_id));}
  const deleteAward =async (record_id) => {
      await axios.post(`${process.env.REACT_APP_SERVER}/awards/delete`, {id:record_id});
      setAwards(awards.filter((item) => item.id !== record_id));}
  const deleteCertificate =async (record_id) => {
      await axios.post(`${process.env.REACT_APP_SERVER}/certificates/delete`, {id:record_id});
      setCertificates(certificates.filter((item) => item.id !== record_id));}
  

    return (
    <div className="bg-slate-600 bg-scroll max-h-full text-white">
        <div className="grid grid-cols-3 gap-2 relative top-9 bg-slate-600 max-h-full">
          <div className="col-span-2 bg-white relative left-20 rounded-xl w-11/12 ">
            <div className="flex p-10 ">
              <div className="flex-none text-3xl w-8 ">
                <img src="https://i.ibb.co/2MBj0py/briefcase.png" className="relative top-1 right-2"  alt="Flowbite Logo" />
              </div>
              <div className="flex-none text-3xl font-bold text-cyan-700">
                Work
              </div>
            </div>
            
            {works.map((item, index) => (
            <div key={item.id} className="text-gray-700 mt-2">
              <div className=" relative left-10 w-4/5 bg-slate-300 ">
                <div className="p-4 grid grid-rows-3 gap-y-1">
                  <div className="text-2xl flex">
                    <div className="flex">
                      <img src="https://i.ibb.co/w6QM495/office-building.png" className="flex-none w-8"></img>
                      <div className="flex flex-rows relative left-2 font-bold" >
                        <div>
                        {item.company}
                        </div>
                        <div className="text-white relative left-4">
                          <button className="text-slate-300 hover:opacity-60 hover:text-white text-sm " onClick={()=>deleteWork(item.id)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-base relative left-10">{format(item.startDate)} - {format(item.endDate)}</div>
                  <a href={item.EmployeeWebsite} className="text-sm text-cyan-600 relative left-10 overflow-hidden">{item.EmployeeWebsite}</a>
                </div>
              </div>
              <div className="relative left-10 w-4/5 border-2 text-balance">
                  <div className="p-4">
                    <div className="text-base font-bold relative left-10">Summary</div>
                    <div className="text-base relative left-10">{item.workSummary}</div>
                  </div>
              </div>
            </div>
            ))}

            <div className="flex p-10">
              <div className="flex-none text-3xl w-8 ">
                <img src="https://i.ibb.co/Z2X6cCj/mortarboard-3.png" className="relative top-1 right-2"  alt="Flowbite Logo" />
              </div>
              <div className="flex-none text-3xl font-bold text-cyan-700">
                Education
              </div>
            </div>

            {education.map((item, index) => (
            <div key={item.id} className="text-gray-700">
              <div className=" relative left-10 w-4/5 border-2">
                <div className="p-4 grid grid-rows-5 ">
                  <div className="text-2xl font-bold flex">
                    <div className="flex">
                      <img src="https://i.ibb.co/MG2nkGK/school.png" className="flex-none w-8"></img>
                      <div className="flex flex-row relative left-2" >
                        <div>{item.institution}</div>
                        <div>
                          <button className="text-white hover:opacity-60 hover:text-slate-600 text-sm relative left-4" onClick={()=>deleteEducation(item.id)}>Delete</button> 
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-base relative left-10">{format(item.startDate)} - {format(item.endDate)}</div>
                  <div className="text-base relative left-10">Area: {item.area}</div>
                  <div className="text-base relative left-10">GPA: {item.gpa}</div>
                </div>
              </div>
            </div>))}

            <div className="flex p-10 ">
              <div className="flex-none text-3xl w-8 ">
                <img src="https://i.ibb.co/NV9TDBD/planning.png" className="relative top-1 right-2"  alt="Flowbite Logo" />
              </div>
              <div className="flex-none text-3xl font-bold text-cyan-700">
                Projects
              </div>
            </div>
            {projects.map((item, index) => (
            <div key={item.id}className="text-gray-700 mt-2">
                <div className=" relative left-10 w-4/5 bg-slate-300 ">
                  <div className="p-4 grid grid-rows-2 gap-y-1">
                    <div className="flex flex-row relative left-10 text-xl font-bold" >
                     <div>{item.projectName}</div>
                     <div className="text-sm text-slate-300 hover:text-white relative left-2 top-1.5"><button onClick={()=>deleteProject(item.id)}>Delete</button></div>
                    </div>
                    <div className="text-base relative left-10">{format(item.projectStartDate)} - {format(item.projectEndDate)}</div>
                  </div>
                </div>
                  <div className="relative left-10 w-4/5 border-2 text-balance">
                      <div className="p-4">
                        <div className="text-base font-bold relative left-10">Description</div>
                        <div className="text-base relative left-10 ">{item.projectDescription}</div>
                        <div className="flex-none relative left-10 top-2 text-cyan-700">
                          <a href={item.projectUrl} className="text-sm relative overflow-x-hidden">{item.projectUrl}</a>
                        </div>
                      </div>
                  </div>
            </div>))}
            <div className="flex p-10 ">
                <div className="flex-none text-3xl w-8 ">
                  <img src="https://i.ibb.co/gMXtkZp/research.png" className="relative top-1 right-2"  alt="Flowbite Logo" />
                </div>
                <div className="flex-none text-3xl font-bold text-cyan-700">
                  Publications
                </div>
            </div>
          {publications.map((item, index) => (
            <div key={item.id} className="text-gray-700 w-4/5 relative mt-2">
              <div className="flex flex-row ">
                <div className=" relative left-10 w-2/5 bg-slate-300 ">
                  <div className="p-4 ">
                    <div className="flex-none relative left-10 text-xl font-bold" >{item.publicationName}</div>
                    <div className="text-lg font-serif relative left-10 top-2">{item.publisher}</div>
                    <div className="text-base relative left-10 top-2">{format(item.releaseDate)}</div>
                    <button className="text-slate-400 font-bold hover:text-white text-sm relative left-10 top-2" onClick={()=>deletePublication(item.id)}>Delete</button>

                  </div>
                </div>
                <div className=" relative left-10 border-2  w-2/3">
                  <div className="p-4 ">
                    <div className="flex-none relative text-xl font-bold" >Summary</div>
                    <div className="text-base relative top-2">{item.publicationSummary}</div>
                    <div className="flex-none relative top-2 text-cyan-700">
                          <a href={item.publishedWebsite} className="text-sm relative overflow-x-hidden">{item.publishedWebsite}</a>
                    </div>
                  </div>
                </div>
              </div>          
            </div>))}
           
            
            <div className="flex p-10 ">
                <div className="flex-none text-3xl w-8 ">
                  <img src="https://i.ibb.co/ZNRBWVD/volunteering.png" className="relative top-1 right-2"  alt="Flowbite Logo" />
                </div>
                <div className="flex-none text-3xl font-bold text-cyan-700">
                  Volunteer
                </div>
            </div>
            {volunteers.map((item, index) => (
            <div key={item.id} className="text-gray-700">
                <div className=" relative left-10 -top-8 w-4/5 border-b-2">
                  <div className="p-4 grid grid-rows-2 gap-y-1">
                    <div className="flex flex-row relative left-10 text-lg font-bold" >
                      <div>{item.organization}</div>
                      <button className="text-sm text-slate-300 relative left-2 hover:text-slate-400 " onClick={()=>deleteVolunteer(item.id)}>Delete</button>
                    </div>
                    <div className="flex flex-row  ">
                      <div className="text-base relative left-10 flex-none font-bold ">Position: {item.volunteerPosition}</div>
                      <div className="text-base relative left-12 flex-none ">from {format(item.volunteerStartDate)} to {format(item.volunteerEndDate)}</div>
                    </div>
                    <div className="text-base relative left-10">{item.volunteerSummary}</div>
                  </div>
                </div>
            </div>))}

            <div className="flex p-10 ">
                <div className="flex-none text-3xl w-8 ">
                  <img src="https://i.ibb.co/7bTWXSh/award.png" className="relative top-1 right-2"  alt="Flowbite Logo" />
                </div>
                <div className="flex-none text-3xl font-bold text-cyan-700">
                  Awards
                </div>
            </div>
            <div className="text-white text-sm">
                <div className="grid grid-cols-2 relative left-24 -top-4 gap-y-10">
                  {awards.map((item, index) => (
                  <div key={item.id} className="flex-none w-64 rounded-sm text-center ">
                    <button className="text-slate-300 hover:text-slate-600 font-bold" onClick={()=>deleteAward(item.id)}>Delete</button>
                    <div className="flex flex-col border-2 border-gray-700 rounded ">
                      <div className=" bg-slate-600 text-sm font-bold ">{item.title}</div>
                      <div className="  text-sm text-gray-700 text-left relative left-2">{format(item.date)}</div> 
                      <div className="  font-bold text-gray-700 text-left relative left-2">Awarder: {item.awarder}</div> 
                      <div className="  text-sm text-gray-700 text-left relative left-2">{item.awardSummary}</div> 
                    </div>
                  </div>))}
                  
                </div>
            </div>
            <div className="flex p-10 ">
                <div className="flex-none text-3xl w-8 ">
                  <img src="https://i.ibb.co/TRhKScJ/certificate.png" className="relative top-1 right-2"  alt="Flowbite Logo" />
                </div>
                <div className="flex-none text-3xl font-bold text-cyan-700">
                  Certificates
                </div>
            </div>
            <div className="text-white text-sm">
                <div className="grid grid-cols-2 relative left-24 -top-4 gap-y-10">
                {certificates.map((item, index) => (
                  
                  <div key={item.id} className="flex-none w-64 rounded-sm text-center ">
                    <button className="text-slate-300 hover:text-slate-600 font-bold" onClick={()=>deleteCertificate(item.id)}>Delete</button>
                    <div className="flex flex-col border-2 border-gray-700 rounded ">
                      <div className=" bg-slate-600 text-sm font-bold ">{item.certificateName}</div>
                      <div className="  text-sm text-gray-700">{format(item.certificateDate)}</div> 
                      <div className="  font-bold text-gray-700 ">Issuer: {item.certificateIssuer}</div> 
                      <div className="flex-none text-cyan-500 ">
                          <a href={item.certificateUrl} className="text-sm  overflow-x-hidden">{item.certificateUrl}</a>
                      </div>
                    </div>
                  </div>))}
                  
                </div>
            </div>
            
          </div>
          
          <div className=" w-72 relative left-8 rounded-xl bg-white">
            <div className="grid grid-rows-2 gap-y-16 ">
              <div className="grid grid-rows-3  text-center relative top-4 ">
                  <div className="bg-gray-700 text-white h-32 w-32 rounded-full place-content-center relative left-20 ">
                    <img src={basics?.picture??"https://i.postimg.cc/BnLYs5TL/panda.png"}></img>
                    Avatar</div>
                  <div className="text-xl  text-black relative top-5">
                    <div className="text-3xl font-bold text-black ">{basics?.name?? 'N/A'}</div> 
                    <div className="text-2xl text-slate-500 font-thin ">{basics?.degree??'N/A'}</div>
                  </div> 
                  <div className="text text-black relative -top-4 ">
                    <div className="text mt-2 ">{basics?.email ??'N/A'}</div>
                    <div className="text text-slate-700 mt-2 ">{basics?.phone ??'N/A'}</div>
                    <div className="text text-slate-700 mt-2 ">{location?.address??'N/A'},{location?.city ??'N/A'}</div>
                    <button className="text text-gray-800 mt-4 relative top-8 w-28 h-8 rounded-xl hover:opacity-75 text-center border-emerald-600 border-2" onClick={adjustInfor}>Edit profile</button>
                  </div>
                  <div>
                    <button className="text text-white mt-4 relative top-8 bg-emerald-500 w-28 h-8 rounded-xl hover:opacity-75 " onClick={handleLogout}>Log out</button>
                  </div> 
              </div>
              <div className="flex flex-col ">
                <div className="text-black border-t-8 border-slate-600 p-4 ">
                  <div className="bg-slate-300 rounded-xl ">
                    <div className="p-2 break">
                      <div className="text-xl font-bold flex">
                        <div>
                          <img src="https://i.ibb.co/Rc3TMK1/heart.png" className="w-8 "></img>
                        </div>
                        <div className="relative left-2">Interests</div>
                      </div>
                      <div className="text-base w-4/5 relative left-10 break-all">{interests?.interest ?? 'N/A'}</div>
                    </div>
                  </div> 
                </div>
                <div className="text-black p-4 ">
                  <div className="bg-slate-300 rounded-xl ">
                    <div className="p-2 break">
                      <div className="text-xl font-bold flex">
                        <div>
                          <img src="https://i.ibb.co/gRPFRGL/skills.png" className="w-8 "></img>
                        </div>
                        <div className="relative left-2">Skills</div>
                      </div>
                      <div className="text-base w-4/5 relative left-10 break-all">{skills?.skill??'N/A'}</div>
                    </div>
                  </div> 
                </div>
                <div className="text-black p-4 ">
                  <div className="bg-slate-300 rounded-xl ">
                    <div className="p-2 break">
                      <div className="text-xl font-bold flex">
                        <div>
                          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-language"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 5h7" /><path d="M9 3v2c0 4.418 -2.239 8 -5 8" /><path d="M5 9c0 2.144 2.952 3.908 6.7 4" /><path d="M12 20l4 -9l4 9" /><path d="M19.1 18h-6.2" /></svg>
                        </div>
                      <div className="relative left-2">Languages</div>
                      </div>
                      <div className="text-base w-4/5 relative left-10 break-all">{languages?.language??'N/A'}</div>
                    </div>
                  </div> 
                </div>
                <div className="text-black p-4 ">
                  <div className="bg-slate-300 rounded-xl ">
                    <div className="p-2 break">
                      <div className="text-xl font-bold flex">
                        <div>
                          <img src="https://i.postimg.cc/GtVvn2vG/url.png" className="h-6 w-6"></img>
                        </div>
                      <div className="relative left-2">Profile url</div>
                      </div>
                      <div className="overflow-hidden text-cyan-700">
                        <a href={profile?.url??''} className="text-base w-4/5 relative left-10 ">{profile?.url??'N/A'}</a>
                      </div>
                    </div>
                  </div> 
                </div>
              </div>
            </div> 
          </div>

         
        
        </div>
    </div>
  );
}

export default Account_infor;
