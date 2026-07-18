import { Estado } from "../models/EstadoUsuario";
import { Rol } from "../models/Rol";
import { UsuarioService } from "../service/UsuarioService";
import { rl } from "../utils/readline";

const service = new UsuarioService();

export async function menuUsuarios() {
    let opcion = 0;

    do{
        console.log("\n| Menu Usuarios |");
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
                const nombre = await rl.question("Nombre: ");
                const apellido = await rl.question("Apellido: ");
                const edad = Number(await rl.question("Edad: "));
                const email = await rl.question("Email: ");
                const contrasena =  Number(await rl.question("Contraseña: "));
                const rolTexto = await rl.question("Rol (ADMIN | USER): ");
                const estadoTexto = await rl.question("Estado (ACTIVO | INACTIVO | SUSPENDIDO): ");
                
                await service.agregar({
                    id,
                    nombre,
                    apellido,
                    edad,
                    email,
                    contrasena,
                    rol: rolTexto.toUpperCase() as Rol,
                    estado: estadoTexto.toUpperCase() as Estado
        });

                break;
            case 2:

            console.table(await service.listar());
                break;
            case 3:

            const idBuscar = Number(await rl.question("Ingrese el ID a buscar: "));

            console.table(await service.buscar(idBuscar));
                break;
            case 4:

            const idActualizar = Number(await rl.question("ID Actualzar: "));
            const nombreActualizar = await rl.question("Nombre Actualzar: ");
            const apellidoActualizar = await rl.question("Apellido Actualzar: ");
            const edadActualizar = Number(await rl.question("Edad Actualzar: "));
            const emailActualizar = await rl.question("Email Actualzar: ");
            const contrasenaActualizar =  Number(await rl.question("Contraseña Actualzar: "));
            const rolTextoActualizar = await rl.question("Rol Actualzar (ADMIN | USER): ");
            const estadoTextoActualizar = await rl.question("Estado Actualzar (ACTIVO | INACTIVO | SUSPENDIDO): ");

            await service.actualizar({
                id: idActualizar,
                nombre: nombreActualizar,
                apellido: apellidoActualizar,
                edad: edadActualizar,
                email: emailActualizar,
                contrasena: contrasenaActualizar,
                rol: rolTextoActualizar as Rol,
                estado: estadoTextoActualizar as Estado
        });
                break;
            case 5:
                const idEliminar = Number(await rl.question("Ingrese el ID a eliminar: "));

                await service.eliminar(idEliminar);
                break;
            default:
                console.log("Ingrese solo una de las opciones.");
                break;
        }

    }while(opcion != 6){
        rl.close;
    }
}