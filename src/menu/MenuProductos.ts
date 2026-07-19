import { Estado } from "../models/EstadoProducto";
import { Categoria } from "../models/Categoria";
import { ProductoService } from "../service/ProductoService";
import { rl } from "../utils/readline";
import { ProveedorService } from "../service/ProveedorService";

const service = new ProductoService;
const serviceProveedor = new ProveedorService;

export async function menuProductos() {
    let opcion = 0;

    do{
        console.log("\n| Menu Productos |");
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
                const nombreProducto = await rl.question("NOMBRE: ");
                const descripcion = await rl.question("DESCRIPCION: ");
                const stock = Number(await rl.question("STOCK: "));
                const precio = Number(await rl.question("PRECIO: "));
                const categoriaTexto = await rl.question("CATEGORIA (ANALGESICOS | ANTIPIRETICOS | ANTIBIOTICOS | ANTIINFLAMATORIOS | PSICOFARMACOS): ");
                const estadoTexto = await rl.question("ESTADO (AGOTADO | DISPONIBLE | EN ESPERA): ");
                const idProveedor = Number(await rl.question("ID PROVEEDOR: "));

                const proveedorExiste = await serviceProveedor.buscar(idProveedor);

                if(!proveedorExiste){
                    console.log("Proveedor inexistente con ese ID.");
                    break;
                }

                await service.crear({
                    id,
                    nombreProducto,
                    descripcion,
                    stock,
                    precio,
                    categoria: categoriaTexto.toUpperCase() as Categoria,
                    estado: estadoTexto.toUpperCase() as Estado,
                    proveedor: {
                        id: idProveedor,
                        nombreProveedor: proveedorExiste.nombreProveedor,
                        correoProveedor: proveedorExiste.correoProveedor,
                        registroSanitario: proveedorExiste.registroSanitario,
                        estado: proveedorExiste.estado
                    }
                });
                break;
            case 2:
                console.table(await service.listar());
                break;
            case 3:

            const idBuscar = Number(await rl.question("Ingrese ID a buscar: "));

            console.table(await service.buscar(idBuscar));
                break;
            case 4:
                 const idActualizar = Number(await rl.question("ID: "));
                const nombreProductoActualizar = await rl.question("NOMBRE: ");
                const descripcionActualizar = await rl.question("DESCRIPCION: ");
                const stockActualizar = Number(await rl.question("STOCK: "));
                const precioActualizar = Number(await rl.question("PRECIO: "));
                const categoriaTextoActualizar = await rl.question("CATEGORIA (ANALGESICOS | ANTIPIRETICOS | ANTIBIOTICOS | ANTIINFLAMATORIOS | PSICOFARMACOS): ");
                const estadoTextoActualizar = await rl.question("ESTADO (AGOTADO | DISPONIBLE | EN ESPERA):");
                const idProveedorActualizar = Number(await rl.question("ID PROVEEDOR: "));

                 const proveedor = await serviceProveedor.buscar(idProveedorActualizar);

                if(!proveedor){
                    console.log("Proveedor inexistente con ese ID.");
                    break;
                }

                await service.actualizar({
                    id: idActualizar,
                    nombreProducto: nombreProductoActualizar,
                    descripcion: descripcionActualizar,
                    stock: stockActualizar,
                    precio: precioActualizar,
                    categoria: categoriaTextoActualizar as Categoria,
                    estado: estadoTextoActualizar as Estado,
                    proveedor: {
                        id: idProveedorActualizar,
                        nombreProveedor: proveedor.nombreProveedor,
                        correoProveedor: proveedor.correoProveedor,
                        registroSanitario: proveedor.registroSanitario,
                        estado: proveedor.estado
                    }
                });
                break;
            case 5:
                const idEliminar = Number(await rl.question("Ingrese el ID del producto a eliminar: "));

                await service.eliminar(idEliminar);
                break;
            case 6:
                console.log("Regresando al menu principal.")
                break;
            default:
                console.log("Error, ingrese solo una de las opciones indicadas.")
                break;
        }
    }while(opcion != 6){
    }
}