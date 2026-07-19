"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosRepository = void 0;
const promises_1 = require("fs/promises");
class ProductosRepository {
    ruta = "./src/data/productos.json";
    async obtenerProductos() {
        try {
            const data = await (0, promises_1.readFile)(this.ruta, "utf-8");
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    }
    async guardarProducto(productos) {
        try {
            await (0, promises_1.writeFile)(this.ruta, JSON.stringify(productos, null, 4));
        }
        catch (error) {
            console.log("Error al guardar.");
            throw error;
        }
    }
}
exports.ProductosRepository = ProductosRepository;
