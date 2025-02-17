import api from "@/lib/axios"
import { ConfirmToken, ForgotPasswordForm, NewPasswordFormType, RequestConfirmationCodeForm, User, UserLoginForm, UserRegistrationForm, checkPasswordForm } from "../types"
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

export async function confirmToken(formData:ConfirmToken){
    try {
        const {data}=await api.post<string>('/auth/confirm-account', formData)
        return data
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function requestToken(formData:RequestConfirmationCodeForm){
    try {
        const {data}=await api.post<string>('/auth/request-code', formData)
        return data
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function login(formData:UserLoginForm){
    try {
        const {data}=await api.post<string>('/auth/login', formData)
        localStorage.setItem('AUTH_TOKEN',data)
        return data
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPassword(formData:ForgotPasswordForm){
    try {
        const {data}=await api.post<string>('/auth/forgot-password', formData)
        return data
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(formData:ConfirmToken){
    try {
        const {data}=await api.post<string>('/auth/validate-token', formData)
        return data
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function setNewPassword({formData, token}:{formData:NewPasswordFormType, token:ConfirmToken['token']}){
    try {
        const {data}=await api.post<string>(`/auth/update-password/${token}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function getUser(){
    try {
        const {data}=await api.get<User>(`/auth/user/`)
        return data
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function checkPassword(formData:checkPasswordForm){
    try {
        const {data}=await api.post<string>('/auth/check-password', formData)
        return data
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.error)
        }
    }
}