require('dotenv').config();
const fs = require('fs');
var body_parser = require('body-parser');

const bd = './bd.json';
const Producto = require("./producto");

const express = require('express');
const app = express();
const hbs = require('hbs');

const PORT = process.env.PORT;
hbs.registerPartials(__dirname+'/views/partials');

const listado = {}
var id = 0

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(body_parser.urlencoded({extended:true}));

app.get('/', function (req, res) {
    const productos = leerDB()
    info = {
        'productos': productos,
        'nextID': id,
    }
    res.render('inventario', info);
})

app.post('/addProducto', function (req, res){
    const pid = id++;
    const nombre = req.body.nombre
    const desc = req.body.desc
    const pc = req.body.pc
    const pf = req.body.pf
    const cantidad = req.body.cantidad
    const categoria = req.body.categoria
    const talla = req.body.talla
    const prod = new Producto(pid, nombre, desc, pc, pf, cantidad, categoria, talla);
    listado[prod.id] = prod;
    guardarDB(listadoProductos());
})

app.post('/delProducto', function (req, res){
    pid = req.body.pid;
    if(pid in listado){
        delete listado[pid];
    }
    guardarDB(listadoProductos());
})

app.post('/updProducto', function (req, res){
    const pid = req.body.pid;
    const nombre = req.body.nombre
    const desc = req.body.desc
    const pc = req.body.pc
    const pf = req.body.pf
    const cantidad = req.body.cantidad
    const categoria = req.body.categoria
    const talla = req.body.talla
    if (pid in listado){
        const aux = listado[pid];
        aux.nombre = nombre
        aux.desc = desc
        aux.precioCompra = pc
        aux.precioFinal = pf
        aux.cantidad = cantidad
        aux.categoria = categoria
        aux.talla = talla
    }else{
        console.log("Ocurrio un error")
        console.log(`${pid} ${nombre} ${desc} ${pc} ${pf} ${cantidad} ${categoria} ${talla}`)
    }
    guardarDB(listadoProductos());
})

app.listen(PORT);
console.log('Escuchando el puerto 8080')

const guardarDB = (data) => {
    fs.writeFileSync(bd,JSON.stringify(data));
}

const leerDB = () =>{
    if(!fs.existsSync(bd)){
        return null;
    }
    const info = fs.readFileSync(bd, {encoding:'utf-8'});
    const data = JSON.parse(info);
    return data;
}

const listadoProductos = () => {
    const l = [];
    Object.keys(listado).forEach(key =>{
        const tarea = listado[key];
        l.push(tarea);
    });
    return l;
}


const prods = leerDB()

if(prods.length > 0) {
    id = prods[prods.length - 1]["id"] + 1
    console.log(id)
}
/*
* Agregar
* Eliminar
* Editar
* Ver
* */
