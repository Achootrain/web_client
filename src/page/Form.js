import {useState,useEffect, useCallback} from 'react';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';

 // Adjust the path as per your actual folder structure
function Form(){ 
//image uploader
const navigator = useNavigate();
const [uid,setID] = useState();
//check if user is logged in

//get id of user
useEffect(() => {
  axios.post(`${process.env.REACT_APP_SERVER}/valid_token`, {},{
    headers: {token: sessionStorage.getItem("token")}
  }).then((response) => {
    if(response.data.error){
      navigator('/page/Login');
    }
    else{
      setID(response.data.id);
    }
  })},[]);
  const id=uid;
//image uploader
  const IMGUR_CLIENT_ID = '2d74f1cca3ad0ba'; // Replace with your Imgur client ID
  const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const [loading, setLoading] = useState(false);
const [imageUrl, setImageUrl] = useState();
const handleChange = async(info) => {
  if (info.file.status === 'uploading') {
    setLoading(true);
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    const file=info.file.originFileObj;
    let formField = new FormData();
    formField.append('image', file);  // Append the file with the key 'file'
    // Log FormData entries for debugging
    const response = await axios.post('https://api.imgur.com/3/image', formField, {
      headers: {
        'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
        'Content-Type': 'multipart/form-data' // Set Content-Type manually
        // Include FormData headers
      }
    });

      setPicture(response.data.data.link);
      console.log(response.data.data.link);
      getBase64(info.file.originFileObj, (url) => {//fetch from database
      setLoading(false);
      setImageUrl(response.data.data.link);
     
    });
  }
};


const uploadButton = (
  <button
    style={{
      border: 0,
      background: 'none',
    }}
    type="button"
  >
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </button>
);

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};
//others 


const [basics, setBasics] = useState({});
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [degree, setDegree] = useState('');

  //Location within Basics
const [location, setLocation] = useState({});
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [countryCode, setCountryCode] = useState('');

  // Profiles within Basics
  const [profiles, setProfiles] = useState('');
    const [network,setnetwork] = useState('');
    const [url,setUrl] = useState('');

// Work
const [work, setWork] = useState([]);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [EmployeeWebsite, setEmployeeWebsite] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [workSummary, setWorkSummary] = useState('');

  const addWork = useCallback(() => {
    if (company.trim() !== '' && position.trim() !== '') {
      let newWork = {};
      newWork.company = company;
      newWork.position = position;
      newWork.EmployeeWebsite = EmployeeWebsite;
      newWork.startDate = startDate;
      newWork.endDate = endDate;
      newWork.workSummary = workSummary;
      setWork([...work, newWork]);
      setCompany('');
      setPosition('');
      setEmployeeWebsite('');
      setStartDate('');
      setEndDate('');
      setWorkSummary('');
    }
  }, [company, position, EmployeeWebsite, startDate, endDate, workSummary, work]);
  

const deleteWork = useCallback(() => {
setWork(prework=>prework.slice(0, -1));
},[]);

// Volunteer
const [volunteer, setVolunteer] = useState([]);
  const [organization, setOrganization] = useState('');
  const [volunteerPosition, setVolunteerPosition] = useState('');
  const [volunteerWebsite, setVolunteerWebsite] = useState('');
  const [volunteerStartDate, setVolunteerStartDate] = useState('');
  const [volunteerEndDate, setVolunteerEndDate] = useState('');
  const [volunteerSummary, setVolunteerSummary] = useState('');


  const addVolunteer = useCallback(() => {
    let newVol = {};
    if(organization.trim() !== ''&&volunteerPosition.trim() !== '') {
    newVol.organization = organization;
    newVol.volunteerPosition = volunteerPosition;
    newVol.volunteerWebsite = volunteerWebsite;
    newVol.volunteerStartDate = volunteerStartDate;
    newVol.volunteerEndDate = volunteerEndDate;
    newVol.volunteerSummary = volunteerSummary;
    setVolunteer((prevVolunteer) => [...prevVolunteer, newVol]);
    setOrganization('');
    setVolunteerPosition('');
    setVolunteerWebsite('');
    setVolunteerStartDate('');
    setVolunteerEndDate('');
    setVolunteerSummary('');}
  }, [organization, volunteerPosition, volunteerWebsite, volunteerStartDate, volunteerEndDate, volunteerSummary]);

  const deleteVolunteer = useCallback(() => {
    setVolunteer(prevVolunteer => prevVolunteer.slice(0, -1));
  }, []);


