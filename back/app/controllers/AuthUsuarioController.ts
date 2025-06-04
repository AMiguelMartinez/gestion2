import  Database  from "../database/dbusuarios.js";
import hash from '@adonisjs/core/services/hash'; 

export default class AuthUsuariosController {
    async register({request, response}){
      const {email, password} = request.body()
      //hashbar contra
      const newpass = await hash.make(password)
      const respuesta = await Database.query("insert into usuarios(email,password) values ($1, $2)", [email,newpass])
      console.log(respuesta)
      return response.json({respuesta:'Usuario creado exitosamente'})
    }

    async login ({request, response}) {
        const {email, password} = request.body()
        const resp = await Database.query("select * from usuarios where email = $1", [email])
        console.log(resp.rows[0].password)
        if (resp.rows.length>0){
            if (password == resp.rows[0].password){
            return response.json({msj:'Usuario logeado correctamente'})
            }
        }
        

    }
}