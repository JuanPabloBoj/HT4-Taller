import { UsuarioRepository } from "../data/UsuarioRepository";
import { Usuario } from "../models/Usuario";

export class UsuarioService {
    private repository = new UsuarioRepository();

    private validarEmail(email:string): boolean{
        const dominio = /^[\w\.-]+@(gmail|hotmail|outlook)\com$/i;
        return dominio.test(email);
    }

    //Listar
    async listar(): Promise<Usuario[]> {
        return await this.repository.obtenerUsuarios();
    }

    //Crear
    async agregar(usuario: Usuario): Promise<void> {
        try {
            const usuarios = await this.repository.obtenerUsuarios();

            const existe = usuarios.some(u => u.id === usuario.id);

            if(existe){
                console.log("Ya existe un usuario con ese ID.");
                return;
            }
            
            if(!this.validarEmail(usuario.email)){
                console.log(`ERROR. El correo: ${usuario.email} no es valido. Usar solo @gmail, @hotmail o @outlook`);
                return;
            }

            if(usuario.edad < 18){
                console.log("Error, solo pueden ingresar usuarios mayores de edad.");
                return;
            }

            if(usuario.saldo < 0){
                console.log("Error, el saldo no debe ser negativo.")
                return;
            }

            usuarios.push(usuario);
            await this.repository.guardarUsuarios(usuarios);

        } catch (error) {
            console.log("Error al guardar un usuario.");
            throw error;
        }
    }

    //Listar por ID
    async buscar(id:number): Promise<Usuario | undefined>{
        const usuarios = await this.repository.obtenerUsuarios();

        return usuarios.find(u => u.id === id);
    }

    //Actualizar
    async actualizar(usuario: Usuario): Promise<void> {
       try {
        const usuarios = await this.repository.obtenerUsuarios();
        const indice = usuarios.findIndex(u => u.id === usuario.id)

        if(indice === -1){
            console.log("No existe un usuario con ese ID.");
            return;
        }
        
            if(!this.validarEmail(usuario.email)){
                console.log(`ERROR. El correo: ${usuario.email} no es valido. Usar solo @gmail, @hotmail o @outlook`);
                return;
            }

            if(usuario.edad < 18){
                console.log("Error, solo pueden ingresar usuarios mayores de edad.");
                return;
            }

            if(usuario.saldo < 0){
                console.log("Error, el saldo no debe ser negativo.")
                return;
            }

        usuarios[indice] = usuario;

        await this.repository.guardarUsuarios(usuarios);

        console.log("Usuario Actualizado.");
       } catch (error) {
        console.log("Error al actualizar el usuario.");
       }
    }

    //Eliminar
    async eliminar(id:number): Promise <void>{
        try {
            const usuarios = await this.repository.obtenerUsuarios();

            const nuevos = usuarios.filter(u => u.id !== id);

            if(nuevos.length === usuarios.length){
                false;
            }

            await this.repository.guardarUsuarios(nuevos);

        } catch (error) {
            console.log("Error al eliminar.");
        }
    }

    async login(nombreUsuario: string, contrasena: number): Promise<Usuario | undefined> {
        try {
            const usuarios = await this.repository.obtenerUsuarios();

            const usuarioValido = usuarios.find(u => u.nombre.toLowerCase() === nombreUsuario.toLowerCase() && u.contrasena === contrasena);

            return usuarioValido;
        } catch (error) {
            console.log("Error al realizar el login.")
            throw error;
        }
    }
}