import authService from '../services/authService.js'
import { validateRegisterInput } from '../utils/validation.js';


const authController = {
    register : async (req, res) => {
        try {
            const {username, password, email} = req.body

            const validation = validateRegisterInput(username, email, password)

            if(!validation.isValid){
                return res.status(400).json({ error: validation.error });
            }

            const newUser = await authService.registerUser(username, email, password)

            return res.status(201).json({
                message: 'Usuario registrado exitosamente', 
                user: newUser
            })
        } catch (error) {

            return res.status(400).json({ error: error.message })

        }
    },

    login : async (req, res) => {
        try {

            const { email, password } = req.body


            const token = await authService.loginUser(email, password)

            return res.json(token)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

export default authController

