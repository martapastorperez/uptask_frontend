import api from "@/lib/axios"
import { UserRegistrationForm } from "../types"
import { isAxiosError } from "axios"


export async function createUser(formData:UserRegistrationForm) {
    try {
        const {data}= await api.post<string>('/auth/create-account', formData)
        return data        
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
           throw new Error (error.response.data.error)
        }        
    }
}