// Education
const [education, setEducation] = useState([]);
  const [institution, setInstitution] = useState('');
  const [area, setArea] = useState('');
  const [studyType, setStudyType] = useState('');
  const [educationStartDate, setEducationStartDate] = useState('');
  const [educationEndDate, setEducationEndDate] = useState('');
  const [gpa, setGpa] = useState('');

const addEducation = useCallback(() => {
  if(institution.trim() !== '' && area.trim()!==''){
  let newEdu ={
    institution:institution,
    area:area,
    studyType:studyType,
    startDate: educationStartDate,
    endDate: educationEndDate,
    gpa:gpa
  };
  setEducation(prevEducation => [...prevEducation, newEdu])
  setInstitution('');
  setArea('');
  setStudyType('');
  setEducationStartDate('');
  setEducationEndDate('');
  setGpa('');
  ;}
})

const deleteEducation = useCallback(() => {
  setEducation(prevEdu => prevEdu.slice(0, -1));
},[])
// Awards
const [awards, setAwards] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [awarder, setAwarder] = useState('');
  const [awardSummary, setAwardSummary] = useState('');

const addAward= useCallback(()=>{
  if(title.trim() !== '' && awarder.trim() !== ''){
    let newAward = {};
    newAward.title = title;
    newAward.date = date;
    newAward.awarder = awarder;
    newAward.awardSummary = awardSummary;
    setAwards(preAward=>[...preAward,newAward]);
    setTitle('');
    setDate('');
    setAwarder('');
    setAwardSummary('');

  }
},[title, date, awarder, awardSummary]);

const deleteAward = useCallback(() => {
  setAwards(preAward => preAward.slice(0, -1));
},[])
//Projects
const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectEndDate, setProjectEndDate] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');

const addProject = useCallback(() => {
if(projectName.trim() !== '' ){
  let newProject = {};
  newProject.projectName = projectName;
  newProject.projectStartDate = projectStartDate;
  newProject.projectEndDate = projectEndDate;
  newProject.projectDescription = projectDescription;
  newProject.projectUrl = projectUrl;
  setProjects(prevProject => [...prevProject, newProject]);
  setProjectName('');
  setProjectStartDate('');
  setProjectEndDate('');
  setProjectDescription('');
  setProjectUrl('');}

},[projectName, projectStartDate, projectEndDate, projectDescription, projectUrl]);

const deleteProject = useCallback(() => {
  setProjects(deletePro => deletePro.slice(0, -1));
},[]);

// Publications
const [publications, setPublications] = useState([]);
  const [publicationName, setPublicationName] = useState('');
  const [publisher, setPublisher] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [publishedWebsite, setPublishedWebsite] = useState('');
  const [publicationSummary, setPublicationSummary] = useState('');

const addPublication = useCallback(() => {
  if(publicationName.trim()!=='' && publisher.trim() !== ''){
    let newPublication = {};
    newPublication.publicationName = publicationName;
    newPublication.publisher = publisher;
    newPublication.releaseDate = releaseDate;
    newPublication.publishedWebsite = publishedWebsite;
    newPublication.publicationSummary = publicationSummary;
    setPublications(prevPublication => [...prevPublication, newPublication]);
    setPublicationName('');
    setPublisher('');
    setReleaseDate('');
    setPublishedWebsite('');
    setPublicationSummary('');
  }

},[publicationName, publisher, releaseDate, publishedWebsite, publicationSummary]);
const deletePublication = useCallback(() => {
setPublications(deletePub => deletePub.slice(0, -1));
},[]);
//Certificates
const [certificates, setCertificates] = useState([]);
  const [certificateName, setCertificateName] = useState('');
  const [certificateDate, setCertificateDate] = useState('');
  const [certificateIssuer, setCertificateIssuer] = useState('');
  const [certificateUrl, setCertificateUrl] = useState('');
