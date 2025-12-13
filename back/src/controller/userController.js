import userService from '../services/userService.js'


const userController = {

    getAllUsers : async (req, res) => {
        try {
            const pagination = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10
            }

            const result = await userService.getAllUsers( pagination)
            
            res.status(200).json({
                success: true,
                data: result.users,
                pagination: result.pagination
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },

    getUsersById : async (req, res) => {
        try {
            const { id } = req.params
            const user = await userService.getUserById(id)
            
            res.status(200).json({
                success: true,
                data: user
            })
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message
            })
        }
    },

    updateUser : async (req, res) => {
        try {
            const { id } = req.params
            const updateData = req.body
            
            delete updateData.password
            delete updateData.role


            const updatedUser = await userService.updateUser(id, updateData)
            
            res.status(200).json({
                success: true,
                data: updatedUser,
                message: 'Usuario actualizado'
            })
        } catch (error) {
            const statusCode = error.message.includes('no encontrada') ? 404 : 400
            res.status(statusCode).json({
                success: false,
                error: error.message
            })
        }
    },

    deleteUser : async (req, res) => {
        try {
            const { id } = req.params
            const result = await userService.deleteUser(id)
            
            res.status(200).json({
                success: true,
                message: result.message
            })
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message
            })
        }
    }
}

export default userController