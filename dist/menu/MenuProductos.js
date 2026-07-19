"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuProductos = menuProductos;
const ProductoService_1 = require("../service/ProductoService");
const readline_1 = require("../utils/readline");
const ProveedorService_1 = require("../service/ProveedorService");
const service = new ProductoService_1.ProductoService;
const serviceProveedor = new ProveedorService_1.ProveedorService;
async function menuProductos() {
    let opcion = 0;
    do {
        console.log("\n| Menu Productos |");
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
                const nombreProducto = await readline_1.rl.question("NOMBRE: ");
                const descripcion = await readline_1.rl.question("DESCRIPCION: ");
                const stock = Number(await readline_1.rl.question("STOCK:"));
                const precio = Number(await readline_1.rl.question("PRECIO: "));
                const categoriaTexto = await readline_1.rl.question("CATEGORIA (ANALGESICOS | ANTIPIRETICOS | ANTIBIOTICOS | ANTIINFLAMATORIOS | PSICOFARMACOS): ");
                const estadoTexto = await readline_1.rl.question("AGOTADO | DISPONIBLE | EN ESPERA");
                const idProveedor = Number(await readline_1.rl.question("ID PROVEEDOR"));
                const proveedorExiste = await serviceProveedor.buscar(idProveedor);
                if (!proveedorExiste) {
                    console.log("Proveedor inexistente con ese ID.");
                    break;
                }
                await service.crear({
                    id,
                    nombreProducto,
                    descripcion,
                    stock,
                    precio,
                    categoria: categoriaTexto.toUpperCase(),
                    estado: estadoTexto.toUpperCase(),
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
                const idBuscar = Number(await readline_1.rl.question("Ingrese ID a buscar: "));
                console.table(await service.buscar(idBuscar));
                break;
            case 4:
                const idActualizar = Number(await readline_1.rl.question("ID: "));
                const nombreProductoActualizar = await readline_1.rl.question("NOMBRE: ");
                const descripcionActualizar = await readline_1.rl.question("DESCRIPCION: ");
                const stockActualizar = Number(await readline_1.rl.question("STOCK:"));
                const precioActualizar = Number(await readline_1.rl.question("PRECIO: "));
                const categoriaTextoActualizar = await readline_1.rl.question("CATEGORIA (ANALGESICOS | ANTIPIRETICOS | ANTIBIOTICOS | ANTIINFLAMATORIOS | PSICOFARMACOS): ");
                const estadoTextoActualizar = await readline_1.rl.question("AGOTADO | DISPONIBLE | EN ESPERA");
                const idProveedorActualizar = Number(await readline_1.rl.question("ID PROVEEDOR"));
                const proveedor = await serviceProveedor.buscar(idProveedorActualizar);
                if (!proveedor) {
                    console.log("Proveedor inexistente con ese ID.");
                    break;
                }
                await service.actualizar({
                    id: idActualizar,
                    nombreProducto: nombreProductoActualizar,
                    descripcion: descripcionActualizar,
                    stock: stockActualizar,
                    precio: precioActualizar,
                    categoria: categoriaTextoActualizar,
                    estado: estadoTextoActualizar,
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
                const idEliminar = Number(await readline_1.rl.question("Ingrese el ID del producto a eliminar: "));
                await service.eliminar(idEliminar);
                break;
            case 6:
                console.log("Regresando al menu principal.");
                break;
            default:
                console.log("Error, ingrese solo una de las opciones indicadas.");
                break;
        }
    } while (opcion != 6);
    {
    }
}
