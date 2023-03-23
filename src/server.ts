import 'reflect-metadata';
import './shared/container';
import express from 'express';
import { router } from './shared/routes';

const app = express();

app.use(express.json());

app.use(router);

app.listen(3333,() => console.log('Servidor rodando 🚀'));
