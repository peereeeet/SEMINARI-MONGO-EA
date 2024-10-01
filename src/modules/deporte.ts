import mongoose from 'mongoose';

const deporteSchema = new mongoose.Schema({
  nombre: { type: String },
  descripcion: { type: String},
  atletas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Atleta' }]
});

const Deporte = mongoose.model('Asignatura', deporteSchema);
export default Deporte;