import Router from '@adonisjs/core/services/router'
import AuthUsuariosController from '../../app/controllers/AuthUsuarioController.js'

const auth = new AuthUsuariosController()
Router.post('/register',auth.register)
Router.post('login', auth.login)