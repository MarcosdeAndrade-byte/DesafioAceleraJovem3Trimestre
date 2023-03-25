import 'reflect-metadata';
import './shared/container';
import express from 'express';
import { router } from './shared/routes';

// Código (Server) utilizado para iniciar a aplicação e configurar o servidor HTTP

const app = express();

app.use(express.json());

app.use(router);

app.listen(3333,() => console.log('Servidor rodando 🚀'));
