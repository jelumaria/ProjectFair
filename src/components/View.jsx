import React, { useContext, useEffect, useState } from 'react'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { deleteProjectAPI, userProjectAPI } from '../services/allAPI'
import { addProjectContext, editProjectContext } from '../context/ContextShare'

const View = () => {
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectContext)
 const {addProjectResponse,setAddProjectResponse}= useContext(addProjectContext)
  //to display user projects
  //1. create state to store user projects
  const[userProjects,setUserProjects] = useState([])
 console.log(userProjects);

  //2. create a function for getting all user projects ans call api inside that function store all user projects inside the state
  //3. call that user project getting function using useeffect
useEffect(()=>{
  getuserProjects()
},[addProjectResponse,editProjectResponse])

  const getuserProjects = async()=>{
    const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader={
      "Authorization" : `Bearer ${token}`
    }
    try{
      const result = await userProjectAPI(reqHeader)
      console.log(result);
      if(result.status==200){
        setUserProjects(result.data)
      }
    }catch(err){
      console.log(err);
      
    }
  }
  }
 // 4. display the array in jsx


const removeProject = async(id)=>{
  const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader ={
        "Authorization" :`Bearer ${token}`
   }
 
  try{
    const result = await deleteProjectAPI(id,reqHeader)
    if(result.status==200){
      getuserProjects()
      
    }
  }catch(err){
    console.log(err);
    
  }
}
 }
  return (
    <>
<div className="d-flex justify-content-between mt-3">
  <h2 className="text-warning">All Projects</h2>
  <div><Add/></div>
</div>
<div className="mt-2">
 {
  userProjects?.length>0 ?
  userProjects?.map(project=>(
    <div key={project?._id} className="border rounded p-2 mb-3">
    <div className="d-flex justify-content-between align-items-center">
      <h3>{project?.title}</h3>
      <div className="d-flex align-items-center">
       <div> <Edit project={project} /></div>
        <button className="btn" aria-label="GitHub">
          <a href={project?.github} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>
        </button>
        <button onClick={()=>removeProject(project?._id)} className="btn" aria-label="Delete">
          <i className="fa-solid fa-trash text-danger"></i>
        </button>
      </div>
    </div>
  </div>
  ))
 :
 <div className="fw-bolder fs-3">You haven't uploaded any projects yet !! Add your projects</div>
 }
</div>

    </>
  )
}

export default View