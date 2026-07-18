import { readFile, writeFile } from "fs/promises";
import { Proveedor } from "../models/Proveedor";

export class ProveedorRepository{

    private ruta = "./src/data/proveedores.json";

    async obtenerProveedor(): Promise<Proveedor[]> {
        try {
            const data = await readFile(this.ruta, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return[];
        }
    }

    async guardarProveedor(proveedor: Proveedor[]): Promise<void>{
        try {
            await writeFile(this.ruta, JSON.stringify(proveedor, null, 4));
        } catch (error) {
            console.log("Error al guardar.");
            throw error;
        }
    }
}