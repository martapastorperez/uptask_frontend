import api from "@/lib/axios"
import { Project, TaskFormData } from "../types"
import { isAxiosError } from "axios"

type taskAPIType={
    projectId:Project['_id'],
    formData:TaskFormData
}

export async function createTask({projectId, formData}:taskAPIType) {
    try {
        const {data}= await api.post<string>(`/projects/${projectId}/task`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}