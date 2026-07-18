import { readFile, writeFile } from "fs/promises";
import { Productos } from "../models/Productos";

export class ProductosRepository{

    private ruta = "./src/data/productos.json";

    async obtenerProductos(): Promise<Productos[]>{
        try {
            const data = await readFile(this.ruta, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async guardarProducto(productos: Productos[]): Promise<void>{
        try {
            await writeFile(this.ruta, JSON.stringify(productos, null, 4));
        } catch (error) {
            console.log("Error al guardar.");
            throw error;
        }
    }
}