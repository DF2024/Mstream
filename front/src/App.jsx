import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import { useAuthStore } from "./stores/useAuthStore"

const ProtectedRoute = ({children}) => {
  const { token } = useAuthStore()
  if (!token){
    return <Navigate to="/login" />;
  }

  return children
}


function App() {
  return (
      <BrowserRouter>
          <Routes>
              {/* Ruta Pública */}
              <Route path="/login" element={<LoginPage />} />

              {/* Ruta Pública */}
              <Route path="/register" element={<RegisterPage />} />

              {/* Ruta Protegida (Home) */}
              <Route path="/api" element={
                  <ProtectedRoute>
                      <div className="text-white p-10">
                          <h1>¡Bienvenido! Has iniciado sesión correctamente.</h1>
                          {/* Aquí pondremos el Layout completo luego */}
                      </div>
                  </ProtectedRoute>
              } />
          </Routes>
      </BrowserRouter>
  )
}

export default App