const addCertificate = useCallback(() => {
  if(certificateName.trim() !== '' && certificateIssuer.trim() !== ''){
    let newCertificate = {};
    newCertificate.certificateName = certificateName;
    newCertificate.certificateDate = certificateDate;
    newCertificate.certificateIssuer = certificateIssuer;
    newCertificate.certificateUrl = certificateUrl;
    setCertificates(prevCertificate => [...prevCertificate, newCertificate]);
    setCertificateName('');
    setCertificateDate('');
    setCertificateIssuer('');
    setCertificateUrl('');
  }
},[certificateName, certificateDate, certificateIssuer, certificateUrl]);

const deleteCertificate = useCallback(() => {
  setCertificates(deleteCert => deleteCert.slice(0, -1));
},[]);

// Skills
const [skills, setSkills] = useState('');
  
// Languages
const [language,setLanguage] = useState('');


// Interests
const [interests, setInterests] = useState('');
//Sumbit data
const submitData = async () => {
  const awards_= awards.map((item) => {
    return { ...item, user_id: id };
  });
  const works_ = work.map((item) => {
    return { ...item, user_id: id };
  });
  const volunteers_ = volunteer.map((item) => {
    return { ...item, user_id: id };
  });
  const educations_ = education.map((item) => {
    return { ...item, user_id: id };
  });
  const projects_ = projects.map((item) => {
    return { ...item, user_id: id };
  });
  const publications_ = publications.map((item) => {
    return { ...item, user_id: id };
  });
  const certificates_ = certificates.map((item) => {
    return { ...item, user_id: id };
  });
  const basics_ = {
    name: name,
    picture: picture,
    email: email,
    phone: phone,
    degree: degree,
    user_id:id,
  }

  const interests_ = {
    user_id:id,
    interest: interests,
  }
  const languages_ = {
    user_id:id,
    language: language,
  }
  const skills_ = {
    user_id:id,
    skill: skills,
  }
  const profiles_ = {
    user_id:id,
    network: network,
    url: url,
  }
  const locations_ = {
    user_id:id,
    address: address,
    postal_code: postalCode,
    city: city,
    country_code: countryCode,
  }
  const resumeData = {awards_, works_, volunteers_, educations_, projects_, publications_, certificates_, basics_, interests_, languages_, skills_, profiles_, locations_};
  await axios.post(`${process.env.REACT_APP_SERVER}/data`, resumeData, {  headers: {token: sessionStorage.getItem("token")}
  }, )
  console.log(resumeData);
  ;
  alert("Data sent");
  navigator('/page/Account_infor');
};

