// Mensajes de Sockets

const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
console.log('init server');

bands.addBand(new Band( 'Queen' ));
bands.addBand(new Band( 'Bon Jovi' ));
bands.addBand(new Band( 'Héroes del Silencio' ));
bands.addBand(new Band( 'Metallica' ));

console.log(bands);

io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload)=>{
        console.log('Mensaje!!', payload);

        io.emit( 'mensaje', {admin: 'Nuevo mensaje'});
    });

    client.on('emitir-mensaje', (payload) => {
        io.emit('nuevo-mensaje', payload);
        // console.log(payload);
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);

        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        // const newBand = new Band(payload.name);
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {

        bands.deleteBand(id = payload.id);
        io.emit('active-bands', bands.getBands());
    })

  });
