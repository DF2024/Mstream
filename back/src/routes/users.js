import express from 'express'
import { verifyToken, verifyAdmin } from '../middlewares/auth.js';
import usersController from '../controller/userController.js'

const router = express.Router()

router.get('/', verifyToken, verifyAdmin, usersController.getAllUsers)
router.get('/:id', verifyToken, verifyAdmin, usersController.getUsersById)
router.put('/:id', verifyToken, verifyAdmin, usersController.updateUser)
router.delete('/:id', verifyToken, verifyAdmin, usersController.deleteUser)

export default router