return (
// static html content
<div className="min-h-screen bg-gray-200 ">
  <div className="bg-gray-700 h-24 border-b-2 border-white p-2 text-white">
    <div className="text-3xl">REFERENCES</div>
    <div className="font-thin">Update your account information</div>
  </div>
  <div className="text-xl h-20 border-b-2 w-1/3 border-slate-400 ">
    <div className="relative top-11 left-3">
    Basic Info
    </div>
  </div>
  
  <div className="grid grid-cols-4 grid-rows-4 gap-8 p-10 bg-slate-300 border rounded-2xl relative top-5">
    <div className="col-span-2 row-span-2">
      <div>Profile Picture</div>
      <Flex gap="middle" wrap>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        maxCount={1}
        beforeUpload={beforeUpload}
        customRequest={dummyRequest}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </Flex>
    </div>
    <div className="row-start-3">
      <div>Name</div>
      <input className="font-sans outline-none rounded"
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder=" Your first and last name"
      >
      </input>
    </div>
    <div className="row-start-3 col-start-2">
      <div>Email</div>
      <input className="font-sans outline-none rounded"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder=" Email"
      >
      </input>
    </div>
      
    <div className="row-start-4">
      <div>Phone</div>
      <input className="font-sans outline-none rounded "
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder=" Phone"
      >
      </input>
    </div>
          
    <div className="row-start-4">
      <div>Degree</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
        placeholder=" Degree"
      >
      </input>
    </div>
  

    <div className="col-span-2 col-start-3 col-end-4 ">
      <div>URL</div>
      <input className="font-sans outline-none rounded w-96"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder=" URL to your profile page">
      </input>
    </div>

    <div className="row-start-2 col-start-3 ">
      <div>Network</div>
      <input className="font-sans outline-none rounded w-96"
        type="text"
        value={network}
        onChange={(e) => setnetwork(e.target.value)}
        placeholder=" Social media or other profile">
      </input>
    </div>  
   
    <div className="row-start-3">
      <div>Address</div>
      <input className="font-sans outline-none rounded w-64"
        type=" text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder=" Address">
      </input>
    </div>

    <div className="row-start-4">
      <div>Postal Code</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder=" Postal Code"
      >
      </input>
    </div>

    <div className="row-start-3">
      <div>City</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder=" City"
      >
      </input>
    </div>

    <div className="row-start-4">
      <div>Country Code</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
        placeholder=" Your Country Code"
      >
      </input>
    </div>
  </div>
  <div className="text-xl h-20 border-b-2 w-1/3 border-slate-400 ">
    <div className="relative top-11 left-3">
    Work
    </div>
  </div>

  <div className="grid grid-cols-4 grid-rows-3 gap-2 p-10 bg-slate-300 border rounded-2xl relative top-5">
    <div>
      <div>Company</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder=" Company"
      >
      </input>
    </div>
    <div>
      <div>Position</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder=" Position"
      >
      </input>
    </div>

    <div className="row-start-2">
      <div>Start Date</div>
      <input className="font-sans outline-none rounded"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder=" Start Date"
      >
      </input>
    </div>

    <div className="row-start-2">
      <div>End Date</div>
      <input className="font-sans outline-none rounded"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder=" End Date"
      >
      </input>
    </div>
    <div className="row-start-3">
      <div>Employee Website</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={EmployeeWebsite}
        onChange={(e) => setEmployeeWebsite(e.target.value)}
        placeholder=" Employee Website"
      >
      </input>
    </div>
    <div className="row-start-3">
      <div>Work Summary</div>
      <input className="font-sans outline-none rounded w-60 h-20"
        value={workSummary}
        onChange={(e) => setWorkSummary(e.target.value)}
        placeholder=" Work Summary"
      >
      </input>
    </div>
    <div className="row-start-1 col-start-3 col-span-1 ">
      <div className="grid grid-cols-2 gap-0">
      <button className="h-10 relative top-2 left-1 bg-gradient-to-b from-emerald-600 to-green-400 rounded text-gray-200 w-10 hover:opacity-50 focus:outline-none focus:ring focus:ring-white"
      onClick={addWork}  
      > 
      ✔</button>
      <button className="h-10 relative -left-24 top-2 bg-gradient-to-b from-rose-600 to-red-400 rounded text-gray-200 w-10 hover:opacity-50 focus:outline-none focus:ring focus:ring-white"
      onClick={deleteWork}> 
      ✖</button>
      </div>
    </div>
    <div className="row-start-1 row-span-3 col-span-2 col-start-3 ">
      <div>{work.map((item, index) => (<div className="grid grid-rows-3 bg-gradient-to-b from-slate-800 to-gray-700 mb-4 relative top-16 rounded text-white">
        <div className="text-xl font-serif font-bold relative left-2">{item.company}</div>
        <div className="relative left-2 font-thin">{item.position}</div>
        <div className="relative left-2 font-mono">From {item.startDate} to {item.endDate}</div>
        </div>))}
      </div>
    </div>
  </div>


  <div className="text-xl h-20 border-b-2 w-1/3 border-slate-400 ">
    <div className="relative top-11 left-3">
    Volunteeer
    </div>
  </div>

  <div className="grid grid-rows-5 grid-cols-3 p-10 gap-y-7 bg-slate-300 rounded-2xl relative top-5">  
      <div>
        <div>Organization</div>
        <input className="font-sans outline-none rounded"
          type="text"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder=" Organization"
        >
        </input>
      </div>

      <div>
        <div>Volunteer Position</div>
        <input className="font-sans outline-none rounded"
          type="text"
          value={volunteerPosition}
          onChange={(e) => setVolunteerPosition(e.target.value)}
          placeholder=" Volunteer Position"
        >
        </input>
      </div>

      <div>
        <div>Website</div>
        <input className="font-sans outline-none rounded w-96"
          type="text"
          value={volunteerWebsite}
          onChange={(e) => setVolunteerWebsite(e.target.value)}
          placeholder=" The URL for the employer's website"
        >
        </input>
      </div>

      <div>
        <div>Start Date</div>
        <input className="font-sans outline-none rounded"
          type="date"
          value={volunteerStartDate}
          onChange={(e) => setVolunteerStartDate(e.target.value)}
          placeholder="Start Date"
        >
        </input>
      </div>

      <div>
        <div>End Date</div>
        <input className="font-sans outline-none rounded"
          type="date"
          value={volunteerEndDate}
          onChange={(e) => setVolunteerEndDate(e.target.value)}
          placeholder="End Date"
        >
        </input>
      </div>

      <div>
        <div>Volunteer Summary</div>
        <input className="font-sans outline-none rounded w-96 "
          value={volunteerSummary}
          onChange={(e) => setVolunteerSummary(e.target.value)}
          placeholder=" A one-sentence to one-paragraph summary"
        >
        </input>
      </div>
    
    <div className="row-span-2 row-start-3 col-span-3 col-start-1 bg-white h-36 rounded-xl">
    <div>{volunteer.map((item, index) => (<div key={index}>+ {item.organization} - {item.volunteerPosition} from {item.volunteerStartDate} to {item.volunteerEndDate}</div>))}</div>
    </div>
    <div className="row-start-5 col-start-1 rounded w-60 relative -top-6 "> 
      <div className="grid grid-cols-2 text-white gap-2">
        <button className="bg-gradient-to-b from-violet-600 to-blue-500 rounded hover:opacity-50 focus:outline-none focus:ring focus:ring-white"
        onClick={addVolunteer}
        >Add</button>
        <button className="bg-gradient-to-b from-red-500 to-yellow-400 rounded focus:outline-none focus:ring focus:ring-white"
        onClick={deleteVolunteer}
        >Delete</button>
      </div>
    
    
    </div> 

  </div>
  <div className="text-xl h-20 border-b-2 w-1/3 border-slate-400">
    <div className="relative top-11 left-3">
    Education
    </div>
  </div>

  <div className="grid grid-cols-4 grid-rows-3 gap-2 h-96 p-10 bg-slate-300 border rounded-2xl relative top-5">
    <div>
      <div>Institution</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        placeholder=" Institution"
      >
      </input>
    </div>
    <div>
      <div>Study Type</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={studyType}
        onChange={(e) => setStudyType(e.target.value)}
        placeholder=" Study Type"
      >
      </input>
    </div>

    <div className="row-start-2">
      <div>Area</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        placeholder=" Area"
      >
      </input>
    </div>

    <div className="row-start-2">
      <div>GPA</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={gpa}
        onChange={(e) => setGpa(e.target.value)}
        placeholder=" GPA"
      >
      </input>
    </div>

    <div className="row-start-3">
      <div>Education Start Date</div>
      <input className="font-sans outline-none"
        type="date"
        value={educationStartDate}
        onChange={(e) => setEducationStartDate(e.target.value)}
      >
      </input>
    </div>

    <div className="row-start-3">
      <div>Education End Date</div>
      <input className="font-sans outline-none"
        type="date"
        value={educationEndDate}
        onChange={(e) => setEducationEndDate(e.target.value)}
        placeholder=" Education End Date"
      >
      </input>
    </div>
    <div className="row-start-1 col-start-3 col-span-1 ">
      <div className="grid grid-cols-2 gap-0">
      <button className="h-10 relative top-2 left-1 bg-gradient-to-b from-emerald-600 to-green-400 rounded text-gray-200 w-10 hover:opacity-50 focus:outline-none focus:ring focus:ring-white"
      onClick={addEducation}  
      > 
      ✔</button>
      <button className="h-10 relative -left-24 top-2 bg-gradient-to-b from-rose-600 to-red-400 rounded text-gray-200 w-10 hover:opacity-50 focus:outline-none focus:ring focus:ring-white"
      onClick={deleteEducation}> 
      ✖</button>
      </div>
    </div>
    <div className="row-start-1 row-span-3 col-span-2 col-start-3 ">
      <div>{education.map((item, index) => (<div className="grid grid-rows-3 bg-gradient-to-b from-slate-800 to-gray-700 mb-4 relative top-16 rounded text-white">
        <div className="text-xl font-serif font-bold relative left-2">{item.institution}</div>
        <div className="relative left-2 font-thin">{item.area}</div>
        <div className="relative left-2 font-mono">From {item.startDate} to {item.endDate}</div>
        </div>))}
      </div>
    </div>
  </div>

  <div className="text-xl h-20 border-b-2 w-1/3 border-slate-400">
    <div className="relative top-11 left-3">
    Projects
    </div>
  </div>

  <div className="grid grid-cols-2 grid-rows-6 gap-y-5 p-10 bg-slate-300 border rounded-2xl relative top-5">   
    <div className="row-start-1">
      <div>Project's Name</div>
      <input className="font-sans outline-none rounded w-60"
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder=" Your project name"
      >
      </input>
    </div>
     
    <div className="row-start-2">
      <div>Start Date</div>
      <input className="font-sans outline-none rounded"
        type="date"
        value={projectStartDate}
        onChange={(e) => setProjectStartDate(e.target.value)}
        placeholder=" Start date of your project"
      >
      </input>
    </div>

    <div className="row-start-3">
      <div>End Date</div>
      <input className="font-sans outline-none rounded "
        type="date"
        value={projectEndDate}
        onChange={(e) => setProjectEndDate(e.target.value)}
        placeholder=" Your project end date"
      >
      </input>
    </div>
    <div className="row-start-4">
      <div>Project's url</div>
      <input className="font-sans outline-none rounded w-96 "
        value={projectUrl}
        onChange={(e) => setProjectUrl(e.target.value)}
        placeholder=" Link to your project"
      >
      </input>
    </div>
    
    <div className="row-start-5">
      <div>Description</div>
      <textarea className="font-sans outline-none rounded w-96 "
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        placeholder=" An overview of your project"
      >
      </textarea>
    </div>

    <div className="row-start-6 relative top-2">
      <div className="grid grid-cols-2 gap-0 ">
      <button className="bg-gradient-to-b from-emerald-600 to-green-400 rounded text-gray-200 hover:opacity-50 focus:outline-none focus:ring focus:ring-white w-20"
      onClick={addProject}  
      > 
      Confirm</button>
      <button className="bg-gradient-to-b from-rose-600 to-red-400 rounded text-gray-200  hover:opacity-50 focus:outline-none focus:ring focus:ring-white w-20 relative -left-52"
      onClick={deleteProject}> 
      Delete</button>
      </div> 
    </div>

    <div className="row-span-4 col-start-2 text-black">
      <div>
        {projects.map((item, index) => (
          <div className="grid grid-rows-4 m-2 bg-white rounded " key={index}>
          <div className="text-2xl font-bold ml-2">{item.projectName} </div>
          <div className="ml-2 font-thin"> From {item.projectStartDate} to {item.projectEndDate}</div>
          <div className="ml-2 ">{item.projectDescription}</div>
          <div className="ml-2">{item.projectUrl}</div>
          </div>))}
      </div>
    </div>
  </div>
  
  
  <div className="text-xl h-20 border-b-2 w-1/3 border-slate-400 ">
    <div className="relative top-11 left-3">
    Awards
    </div>
  </div> 

  <div className="grid grid-cols-2 grid-rows-5 gap-y-5 p-10 bg-slate-300 border rounded-2xl relative top-5">   
    <div className="row-start-1">
      <div>Title</div>
      <input className="font-sans outline-none rounded w-60"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      >
      </input>
    </div>
     
    <div className="row-start-4">
      <div>Date</div>
      <input className="font-sans outline-none rounded"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder=" Received date"
      >
      </input>
    </div>

    <div className="row-start-2">
      <div>Awarder</div>
      <input className="font-sans outline-none rounded w-80"
        type="text"
        value={awarder}
        onChange={(e) => setAwarder(e.target.value)}
        placeholder=" Your award given by "
      >
      </input>
    </div>
    
    <div className="row-start-3">
      <div>Award Summary</div>
      <input className="font-sans outline-none rounded w-96 h-15"
        value={awardSummary}
        onChange={(e) => setAwardSummary(e.target.value)}
        placeholder=" A one-sentence to one-paragraph overview "
      >
      </input>
    </div>

    <div className="row-start-5 relative top-2">
      <div className="grid grid-cols-2 gap-0 ">
      <button className="bg-gradient-to-b from-emerald-600 to-green-400 rounded text-gray-200 hover:opacity-50 focus:outline-none focus:ring focus:ring-white w-20"
      onClick={addAward}  
      > 
      Confirm</button>
      <button className="bg-gradient-to-b from-rose-600 to-red-400 rounded text-gray-200  hover:opacity-50 focus:outline-none focus:ring focus:ring-white w-20 relative -left-52"
      onClick={deleteAward}> 
      Delete</button>
      </div> 
    </div>

    <div className="row-span-4 col-start-2 text-black">
      <div>
        {awards.map((item, index) => (
          <div className="grid grid-rows-3 m-2 bg-white rounded" key={index}>
          <div className="text-xl font-bold ml-2">{item.title} </div>
          <div className="font-normal ml-2">{item.awarder}</div>
          <div className="ml-2">{item.date}</div>
          </div>))}
      </div>
    </div>
  </div>
  



  <div className="text-xl h-20 border-b-2 w-1/3 border-slate-400">
    <div className="relative top-11 left-3">
    Publication
    </div>
  </div>
  
  <div className="grid grid-cols-2 grid-rows-6 p-10 bg-slate-300 border rounded-2xl relative top-5">   
    <div>
      <div>Publication Name</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={publicationName}
        onChange={(e) => setPublicationName(e.target.value)}
        placeholder=" Your publication title"
      >
      </input>
    </div>

    <div className="row-start-2">
      <div>Publisher</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
        placeholder=" Publisher name"
      >
      </input>
    </div>

    <div className="row-start-3">
      <div>Release Date</div>
      <input className="font-sans outline-none rounded"
        type="date"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
        placeholder=" Release Date"
      >
      </input>
    </div>

    <div className="row-start-4">
      <div>Published Website</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={publishedWebsite}
        onChange={(e) => setPublishedWebsite(e.target.value)}
        placeholder="Published Website"
      >
      </input>
    </div>

    <div className="row-start-5">
      <div>Publication Summary</div>
      <input className="font-sans outline-none rounded w-96 h-10"
        value={publicationSummary}
        onChange={(e) => setPublicationSummary(e.target.value)}
        placeholder=" A one-sentence to one-paragraph overview"
      >
      </input>
    </div>
    
    <div className="row-start-6 relative top-4">
      <div className="grid grid-cols-2 gap-0 ">
      <button className="bg-gradient-to-b from-emerald-600 to-green-400 rounded text-gray-200 hover:opacity-50 focus:outline-none focus:ring focus:ring-white w-20"
      onClick={addPublication}  
      > 
      Confirm</button>
      <button className="bg-gradient-to-b from-rose-600 to-red-400 rounded text-gray-200  hover:opacity-50 focus:outline-none focus:ring focus:ring-white w-20 relative -left-52"
      onClick={deletePublication}> 
      Delete</button>
      </div> 
    </div>
    <div className="row-span-6 col-start-2 ">
      <div>
        {publications.map((item, index) => (
          <div className="grid grid-rows-3 m-2 bg-white rounded" key={index}>
          <div className="text-xl font-bold ml-2">{item.publicationName} </div>
          <div className="font-normal ml-2">{item.publisher}</div>
          <div className="ml-2">{item.releaseDate}</div>
          </div>))}
      </div>
    
    </div>
  </div>

  <div className="text-xl h-20 border-b-2 w-1/3 border-slate-400 ">
    <div className="relative top-11 left-3">
    Certificates
    </div>
  </div>
  <div className="grid grid-cols-2 grid-rows-5 p-10 bg-slate-300 border rounded-2xl relative top-5 gap-y-4">   
    <div>
      <div>Name</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={certificateName}
        onChange={(e) => setCertificateName(e.target.value)}
        placeholder=" Your certificate name"
      >
      </input>
    </div>

    <div className="row-start-2">
      <div>Issuer</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={certificateIssuer}
        onChange={(e) => setCertificateIssuer(e.target.value)}
        placeholder=" Your certificate issuer"
      >
      </input>
    </div>

    <div className="row-start-3">
      <div>Date</div>
      <input className="font-sans outline-none rounded"
        type="date"
        value={certificateDate}
        onChange={(e) => setCertificateDate(e.target.value)}
        placeholder=" Certificate Date"
      >
      </input>
    </div>

    <div className="row-start-4">
      <div>Url</div>
      <input className="font-sans outline-none rounded"
        type="text"
        value={certificateUrl}
        onChange={(e) => setCertificateUrl(e.target.value)}
        placeholder=" Link to your certificate"
      >
      </input>
    </div>
    <div className="row-start-5 relative top-4">
      <div className="grid grid-cols-2 gap-0 ">
      <button className="bg-gradient-to-b from-emerald-600 to-green-400 rounded text-gray-200 hover:opacity-50 focus:outline-none focus:ring focus:ring-white w-20"
      onClick={addCertificate}  
      > 
      Confirm</button>
      <button className="bg-gradient-to-b from-rose-600 to-red-400 rounded text-gray-200  hover:opacity-50 focus:outline-none focus:ring focus:ring-white w-20 relative -left-52"
      onClick={deleteCertificate}> 
      Delete</button>
      </div> 
    </div>
    <div className="row-span-6 col-start-2 ">
      <div>
        {certificates.map((item, index) => (
          <div className="grid grid-rows-3 m-2 bg-white rounded" key={index}>
          <div className="text-xl font-bold ml-2">{item.certificateName} </div>
          <div className="font-normal ml-2">{item.certificateIssuer}</div>
          <div className="ml-2">{item.certificateDate}</div>

          </div>))}
      </div>
    
    </div>
  </div>

  <div className="text-xl h-20 border-b-2 w-1/3 border-slate-400 ">
    <div className="relative top-11 left-3">
    Others
    </div>
  </div>
  <div className="grid grid-rows-3 p-10">
    <div>
      <div>Skill Name</div>
      <textarea className="font-sans outline-none w-full rounded h-10"
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder=" Your skills..."
      >
      </textarea>
    </div>

    <div>
      <div>Language</div>
      <input className="font-sans outline-none rounded w-full h-10"
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        placeholder=" Language you can speak"
      >
      </input>
    </div>

    <div>
      <div>Interests</div>
      <textarea className="font-sans outline-none rounded w-full h-10"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        placeholder="Interests"
      >
      </textarea>
    </div>
  </div> 

  <div className="grid grid-cols-3">
    <div className="col-start-2">
    <button className="relative -top-4 bg-gradient-to-r from-green-600 to-emerald-400 text-white rounded h-10 w-96 hover:opacity-60 focus:outline-none focus:ring focus:ring-emerald-500
    "onClick={submitData}
    >Sumbit</button>
    </div>
  </div>
</div>
  );
}


export default Form;
