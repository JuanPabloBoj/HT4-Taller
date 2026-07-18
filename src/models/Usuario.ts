import { Rol } from "./Rol"
import { Estado } from "./EstadoUsuario"

export interface Usuario {
    id:number,
    nombre:string,
    apellido:string,
    edad:number,
    email:string,
    contrasena:number,
    rol: Rol,
    estado: Estado
}