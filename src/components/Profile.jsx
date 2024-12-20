import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import user from '../assets/user.png'
import SERVER_BASE_URL from '../services/serverURL';
import { updateUserAPI } from '../services/allAPI';
const Profile = () => {
  const [open, setOpen] = useState(false);
  const [preview,setPreview] = useState("")

  const [existingProfilePic,setExisitingProfilePic] = useState("")
    // profilePic key of userDeatils is used to store uploaded user profile pic file
  const[userDetailes , setUserDetailes]= useState({
    username:"", email:"", password:"", github:"", linkedin:"", profilePic:"" 
  })
  console.log(userDetailes);
   
    //get exisiting user details from session and store it to userDetails state
    useEffect(()=>{
      if(sessionStorage.getItem("user")){
        const user = JSON.parse(sessionStorage.getItem("user"))
        setUserDetailes({...userDetailes, username:user.username, email:user.email , password:user.password,github:user.github,linkedin:user.linkedin
          
        })
        setExisitingProfilePic(user.profilePic)
      }
    },[open])

// generate url for upload profile pic
useEffect(()=>{
if(userDetailes.profilePic){
  setPreview(URL.createObjectURL(userDetailes.profilePic))
}else{
  setPreview("")
}
},[userDetailes.profilePic])

const handleUserUpdate = async ()=>{
  // 1. get all user details
  const {username,email,password,github,linkedin,profilePic} = userDetailes
  // if text filed have value
  if(github && linkedin){
    // req body
    const reqBody = new FormData()
    reqBody.append("username",username)
    reqBody.append("email",email)
    reqBody.append("password",password)
    reqBody.append("github",github)
    reqBody.append("linkedin",linkedin)
    preview ? reqBody.append("profilePic",profilePic) :reqBody.append("profilePic",existingProfilePic)
    //reqheader
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      // make api call
      try{
        const result = await updateUserAPI(reqBody,reqHeader)
        if(result.status==200){
          // alert
          alert("User profile updated successfullyy!!!")
          // store update user in session
          sessionStorage.setItem("user",JSON.stringify(result.data))
          // collapse profile
          setOpen(!open)
        }
      }catch(err){
        console.log(err);          
      }
    }
  }else{
    alert("Please fill the form completetly!!!!")
  }
}
  return (
    <>
    <div className="d-flex justify-content-evently">
      <h3 className="text-warning">Profile</h3>
      <button onClick={()=>setOpen(!open)} className='btn text-warning'><i className="fa-solid fa-chevron-down"></i></button>
    </div>
    <Collapse in={open}>
        <div className='row container-fluid alogn-items-center justify-content-center shadow p-4 rounded'
        id="example-collapse-text">
          {/* upload pic */}
          <label className='text-center'>
            <input  onChange={e=>setUserDetailes({...userDetailes,profilePic:e.target.files[0]})} style={{display:'none'}} type="file" />
            {
              existingProfilePic==""?
              <img width={'200px'} height={'200px'}  className='rounded-circle ' src={preview?preview:user} alt="" />
              :
              <img width={'200px'} height={'200px'}  className='rounded-circle' src={preview?preview:`${SERVER_BASE_URL}/uploads/${existingProfilePic}`} alt="" />
            }
          </label>
        <div className='mb-2 w-100'>
           <input value={userDetailes.github}  onChange={e=>setUserDetailes({...userDetailes,github:e.target.value})} type="text" placeholder='User GITHUB Link' className='form-control' />
           </div>
           <div className='mb-2 w-100'>
           <input value={userDetailes.linkedin}  onChange={e=>setUserDetailes({...userDetailes,linkedin:e.target.value})}  type="text" placeholder='User LINKEDIN Link' className='form-control' />
           </div>
           <div className='d-grid w-100'>
            <button onClick={handleUserUpdate} className='btn btn-warning'>Update</button>
           </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile