// eslint-disable-next-line import/no-extraneous-dependencies
//MONGODB_URI 'mongodb://localhost/ti_system'
//'mongodb+srv://kambaia:N2212xiste@pco.elr8dyv.mongodb.net/?retryWrites=true&w=majority'
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGODB_LOCAL!);
    console.log('Conexão com o banco de dados estabelecida!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1); // Encerra o processo com erro
  }
};

export default connectDB;
