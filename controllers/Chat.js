import fs from 'fs';

export default class Chat{
    constructor() {
        try {
            fs.readFileSync('./data/mensajes.json');
        } catch (error) {
            fs.writeFileSync('./data/mensajes.json', JSON.stringify([]));
        }
    }

    index(){
        let mensajes = JSON.parse(fs.readFileSync('./data/mensajes.json'));
        return mensajes;
    }

    sendMsg({email, msg}){
        let mensajes = JSON.parse(fs.readFileSync('./data/mensajes.json'));
        mensajes.push({
            email,
            msg
        });
        fs.writeFileSync('./data/mensajes.json', JSON.stringify(mensajes));

        return mensajes[mensajes.length-1];
    }
}