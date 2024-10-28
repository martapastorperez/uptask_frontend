import api from "@/lib/axios"
import { Project, Task, TaskFormData, TaskSchema } from "../types"
import { isAxiosError } from "axios"

type taskAPIType={
    projectId:Project['_id'],
    formData:TaskFormData,
    taskId:Task['_id']
    status: Task['status']
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
        const response =TaskSchema.safeParse(data)
       if(response.success) {
        return response.data
    }  else {
        console.error("Validation failed:", response.error);
        throw new Error("La validación de los datos del proyecto falló");
    }
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
        const {data}=await api.delete<string>(`/projects/${projectId}/task/${taskId}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error (error.response.data.error)
        }
    }
    
}

export async function updateStatus({projectId, taskId, status}:Pick<taskAPIType, 'projectId'|'taskId'|'status'>){
    try {
        const {data} =await api.post<string>(`/projects/${projectId}/task/${taskId}/status`, {status})
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error (error.response.data.error)
        }
    }
}