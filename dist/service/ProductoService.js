"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoService = void 0;
const ProductoRepository_1 = require("../data/ProductoRepository");
class ProductoService {
    repository = new ProductoRepository_1.ProductosRepository();
    async listar() {
        return await this.repository.obtenerProductos();
    }
    async crear(producto) {
        try {
            const productos = await this.repository.obtenerProductos();
            const existe = productos.some(p => p.id === producto.id);
            if (existe) {
                console.log("Ya existe un producto con ese ID.");
                return;
            }
            productos.push(producto);
            await this.repository.guardarProducto(productos);
        }
        catch (error) {
            console.log("Error al guardar un producto.");
            throw error;
        }
    }
    async buscar(id) {
        const productos = await this.repository.obtenerProductos();
        return productos.find(p => p.id === id);
    }
    async actualizar(producto) {
        try {
            const productos = await this.repository.obtenerProductos();
            const indice = productos.findIndex(p => p.id === producto.id);
            if (indice === -1) {
                console.log("No existe un producto con ese ID.");
                return;
            }
            productos[indice] = producto;
            await this.repository.guardarProducto(productos);
        }
        catch (error) {
            console.log("Error al actualizar el producto.");
        }
    }
    async eliminar(id) {
        try {
            const productos = await this.repository.obtenerProductos();
            const nuevos = productos.filter(p => p.id !== id);
            if (nuevos.length === productos.length) {
                false;
            }
            await this.repository.guardarProducto(nuevos);
        }
        catch (error) {
            console.log("Error al eliminar.");
        }
    }
    async buscarPorNombre(nombre) {
        const productos = await this.repository.obtenerProductos();
        return productos.find(p => p.nombreProducto.toLowerCase() === nombre.toLowerCase());
    }
}
exports.ProductoService = ProductoService;
