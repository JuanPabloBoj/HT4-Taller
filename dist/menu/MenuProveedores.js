"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuProveedores = menuProveedores;
const ProveedorService_1 = require("../service/ProveedorService");
const readline_1 = require("../utils/readline");
const service = new ProveedorService_1.ProveedorService();
async function menuProveedores() {
    let opcion = 0;
    do {
        console.log("\n| Menu Proveedor |");
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
                const nombreProveedor = await readline_1.rl.question("NOMBRE: ");
                const correoProveedor = await readline_1.rl.question("CORREO: ");
                const registroTexto = await readline_1.rl.question("REGISTRO SANITARIO (VERIFICADO | CLAUSURADO): ");
                const estadoTexto = await readline_1.rl.question("ESTADO (ACTIVO | INACTIVO): ");
                await service.agregar({
                    id,
                    nombreProveedor,
                    correoProveedor,
                    registroSanitario: registroTexto,
                    estado: estadoTexto
                });
                break;
            case 2:
                console.table(await service.listar());
                break;
            case 3:
                const idBuscar = Number(await readline_1.rl.question("Ingrese el ID del proveedor a buscar: "));
                console.table(await service.buscar(idBuscar));
                break;
            case 4:
                const idActualizar = Number(await readline_1.rl.question("ID Actualizar: "));
                const nombreProveedorActualizar = await readline_1.rl.question("NOMBRE Actualizar: ");
                const correoProveedorActualizar = await readline_1.rl.question("CORREO Actualizar: ");
                const registroTextoActualizar = await readline_1.rl.question("REGISTRO SANITARIO Actualizar (VERIFICADO | CLAUSURADO): ");
                const estadoTextoActualizar = await readline_1.rl.question("ESTADO Actualizar (ACTIVO | INACTIVO): ");
                await service.actualizar({
                    id: idActualizar,
                    nombreProveedor: nombreProveedorActualizar,
                    correoProveedor: correoProveedorActualizar,
                    registroSanitario: registroTextoActualizar,
                    estado: estadoTextoActualizar
                });
                break;
            case 5:
                const idEliminar = Number(await readline_1.rl.question("Ingrese el ID del proveedor a eliminar: "));
                await service.eliminar(idEliminar);
                break;
            case 6:
                console.log("Regresando al menu principal.");
                break;
            default:
                console.log("Error, ingrese solo una de las opciones validas.");
                break;
        }
    } while (opcion != 6);
    {
    }
}
