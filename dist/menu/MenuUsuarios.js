"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuUsuarios = menuUsuarios;
exports.menuAdmin = menuAdmin;
exports.menuUser = menuUser;
const UsuarioService_1 = require("../service/UsuarioService");
const MenuProductos_1 = require("./MenuProductos");
const MenuProveedores_1 = require("./MenuProveedores");
const readline_1 = require("../utils/readline");
const ProductoService_1 = require("../service/ProductoService");
const service = new UsuarioService_1.UsuarioService();
const productosService = new ProductoService_1.ProductoService();
async function menuUsuarios() {
    let opcion = 0;
    do {
        console.log("\n| Menu Usuarios |");
        console.log("1. Agregar");
        console.log("2. Mostrar");
        console.log("3. Buscar por ID");
        console.log("4. Actualizar");
        console.log("5. Eliminar");
        console.log("6. Salir");
        opcion = Number(await readline_1.rl.question("Opcion: "));
        switch (opcion) {
            case 1:
                const id = Number(await readline_1.rl.question("ID: "));
                const nombre = await readline_1.rl.question("Nombre: ");
                const apellido = await readline_1.rl.question("Apellido: ");
                const edad = Number(await readline_1.rl.question("Edad: "));
                const email = await readline_1.rl.question("Email: ");
                const contrasena = Number(await readline_1.rl.question("Contraseña: "));
                const saldo = Number(await readline_1.rl.question("SALDO: "));
                const rolTexto = await readline_1.rl.question("Rol (ADMIN | USER): ");
                const estadoTexto = await readline_1.rl.question("Estado (ACTIVO | INACTIVO | SUSPENDIDO): ");
                await service.agregar({
                    id,
                    nombre,
                    apellido,
                    edad,
                    email,
                    contrasena,
                    saldo,
                    rol: rolTexto.toUpperCase(),
                    estado: estadoTexto.toUpperCase()
                });
                break;
            case 2:
                console.table(await service.listar());
                break;
            case 3:
                const idBuscar = Number(await readline_1.rl.question("Ingrese el ID a buscar: "));
                console.table(await service.buscar(idBuscar));
                break;
            case 4:
                const idActualizar = Number(await readline_1.rl.question("ID Actualizar: "));
                const nombreActualizar = await readline_1.rl.question("Nombre Actualizar: ");
                const apellidoActualizar = await readline_1.rl.question("Apellido Actualizar: ");
                const edadActualizar = Number(await readline_1.rl.question("Edad Actualizar: "));
                const emailActualizar = await readline_1.rl.question("Email Actualizar: ");
                const contrasenaActualizar = Number(await readline_1.rl.question("Contraseña Actualizar: "));
                const saldoActualizar = Number(await readline_1.rl.question("Saldo Actualizar: "));
                const rolTextoActualizar = await readline_1.rl.question("Rol Actualizar (ADMIN | USER): ");
                const estadoTextoActualizar = await readline_1.rl.question("Estado Actualizar (ACTIVO | INACTIVO | SUSPENDIDO): ");
                await service.actualizar({
                    id: idActualizar,
                    nombre: nombreActualizar,
                    apellido: apellidoActualizar,
                    edad: edadActualizar,
                    email: emailActualizar,
                    contrasena: contrasenaActualizar,
                    saldo: saldoActualizar,
                    rol: rolTextoActualizar.toUpperCase(),
                    estado: estadoTextoActualizar
                });
                break;
            case 5:
                const idEliminar = Number(await readline_1.rl.question("Ingrese el ID a eliminar: "));
                await service.eliminar(idEliminar);
                break;
            case 6:
                console.log("Regresando al menu principal.");
                break;
            default:
                console.log("Error, ingrese solo una de las opciones.");
                break;
        }
    } while (opcion != 6);
    {
    }
}
async function menuAdmin() {
    let opcion = 0;
    do {
        console.log("\n| Menu Principal ADMIN |");
        console.log("1. Productos");
        console.log("2. Usuarios");
        console.log("3. Proveedores");
        console.log("4. Salir");
        opcion = Number(await readline_1.rl.question("Opcion: "));
        switch (opcion) {
            case 1:
                await (0, MenuProductos_1.menuProductos)();
                break;
            case 2:
                await menuUsuarios();
                break;
            case 3:
                await (0, MenuProveedores_1.menuProveedores)();
                break;
            case 4:
                console.log("Cerrando sesion...");
                break;
            default:
                console.log("Error, solo ingrese una de las opciones validas.");
        }
    } while (opcion != 4);
    {
    }
}
async function menuUser(idUsuario, nombreUsuario) {
    let opcion = 0;
    do {
        console.log(`\n| Menu Principal USER ${nombreUsuario} |`);
        console.log("1. Ver saldo");
        console.log("2. Comprar");
        console.log("3. Salir");
        opcion = Number(await readline_1.rl.question("Opcion: "));
        switch (opcion) {
            case 1:
                const salarioUser = await service.buscar(idUsuario);
                console.log(`\n Tu salario actual es de: Q${salarioUser?.saldo}`);
                break;
            case 2:
                const nombreProducto = await readline_1.rl.question("Ingrese el nombre del producto: ");
                const producto = await productosService.buscarPorNombre(nombreProducto);
                if (!producto) {
                    console.log(`Error, producto: ${nombreProducto}, inexistente.`);
                    break;
                }
                const usuario = await service.buscar(idUsuario);
                if (!usuario) {
                    break;
                }
                if (usuario.saldo < producto.precio) {
                    console.log(`Proceso rechazado. Saldo actual: Q${usuario.saldo}. Precio actual: Q${producto.precio}`);
                    return;
                }
                usuario.saldo -= producto.precio;
                await service.actualizar(usuario);
                console.log(`Compra del producto: ${producto.nombreProducto}, realizada con exito. \nSu saldo actual es: Q${usuario.saldo}`);
                break;
            case 3:
                console.log("Cerrando sesion...");
                break;
            default:
                console.log("Error, solo ingrese una de las opciones validas.");
        }
    } while (opcion != 3);
    {
    }
}
