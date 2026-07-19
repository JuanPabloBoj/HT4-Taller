import { Estado } from "../models/EstadoProveedor";
import { RegistroSanitario } from "../models/RegistroSanitario";
import { ProveedorService } from "../service/ProveedorService";
import { rl } from "../utils/readline";

const service = new ProveedorService();

export async function menuProveedores() {
    let opcion = 0;

    do{
        console.log("\n| Menu Proveedor |");
        console.log("1. Agregar");
        console.log("2. Mostrar");
        console.log("3. Buscar por ID");
        console.log("4. Actualizar");
        console.log("5. Eliminar");
        console.log("6. Salir");

        opcion = Number(await rl.question("Opcion: "));

        switch(opcion){
            case 1:
                const id = Number(await rl.question("ID: "));
                const nombreProveedor = await rl.question("NOMBRE: ");
                const correoProveedor = await rl.question("CORREO: ");
                const registroTexto = await rl.question("REGISTRO SANITARIO (VERIFICADO | CLAUSURADO): ");
                const estadoTexto = await rl.question("ESTADO (ACTIVO | INACTIVO): ");

                await service.agregar({
                    id,
                    nombreProveedor,
                    correoProveedor,
                    registroSanitario: registroTexto as RegistroSanitario,
                    estado: estadoTexto as Estado
                });
                break;
            case 2:

            console.table(await service.listar());
                break;
            case 3:

            const idBuscar = Number(await rl.question("Ingrese el ID del proveedor a buscar: "));

            console.table(await service.buscar(idBuscar));
                break;
            case 4:
                 const idActualizar = Number(await rl.question("ID Actualizar: "));
                const nombreProveedorActualizar = await rl.question("NOMBRE Actualizar: ");
                const correoProveedorActualizar = await rl.question("CORREO Actualizar: ");
                const registroTextoActualizar = await rl.question("REGISTRO SANITARIO Actualizar (VERIFICADO | CLAUSURADO): ");
                const estadoTextoActualizar = await rl.question("ESTADO Actualizar (ACTIVO | INACTIVO): ");

                await service.actualizar({
                    id:idActualizar,
                    nombreProveedor: nombreProveedorActualizar,
                    correoProveedor: correoProveedorActualizar,
                    registroSanitario: registroTextoActualizar as RegistroSanitario,
                    estado: estadoTextoActualizar as Estado
                });

                break;
            case 5:
                const idEliminar = Number(await rl.question("Ingrese el ID del proveedor a eliminar: "));

                await service.eliminar(idEliminar);
                break;
            case 6:
                console.log("Regresando al menu principal.")
                break;
            default:
                console.log("Error, ingrese solo una de las opciones validas.");
                break;
        }
    }while(opcion != 6){
    }
}