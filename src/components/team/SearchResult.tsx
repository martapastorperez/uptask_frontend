import { TeamMember } from '@/types/index'

type SearchResultProps={
    user:TeamMember
}

export const SearchResult = ({user}:SearchResultProps) => {

    const handleAddUserToProject=()=>{
        console.log('hola');
        
    }
    
  return (
    <>
    <p className="mt-10 text-center font-bold">Resultado:</p>
    <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button
            className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
           onClick={handleAddUserToProject}
        >Agregar al Proyecto</button>
    </div>
</>
  )
}
