import mongoose from 'mongoose';

const atletaSchema = new mongoose.Schema({
  nombre: { type: String},
  edad: { type: Number },
  altura: {type: String },
  deportesPracticados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deporte' }]
}, { versionKey: false });

  
const Atleta = mongoose.model('Atleta', atletaSchema);
export default Atleta;