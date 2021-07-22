import fs from 'fs';

export default class Producto{
    index(id){
        let productos = JSON.parse(fs.readFileSync('./data/productos.json'));
        if(!id){
            return productos;
        }else{
            return productos.find(f => f.id == id) || {error: 'producto no encontrado'};
        }
    }

    create({title, price, thumbnail}){
        let productos = JSON.parse(fs.readFileSync('./data/productos.json'));
        productos.push({
            title,
            price,
            thumbnail,
            id: productos.length + 1,
        });
        fs.writeFileSync('./data/productos.json', JSON.stringify(productos));

        return productos[productos.length-1];
    }

    update({title, price, thumbnail, id}){
        let productos = JSON.parse(fs.readFileSync('./data/productos.json'));
        if(productos.find(f => f.id == id)){
            let producto_edit = productos.find(f => f.id == id);
            let index = productos.findIndex(f => f.id == id);
            producto_edit.title = title || producto_edit.title;
            producto_edit.price = price || producto_edit.price;
            producto_edit.thumbnail = thumbnail || producto_edit.thumbnail;
            productos[index] = producto_edit;
            fs.writeFileSync('./data/productos.json', JSON.stringify(productos));

            return producto_edit;
        }else{
            return {msg: 'Producto no encontrado'};
        }
    }

    delete(id){
        let productos = JSON.parse(fs.readFileSync('./data/productos.json'));
        let index = productos.findIndex(f => f.id == id);
        if(index != -1){
            productos.splice(index, 1);
            fs.writeFileSync('./data/productos.json', JSON.stringify(productos));

            return {msg: 'Producto eliminado'};
        }else{
            return {msg: 'Producto no encontrado'};
        }
    }
    

}