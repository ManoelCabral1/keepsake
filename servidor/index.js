import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


import postRouter from './rotas/postsRouter.js';
import userRouter from './rotas/userRouter.js'
const app = express();
dotenv.config();
//config do servidor
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({limit: "30mb"}));
app.use(cors());
app.use('/posts', postRouter);
app.use('/user', userRouter);

//mensagem inicial ao conectar no servisor
app.get('/', (req, res) =>{
    res.send('Benvindo ao keepsake API');
});

const MONGODB_URI = process.env.MONGODB_URI;

const PORT = process.env.PORT || 5000;

//conexão ao banco de dados
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => app.listen(PORT, () =>{
            console.log(`Servidor rodando na porta: ${PORT}`);
        }))
        .catch((error) =>{
            console.log(error.message);
        })

mongoose.set('useFindAndModify', false)