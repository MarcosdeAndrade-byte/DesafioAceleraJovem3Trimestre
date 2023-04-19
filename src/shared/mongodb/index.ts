import { Db, MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017');
const dbName = 'todoApp';

let singleton: Db;

// Função para criação do banco de dados
async function connect() {
  // Lógica para reaproveitar conexões do banco de dados (Padrão Singleton)
  if (singleton) {
    return singleton;
  }

  await client.connect();

  console.log('Connected successfully to server');

  singleton = client.db(dbName);

  await singleton.collection('Tasks').createIndex({ title: 'text' });

  return singleton;
}

export { connect };

connect().then(console.log).catch(console.error);
