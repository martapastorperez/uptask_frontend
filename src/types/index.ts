import { z } from "zod";

/**Auth and users */
const authSchema=z.object({
    name:z.string(),
    email: z.string().email(),
    password:z.string(),
    password_confirmation:z.string(),
    token:z.string()
})

type Auth=z.infer<typeof authSchema>
export type UserLoginForm=Pick<Auth, 'email'|'password'>
export type UserRegistrationForm=Pick<Auth, 'name'|'email'|'password'|'password_confirmation'>
export type ConfirmToken=Pick<Auth,'token'>
export type RequestConfirmationCodeForm=Pick<Auth, 'email'>
export type ForgotPasswordForm=Pick<Auth, 'email'>
export type NewPasswordFormType=Pick<Auth, 'password'|'password_confirmation'>

/**Users */
export const userSchema=authSchema.pick({
    name:true,
    email: true
}).extend({
    _id:z.string()
})
export type User=z.infer<typeof userSchema>

/**Tasks */
export const taskStatusSchema=z.enum(["pending" , "onHold" , "inProgress" , "underReview" , "completed"])
export type taskStatus=z.infer<typeof taskStatusSchema>

export const TaskSchema=z.object({
    _id:z.string(),
    name:z.string(),
    description:z.string(),
    project:z.string(),
    status:taskStatusSchema,
    createdAt:z.string(),
    updatedAt:z.string()
})

export type Task=z.infer<typeof TaskSchema>
export type TaskFormData= Pick<Task,'name'| 'description'>


/**Projects */
export const ProjectSchema = z.object({
    _id:z.string(),
    projectName:z.string(),
    clientName:z.string(),
    description:z.string()
})

export const dashboaardProjectSchema=z.array(
    ProjectSchema.pick({
        _id:true,
        projectName:true,
        clientName:true,
        description:true
    })
)
export type Project= z.infer<typeof ProjectSchema>

export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' |  'description'>



/**teams */
const teamMemberSchema=userSchema.pick({
    email:true,
    name:true,
    _id:true
})
export const TeamMembersSchema= z.array(teamMemberSchema)
export type TeamMember= z.infer<typeof teamMemberSchema>
export type teamMemberForm=Pick<TeamMember, 'email'>
