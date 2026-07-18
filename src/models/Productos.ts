import { Categoria } from "./Categoria"
import { Estado } from "./EstadoUsuario";
import { Proveedor } from "./Proveedor";

export interface Productos{
    id:number
    nombreProducto: string,
    descripcion: string,
    stock: number,
    precio:number,
    categoria: Categoria;
    estado: Estado;
    proveedor: Proveedor
}