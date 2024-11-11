import { validateToken } from "@/services/AuthAPI"
import { ConfirmToken } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import PinInput from "react-pin-input"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
 
type NewPasswordTokenProps={
    token:ConfirmToken['token']
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>

}

export const NewPasswordToken = ({token, setToken, setIsValidToken}:NewPasswordTokenProps) => {
    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }

    const {mutate}=useMutation({
        mutationFn:validateToken,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            toast.success(data)
            setIsValidToken(true)
        }
    })

    const handleComplete = (token: ConfirmToken['token']) => {
        mutate({token})
    }

    return (
        <>
            <form
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
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
                    to='/auth/forgot-password'
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    )
}
