"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuPrincipal = menuPrincipal;
const MenuUsuarios_1 = require("./MenuUsuarios");
const readline_1 = require("../utils/readline");
const UsuarioService_1 = require("../service/UsuarioService");
const usuarioService = new UsuarioService_1.UsuarioService();
async function menuPrincipal() {
    console.log("Bienvenido al sistema operativo.");
    const nombreUsuario = await readline_1.rl.question("Ingrese su nombre: ");
    const contrasenaIngresada = Number(await readline_1.rl.question("Ingrese su contraseña: "));
    const usuarioLogin = await usuarioService.login(nombreUsuario, contrasenaIngresada);
    if (!usuarioLogin) {
        console.log("DENEGADO. Usuario o Contraseña incorrecta.");
        return;
    }
    if (usuarioLogin.rol === "ADMIN") {
        await (0, MenuUsuarios_1.menuAdmin)();
    }
    else if (usuarioLogin.rol === "USER") {
        await (0, MenuUsuarios_1.menuUser)(usuarioLogin.id, nombreUsuario);
    }
    else {
        console.log("ERROR. No se detecto ningun rol del usuario.");
    }
}
