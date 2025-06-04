
import { Client } from 'pg'

const dbusuarios = new Client ({
   host: 'localhost',
   port: 5432,
   user:'postgres',
   password: 'root',
   database: 'inicio'
});
dbusuarios.connect();
export default dbusuarios;