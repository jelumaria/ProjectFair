import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import SERVER_BASE_URL from '../services/serverURL'
import { updateprojectAPI } from '../services/allAPI'
import { editProjectContext } from '../context/ContextShare'


const Edit = ({project}) => {
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectContext)
  //project key in the props will hold project data to be displayed in edit component
  const[preview,setPreview]  =useState("")
  const [ uploadFileStatus, setUploadFileStatus] = useState(false)
  const [projectDetails,setProjectDetails] = useState({
    id:project?._id,title:project?.title,language:project?.language, overview:project?.overview, github:project?.github, website:project?.website,projectImage:""
  })
  //project image is used to hold user uploded file instead of existing file
  console.log(projectDetails);
  
  useEffect(()=>{
    if(projectDetails.projectImage.type =="image/png" ||projectDetails.projectImage.type =="image/jpg"|| projectDetails.projectImage.type =="image/jpeg"){
      setUploadFileStatus(true)
     setPreview( URL.createObjectURL(projectDetails.projectImage))
    }
      else{
        //invaid image
    setUploadFileStatus(false)
    setProjectDetails({...projectDetails,projectImage:""})
      }
  },[projectDetails.projectImage])
  
  const [show, setShow] = useState(false);

  const handleClose = () =>{
    setShow(false);
    setProjectDetails({ id:project?._id,title:project?.title,language:project?.language, overview:project?.overview, github:project?.github, website:project?.website,projectImage:""

    })
  }
  const handleShow = () => 
  {
    setShow(true);
    setProjectDetails({ id:project?._id,title:project?.title,language:project?.language, overview:project?.overview, github:project?.github, website:project?.website,projectImage:""

    })
  }

//steps update project details
 // 1. create a function for defining update project logic 
 // 2, get all inputs from state and check all text inputs are empty or not 
 // 3. if its empty, then alert fill the form  
 // 4. if its not empty, then create formData to hold request body, get token & create request header, with request body & header make api call

  const handleUpdateProject = async()=>{
    const {id,title,language,overview,github,website,projectImage} = projectDetails
  if(title && language  && overview && github  && website ){
    const reqBody = new FormData()
    reqBody.append("title",title)
    reqBody.append("language",language)
    reqBody.append("overview",overview)
    reqBody.append("github",github)
    reqBody.append("website",website)
    //projectImage will have only value when user reupload project picture
   preview? reqBody.append("projectImage",projectImage): reqBody.append("projectImage",project?.projectImage)
const token = sessionStorage.getItem("token")
if(token){
  const reqHeader= {
    "Content-Type" : "multipart/form-data",
    "Authorization" :`Bearer ${token}`
   }
   //make api call
   try{
const result = await updateprojectAPI(id,reqBody,reqHeader)
if(result.status==200){
  alert("project updated sucessfully")
  handleClose()
  //share result with view
setEditProjectResponse(result)
}
   }catch(err){
console.log(err);

   }
}
   
  }else{
    alert("please fill the form completely")

  }
  }
  return (
    <>
    <button onClick={handleShow} className="btn "><i className="fa-solid fa-edit"></i></button>
    <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Detailes!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row align-items-center">
          <div className="col-lg-4">
            <label >
              <input onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} type="file" style={{display:"none"}} />
              <img className='img-fluid ' height={'200px'} src={preview?preview:`${SERVER_BASE_URL}/uploads/${project?.projectImage}`} alt="" />
            </label>
            {! uploadFileStatus &&
              <div className="text-warning fw-bolder">*Upload Only the Following file type (jpeg,jpg,png) here !!</div>
          }
          </div>
          <div className="col-lg-8">
             <div className="mb-2">
              <input value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} type="text" className='form-control' placeholder='Project Title' /> </div>
             <div className="mb-2">
              <input value={projectDetails.language}  onChange={e=>setProjectDetails({...projectDetails,language:e.target.value})} type="text" className='form-control' placeholder='Project languages' /></div>
             <div className="mb-2">
              <input value={projectDetails.overview}  onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} type="text" className='form-control' placeholder='Project Overview' /></div>
             <div className="mb-2">
              <input value={projectDetails.github}   onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})}type="text" className='form-control' placeholder='Project github Link' /></div>
             <div className="mb-2">
              <input value={projectDetails.website}  onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} type="text" className='form-control' placeholder='Project Website Link' /></div>

          
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit