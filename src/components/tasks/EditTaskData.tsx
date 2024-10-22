import { getTaskById } from "@/services/TaskAPI"
import { Project } from "@/types/index"
import { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"

type EditTaskProps={
    projectId:Project['_id']
}

export const EditTaskData = ({projectId}:EditTaskProps) => {

    const location=useLocation()
    const queryParams= new URLSearchParams(location.search)
    const taskId=queryParams.get('editTask')!
    const {data}=useQuery({
        queryKey:['taskId', taskId],
        queryFn:()=>getTaskById({projectId,taskId}),
        enabled:!!taskId
    })

    console.log(data);
    

 if (data) return (
    <EditTaskModal/>
  )
}
