"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const promises_1 = require("fs/promises");
class UsuarioRepository {
    //Dar la ruta donde se almacenara mi archivo JSON.
    ruta = "./src/data/usuarios.json";
    //Metodo para obtener | buscar.
    async obtenerUsuarios() {
        try {
            const datos = await (0, promises_1.readFile)(this.ruta, "utf-8");
            return JSON.parse(datos);
        }
        catch (error) {
            return [];
        }
    }
    //Metodo para guardar usuarios | actualizar | eliminar.
    async guardarUsuarios(usuarios) {
        try {
            await (0, promises_1.writeFile)(this.ruta, JSON.stringify(usuarios, null, 4));
        }
        catch (error) {
            console.log("Error al guardar.");
            throw error;
        }
    }
}
exports.UsuarioRepository = UsuarioRepository;
