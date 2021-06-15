import express from 'express'
import client from './database/dbConnect.js';
// import cors from 'cors'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// let corsOptions = {
//     origin: "*",
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: ['Accept', 'Authorization', 'Content-Type', 'X-Requested-With', 'Range']
// }
// app.use(cors(corsOptions));

await client.connect();


app.use('/', async (req, res) => {
    console.log(req.body);
    try {
        const data = await client.query(req.body.sql);
        return res.status(200).send(data.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send({
        status: 500,
        message: err.message,
        data: {}
    })
})


app.listen(process.env.PORT || 8000, () => {
    console.log(`app is listen in Port ${PORT}`)
})

