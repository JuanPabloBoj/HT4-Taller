import { Estado } from "../models/EstadoProducto";
import { Categoria } from "../models/Categoria";
import { ProductoService } from "../service/ProductoService";
import { rl } from "../utils/readline";

const service = new ProductoService;

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
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }while(opcion != 6){
        rl.close
    }
}