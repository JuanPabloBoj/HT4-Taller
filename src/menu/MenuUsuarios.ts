import { Estado } from "../models/EstadoUsuario";
import { Rol } from "../models/Rol";
import { UsuarioService } from "../service/UsuarioService";
import { menuProductos } from "./MenuProductos";
import { menuProveedores } from "./MenuProveedores";
import { rl } from "../utils/readline";
import { ProductoService } from "../service/ProductoService";

const service = new UsuarioService();
const productosService = new ProductoService();

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
                const saldo = Number(await rl.question("SALDO: "));
                const rolTexto = await rl.question("Rol (ADMIN | USER): ");
                const estadoTexto = await rl.question("Estado (ACTIVO | INACTIVO | SUSPENDIDO): ");
                
                await service.agregar({
                    id,
                    nombre,
                    apellido,
                    edad,
                    email,
                    contrasena,
                    saldo,
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

            const idActualizar = Number(await rl.question("ID Actualizar: "));
            const nombreActualizar = await rl.question("Nombre Actualizar: ");
            const apellidoActualizar = await rl.question("Apellido Actualizar: ");
            const edadActualizar = Number(await rl.question("Edad Actualizar: "));
            const emailActualizar = await rl.question("Email Actualizar: ");
            const contrasenaActualizar =  Number(await rl.question("Contraseña Actualizar: "));
            const saldoActualizar = Number(await rl.question("Saldo Actualizar: "));
            const rolTextoActualizar = await rl.question("Rol Actualizar (ADMIN | USER): ");
            const estadoTextoActualizar = await rl.question("Estado Actualizar (ACTIVO | INACTIVO | SUSPENDIDO): ");

            await service.actualizar({
                id: idActualizar,
                nombre: nombreActualizar,
                apellido: apellidoActualizar,
                edad: edadActualizar,
                email: emailActualizar,
                contrasena: contrasenaActualizar,
                saldo: saldoActualizar,
                rol: rolTextoActualizar.toUpperCase() as Rol,
                estado: estadoTextoActualizar as Estado
        });
                break;
            case 5:
                const idEliminar = Number(await rl.question("Ingrese el ID a eliminar: "));

                await service.eliminar(idEliminar);
                break;
            case 6:
                console.log("Regresando al menu principal.")
                break;
            default:
                console.log("Error, ingrese solo una de las opciones.");
                break;
        }

    }while(opcion != 6){
    }
}

export async function menuAdmin() {
    let opcion = 0;

    do{
  console.log("\n| Menu Principal ADMIN |");
        console.log("1. Productos");
        console.log("2. Usuarios");
        console.log("3. Proveedores");
        console.log("4. Salir");

        opcion = Number(await rl.question("Opcion: "));
        switch(opcion){
            case 1:
                await menuProductos();
                break;
            case 2:
                await menuUsuarios();
                break;
            case 3:
                await menuProveedores();
                break;
            case 4:
                console.log("Cerrando sesion...");
                break;
            default:
                console.log("Error, solo ingrese una de las opciones validas.")
        }
    }while(opcion != 4){
    }
}

export async function menuUser(idUsuario:number, nombreUsuario:string) {
    let opcion = 0;
    do{
  console.log(`\n| Menu Principal USER ${nombreUsuario} |`);
        console.log("1. Ver saldo");
        console.log("2. Comprar");
        console.log("3. Salir");

        opcion = Number(await rl.question("Opcion: "));
        switch(opcion){
            case 1:
                const salarioUser = await service.buscar(idUsuario);

                console.log(`\n Tu salario actual es de: Q${salarioUser?.saldo}`);
                break;
            case 2:
                const nombreProducto = await rl.question("Ingrese el nombre del producto: ");
                
                const producto = await productosService.buscarPorNombre(nombreProducto);

                if(!producto){
                    console.log(`Error, producto: ${nombreProducto}, inexistente.`);
                    break;
                }

                const usuario = await service.buscar(idUsuario);
                
                if(!usuario){
                    break;
                }

                if(usuario.saldo < producto.precio ){
                    console.log(`Proceso rechazado. Saldo actual: Q${usuario.saldo}. Precio actual: Q${producto.precio}`);
                    return;
                }

                usuario.saldo -= producto.precio;

                await service.actualizar(usuario);

                console.log(`Compra del producto: ${producto.nombreProducto}, realizada con exito. \nSu saldo actual es: Q${usuario.saldo}`)

                break;
            case 3:
                console.log("Cerrando sesion...")
                break;
            default:
                console.log("Error, solo ingrese una de las opciones validas.");
        }
    }while(opcion != 3){
    }
}
