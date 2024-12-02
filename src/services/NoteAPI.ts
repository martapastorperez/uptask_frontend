import api from "@/lib/axios"
import { Note, NoteFormData, Project, Task } from "../types"
import { isAxiosError } from "axios"


type noteAPIType={
    projectId:Project['_id'],
    formData:NoteFormData,
    taskId:Task['_id'],
    noteId:Note['_id']
}

export async function createNote({projectId, taskId, formData}:Pick<noteAPIType, 'projectId'|'taskId'|'formData'>) {
    try {
        const {data}= await api.post(`/projects/${projectId}/task/${taskId}/notes`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}

export async function deleteNote({projectId, taskId, noteId}:Pick<noteAPIType, 'projectId'|'taskId'|'noteId'>) {
    try {
        const {data}= await api.delete(`/projects/${projectId}/task/${taskId}/notes/${noteId}`)
        return data
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}