class Producto{
    id='';
    nombre='';
    desc='';
    precioCompra='';
    precioFinal='';
    cantidad='';
    categoria='';
    talla='';

    constructor(id, nombre, desc, pc, pf, cantidad, categoria, talla) {
        this.id = id;
        this.nombre = nombre;
        this.precioCompra = pc;
        this.desc = desc;
        this.precioFinal = pf;
        this.cantidad = cantidad;
        this.categoria = categoria;
        this.talla = talla;
    }
}

module.exports = Producto
