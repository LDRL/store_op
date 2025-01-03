import clientAxios from "@/config/clientAxios";
import { isAxiosError } from "axios";
import { z } from 'zod'


const authSchema = z.object({
    nombre: z.string(),
    correo_electronico: z.string().email()
})
const userSchema = authSchema.pick({
    nombre: true,
    correo_electronico: true
}).extend({
    id_usuario: z.number()
})

export async function getUser() {
    try {
        const { data } = await clientAxios('auth/user')
        const response = userSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}