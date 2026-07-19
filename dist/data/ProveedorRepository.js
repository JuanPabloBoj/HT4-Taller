"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorRepository = void 0;
const promises_1 = require("fs/promises");
class ProveedorRepository {
    ruta = "./src/data/proveedores.json";
    async obtenerProveedor() {
        try {
            const data = await (0, promises_1.readFile)(this.ruta, "utf-8");
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    }
    async guardarProveedor(proveedor) {
        try {
            await (0, promises_1.writeFile)(this.ruta, JSON.stringify(proveedor, null, 4));
        }
        catch (error) {
            console.log("Error al guardar.");
            throw error;
        }
    }
}
exports.ProveedorRepository = ProveedorRepository;
