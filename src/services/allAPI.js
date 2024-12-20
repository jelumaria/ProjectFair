import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverURL";

// registerAPI

export const registerAPI= async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/register`,reqBody)
}
// login
export const loginAPI= async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/login`,reqBody)
}

//add-project
export const addProjectAPI= async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/add-project`,reqBody,reqHeader)
}

// home projects
export const homeProjectAPI= async()=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/home-projects`,{})
}


// user projects
export const userProjectAPI= async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/user-projects`,{},reqHeader)
}

// all projects
export const allProjectAPI= async(reqHeader,searchKey)=>{
    // query parameter of url  ?search=${searchkey} & query stored in search
    return await commonAPI("GET",`${SERVER_BASE_URL}/all-projects?search=${searchKey}`,{},reqHeader)
}

//projects/6759177ddf1d9c4e0dfb9679/edit
export const updateprojectAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_BASE_URL}/projects/${id}/edit`,reqBody,reqHeader)
}

//projects/:id/remove
export const deleteProjectAPI = async (id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_BASE_URL}/projects/${id}/remove`,{},reqHeader)
 }

//user/edit
export const updateUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_BASE_URL}/user/edit`,reqBody,reqHeader)
 }