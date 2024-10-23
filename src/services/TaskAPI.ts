import api from "@/lib/axios"
import { Project, Task, TaskFormData } from "../types"
import { isAxiosError } from "axios"

type taskAPIType={
    projectId:Project['_id'],
    formData:TaskFormData,
    taskId:Task['_id']
}

export async function createTask({projectId, formData}:Pick<taskAPIType,'formData'|'projectId'>) {
    try {
        const {data}= await api.post<string>(`/projects/${projectId}/task`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}

export async function getTaskById({projectId,taskId}:Pick<taskAPIType, 'projectId'|'taskId'>) {
    try {
        const {data}= await api.get(`/projects/${projectId}/task/${taskId}`) 
       return data
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}


export async function updateTask({projectId, taskId,formData}:Pick<taskAPIType, 'projectId'|'taskId'|'formData'>){
    try {
        const {data}= await api.put<string>(`/projects/${projectId}/task/${taskId}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error (error.response.data.error)
        }
    }
}


export async function deleteTask({projectId, taskId}:Pick<taskAPIType, 'projectId'|'taskId'>) {
    try {
        const {data}=await api.delete<string>(`projects/${projectId}/task/${taskId}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error (error.response.data.error)
        }
    }
    
}