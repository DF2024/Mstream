import { create } from 'zustand';
import api from '../api/axios';

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,

    // Función de Login: Llama al backend y guarda datos
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            
            // Asumiendo que tu backend devuelve: { token, user: {...} }
            const { token, user } = response.data; // <--- OJO AQUÍ, AJUSTAR SEGÚN TU BACKEND

            // Si tu backend devuelve { token, user } directamente, úsalo así.
            // Si devuelve { token } y tienes que decodificar, avísame.
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            set({ token, user });
            return true; // Éxito
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            return false; // Fallo
        }
    },

    // Función de Logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ token: null, user: null });
    },
    
    // Helper para saber si es admin
    isAdmin: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.role === 'admin';
    }
}));