import mongoose from 'mongoose';
import Deporte from './modules/deporte';
import Atleta from './modules/atleta';

mongoose.connect('mongodb://127.0.0.1:27017/ejercicio1')
  .then(() => {
    console.log('Conectado a MongoDB');
    main();
  })

  .catch(err => console.error('No se pudo conectar a MongoDB', err));

async function crearDeporte(nombre: string, descripcion: string) {
    const deporte = new Deporte({ nombre, descripcion });
    const r = await deporte.save();
    console.log('Deporte creado:', r);
  }

async function crearAtleta(nombre: string, edad: number, altura: string) {
    const atleta = new Atleta({ nombre, edad, altura });
    const r = await atleta.save();
    console.log('Atleta creado:', r);
  }

async function asignarDeportesAtleta(nombreAtleta: string, nombresDeportes: string[]) {
    const atleta = await Atleta.findOne({ nombre: nombreAtleta }).populate('deportesPracticados');
    
    if (!atleta) {
      console.error('No existe');
      return;
    }
  
    const deportes = await Deporte.find({ nombre: { $in: nombresDeportes } });
    if (deportes.length === 0) {
      console.error('No existen estos deportes');
      return;
    }
  
    deportes.forEach(asignatura => atleta.deportesPracticados.push(deporte._id));
    await atleta.save();
    console.log(`Deportes que han sido asignados a ${nombreAtleta}:`, atleta.deportesPracticados);
  }

  async function asignarAtletasDeporte(nombreDeporte: string, nombresAtletas: string[]) {
    const deporte = await Deporte.findOne({ nombre: nombreDeporte }).populate('atletas');
    
    if (!deporte) {
    console.error('No existe');
    return;
    }

    const atletas = await Atleta.find({ nombre: { $in: nombresAtletas } });
    if (atletas.length === 0) {
    console.error('No existen estos profesores');
    return;
    }

    atletas.forEach(atleta => deporte.atletas.push(atleta._id));
    await deporte.save();
    console.log(`Profesores que han sido asignados a ${nombreDeporte}:`, deporte.atletas);
}

async function obtenerNumeroDeAtletasPorDeporte() {
    const r = await Deporte.aggregate([
      { $unwind: '$atletas' },
      { $group: { _id: '$nombre', numeroDeAtletas: { $sum: 1 } } }
    ]);
    console.log('El numero de atletas segun el deporte es:', r);
  }

async function listarAtletas() {
    const atletas = await Atleta.find().populate('deportesPracticados');
    console.log('Atletas:', atletas);
  }

async function listarDeportes() {
    const deportes = await Deporte.find().populate('atletas');
    console.log('Deportes:', deportes);
  }

async function verAtleta(nombre: string) {
    const atleta = await Atleta.findOne({ nombre });
    console.log('Atleta:', atleta);
  }

async function verDeporte(nombre: string) {
    const deporte = await Deporte.findOne({ nombre });
    console.log('Deporte:', deporte);
  }

  async function main() {
    console.log('Creamos atletas y deportes');
    await crearAtleta('Pere', 21, '1.75');
    await crearAtleta('Carles', 23, '1.77');
    await crearAtleta('Andrea', 23, '1.65');
    await crearDeporte('Baloncesto', 'Tirar balón a canasta y encestar');
    await crearDeporte('Futbol', 'Chutar balón a portería para marcar gol');
    await crearDeporte('Golf', 'Lanzar pelota pequeña con un palo y meterla en un hollo');
    await crearDeporte('Tenis', 'Lanzar una pelota pequeña con una raqueta contra tu oponente');

    console.log('Asignar deportes a los atletas');
    await asignarDeportesAtleta('Pere', ['Baloncesto', 'Futbol']);
    await asignarDeportesAtleta('Carles', ['Tenis', 'Futbol', 'Golf']);
    await asignarDeportesAtleta('Andrea', ['Baloncesto', 'Tenis']);
    
    console.log('Asignar atletas a los deportes');
    await asignarAtletasDeporte('Baloncesto', ['Pere']);
    await asignarAtletasDeporte('Baloncesto', ['Andrea']);
    await asignarAtletasDeporte('Futbol', ['Pere']);
    await asignarAtletasDeporte('Futbol', ['Carles']);
    await asignarAtletasDeporte('Tenis', ['Andrea']);
    await asignarAtletasDeporte('Tenis', ['Carles']);
    await asignarAtletasDeporte('Golf', ['Carles']);

    console.log('Aggregation Pipeline');
    await obtenerNumeroDeAtletasPorDeporte();

    console.log('Ver lista de atletas y asignaturas');
    await listarAtletas();
    await listarDeportes();

    console.log('Ver atleta y deporte por el nombre');
    await verAtleta('Juan');
    await verDeporte('Matematicas');
    
    mongoose.connection.close();
  }