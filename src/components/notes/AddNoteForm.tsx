import { NoteFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/services/NoteAPI"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

export const AddNoteForm = () => {

    const queryParams=new URLSearchParams(location.search)
    const taskId=queryParams.get('viewTask')!
    const params=useParams()
    const projectId=params.projectId!
    const queryClient=useQueryClient()

    const initialValues:NoteFormData={
        content:''
    }
    const {register, handleSubmit, formState:{errors}, reset}=useForm({defaultValues:initialValues})

    const {mutate}=useMutation({
        mutationFn:createNote,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            toast.success(data)
            queryClient.invalidateQueries({queryKey:['task', taskId]})
            reset()
        }
    })


    const handleAddNote=(formData:NoteFormData)=>{
        const data={
            projectId:projectId,
            taskId:taskId,
            formData:formData
        }
        mutate(data)

    }

  return (
    <form onSubmit={handleSubmit(handleAddNote)}
        className="space-y-3"
        noValidate>

         <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="content">Crear Nota</label>
                <input
                    id="content"
                    type="text"
                    placeholder="Contenido de la nota"
                    className="w-full p-3 border border-gray-300"
                   {...register('content',{
                    required:'El contenido de la nota es obligatorio'
                   })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
                
            </div>

            <input
                type="submit"
                value='Crear Nota'
                className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
            />


    </form>
  )
}
