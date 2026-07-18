import { ProveedorRepository } from "../data/ProveedorRepository";
import { Proveedor } from "../models/Proveedor";

export class ProveedorService {
    private repository = new ProveedorRepository();

    async listar(): Promise<Proveedor[]>{
        return await this.repository.obtenerProveedor();
    }

    async agregar(proveedor: Proveedor): Promise<void>{
        try {
            const proveedores = await this.repository.obtenerProveedor();
            const existe = proveedores.some(p => p.id === proveedor.id);

            if(existe){
                console.log("Ya existe un proveedor con este ID.");
                return;
            }

            proveedores.push(proveedor);
            await this.repository.guardarProveedor(proveedores);
        } catch (error) {
            console.log("Error al guardar un proveedor.");
            throw error;
        }
    }

    async buscar(id:number): Promise<Proveedor | undefined>{
        const proveedores = await this.repository.obtenerProveedor();

        return proveedores.find(p => p.id === id);
    }

    async actualizar(proveedor: Proveedor): Promise<void>{
        try {
            const proveedores = await this.repository.obtenerProveedor();
            const indice = proveedores.findIndex(p => p.id === proveedor.id);

            if(indice === -1){
                console.log("No existe un proveedor con ese ID.");
                return;
            }

            proveedores[indice] = proveedor;

            await this.repository.guardarProveedor(proveedores);

            console.log("Proveedor actualizado.");
        } catch (error) {
            console.log("Error al actualizar Proveedor.");
        }
    }

    
    async eliminar(id:number): Promise<void>{
        try {
            const proveedores = await this.repository.obtenerProveedor();
            const nuevo = proveedores.filter(p => p.id !== id);

            if(nuevo.length === proveedores.length){
                false;
            }

            await this.repository.guardarProveedor(nuevo);
;        } catch (error) {
            console.log("Error al eliminar.");
        }
    }
}