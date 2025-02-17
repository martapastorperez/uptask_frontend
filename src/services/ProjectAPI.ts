import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Project, ProjectFormData, ProjectSchema, dashboaardProjectSchema, editProjectSchema } from "../types";




export async function createProject(formData:ProjectFormData) {
    try {
        const {data}= await api.post('/projects', formData)
        return data
        
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}


export async function getProjects() {
    try {
        const { data } = await api('/projects')
        const response = dashboaardProjectSchema.safeParse(data)
        if(response.success) {
            return response.data
        }  else {
            console.error("Validation failed:", response.error);
            throw new Error("La validación de los datos del proyecto falló");
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectsById(id:Project['_id']) {
    try {
        const {data}= await api.get(`/projects/${id}`) 
        const response=editProjectSchema.safeParse(data)
        if (response.success) {
            return response.data
            
        }
      
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}

export async function getFullProject(id:Project['_id']) {
    try {
        const {data}= await api.get(`/projects/${id}`) 
        const response=ProjectSchema.safeParse(data)
        if (response.success) {
            return response.data
            
        }
      
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}

type projectAPIType={
    projectId:Project['_id'],
    formData:ProjectFormData
}

export async function updateProject({formData,projectId}:projectAPIType) {
    try {
        const {data}= await api.put(`/projects/${projectId}`, formData) 
        return data
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}

export async function deleteProject(id:Project['_id']) {
    try {
        const {data}= await api.delete<string>(`/projects/${id}`) 
       return data
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}