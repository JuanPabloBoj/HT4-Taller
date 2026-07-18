import { Estado } from "./EstadoProveedor"
import { RegistroSanitario } from "./RegistroSanitario"

export interface Proveedor{
    id: number,
    nombreProveedor: string,
    correoProveedor: string,
    registroSanitario: RegistroSanitario,
    estado: Estado 
}