import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { Project, TeamMember, TeamMembersSchema, teamMemberForm } from "../types"


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

export async function addMember({projectId,id}:{ projectId:Project['_id'],id:TeamMember['_id']}) {
    try {
        const {data}= await api.post(`/projects/${projectId}/team`, {id})
        return data
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}

export async function listMembers( projectId:Project['_id']  ) {
    try {
        const {data}= await api.get(`/projects/${projectId}/team`)
        const response=TeamMembersSchema.safeParse(data)
        if (response.success) {
             return response.data
        }
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}