import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/db.js'

const authService = {
    registerUser : async (username, email, password) => {
        
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email } , { username }]
            }
        })

        if (existingUser){
            throw new Error('El usuario o email ya existe')
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const newUser = await prisma.user.create({
            data: {
                username, 
                email, 
                passwordHash: hashedPassword, 
                role:'client'
            },
            select: { id: true, username: true, email: true, role: true }
        })
        return newUser
    },

    loginUser : async (email, password) => {
        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(!user){
            throw new Error('Invalid email or password')
        }

        const validPassword = await bcrypt.compare(password, user.passwordHash)

        if(!validPassword){
            throw new Error('Invalid email or password')
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        return { 
            token, 
            user: { 
                id: user.id, 
                username: user.username,
                email: user.email, 
                role: user.role,
                avatarUrl: user.avatarUrl
            } }
    }
}

export default authService
