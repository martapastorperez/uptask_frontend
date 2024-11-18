import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { Project, teamMemberForm } from "../types"


export async function findMemberByEmail({projectId,formData}:{ projectId:Project['_id'],formData:teamMemberForm}) {
    try {
        const {data}= await api.post(`/projects/${projectId}/team/find`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}