import { menuAdmin, menuUser } from "./MenuUsuarios";
import { rl } from "../utils/readline";
import { UsuarioService } from "../service/UsuarioService";

const usuarioService = new UsuarioService();

export async function menuPrincipal() {

    
    console.log("Bienvenido al sistema operativo.");
    const nombreUsuario =  await rl.question("Ingrese su nombre: ");
    const contrasenaIngresada = Number(await rl.question("Ingrese su contraseña: "));

    const usuarioLogin = await usuarioService.login(nombreUsuario, contrasenaIngresada);

    if(!usuarioLogin){
        console.log("DENEGADO. Usuario o Contraseña incorrecta.");
        return;
    }

    if(usuarioLogin.rol === "ADMIN"){
        await menuAdmin();
    }else if(usuarioLogin.rol === "USER"){
        await menuUser(usuarioLogin.id, nombreUsuario);
    } else {
        console.log("ERROR. No se detecto ningun rol del usuario.");
    }
}