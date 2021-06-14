import pg from 'pg'


const { Client } = pg;
const client = new Client({
    user: "f74066098",
    password: "tytetyteOOU885",
    host: "localhost",
    port: 5432,
    database: "houserentdb",
})



 export { client as default };