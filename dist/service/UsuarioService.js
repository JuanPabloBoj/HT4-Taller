"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const UsuarioRepository_1 = require("../data/UsuarioRepository");
class UsuarioService {
    repository = new UsuarioRepository_1.UsuarioRepository();
    //Listar
    async listar() {
        return await this.repository.obtenerUsuarios();
    }
    //Crear
    async agregar(usuario) {
        try {
            const usuarios = await this.repository.obtenerUsuarios();
            const existe = usuarios.some(u => u.id === usuario.id);
            if (existe) {
                console.log("Ya existe un usuario con ese ID.");
                return;
            }
            usuarios.push(usuario);
            await this.repository.guardarUsuarios(usuarios);
        }
        catch (error) {
            console.log("Error al guardar un usuario.");
            throw error;
        }
    }
    //Listar por ID
    async buscar(id) {
        const usuarios = await this.repository.obtenerUsuarios();
        return usuarios.find(u => u.id === id);
    }
    //Actualizar
    async actualizar(usuario) {
        try {
            const usuarios = await this.repository.obtenerUsuarios();
            const indice = usuarios.findIndex(u => u.id === usuario.id);
            if (indice === -1) {
                console.log("No existe un usuario con ese ID.");
                return;
            }
            usuarios[indice] = usuario;
            await this.repository.guardarUsuarios(usuarios);
            console.log("Usuario Actualizado.");
        }
        catch (error) {
            console.log("Error al actualizar el usuario.");
        }
    }
    //Eliminar
    async eliminar(id) {
        try {
            const usuarios = await this.repository.obtenerUsuarios();
            const nuevos = usuarios.filter(u => u.id !== id);
            if (nuevos.length === usuarios.length) {
                false;
            }
            await this.repository.guardarUsuarios(nuevos);
        }
        catch (error) {
            console.log("Error al eliminar.");
        }
    }
}
exports.UsuarioService = UsuarioService;
