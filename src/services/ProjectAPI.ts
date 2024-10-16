import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ProjectFormData, dashboaardProjectSchema } from "../types";


export async function getProjects() {
    try {
        const {data}= await api.get('/projects') 
        const response=dashboaardProjectSchema.safeParse(data)
        if(response.success){
             return response.data
        }
       
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}

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