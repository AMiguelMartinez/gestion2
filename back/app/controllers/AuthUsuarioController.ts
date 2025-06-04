import  Database  from "../database/dbusuarios.js";
import hash from '@adonisjs/core/services/hash'; 

export default class AuthUsuariosController {
    async register({request, response}){
      const {email, password} = request.body()
      //hashbar contra
      const newpass = await hash.make(password)
      const respuesta = await Database.query("insert into usuarios(email,password) values ($1, $2)", [email,newpass])
      console.log(respuesta)
      if(respuesta.rowCount >0) {
        return response.json({respuesta:'Usuario creado exitosamente'})
      } else {
        return response.json({respuesta:'No se pudo registrar el usuario'})
      }
      
    }

    async login ({request, response}) {
        const {email, password} = request.body()
        const resp = await Database.query("select * from usuarios where email = $1", [email])
        console.log(resp.rows[0].password)
        if (resp.rows.length>0){
            //descriptar y comparar
            const valido= await hash.verify(resp.rows[0].password,password)
            if (valido == true){
            return response.json({msj:'Inicio de sesion correcto'})
            } else {
                return response.json({msj:'Error en el email o password'})
            }
        }
    }
}