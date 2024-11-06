import { confirmToken } from '@/services/AuthAPI'
import { ConfirmToken } from '@/types/index'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import PinInput from 'react-pin-input'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'


export const ConfirmAccountView = () => {

    const [token, setToken]=useState<ConfirmToken['token']>('')

    const {mutate}=useMutation({
        mutationFn:confirmToken,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{            
            toast.success(data)
        }
    })

    const handleChange=(token:ConfirmToken['token'])=>{
        setToken(token)  
    }

    const handleComplete=(token:ConfirmToken['token'])=>{
        mutate({token})     
    }

  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>
      <form
        className="space-y-8 p-10 bg-white mt-10"
      >
        
        <label
          className="font-normal text-2xl text-center block"
        >Código de 6 dígitos</label>
         <div className="flex justify-center gap-5">
         <PinInput 
            length={6} 
            initialValue={token}
            
            onChange={handleChange} 
      
            style={{padding: '10px'}}  
            inputStyle={{borderColor: 'lightgrey'}}
            inputFocusStyle={{borderColor: 'fucksia'}}
            onComplete={handleComplete}
            autoSelect={true}
            />
        </div>
        
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/request-code'
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>

    </>
  )
}
