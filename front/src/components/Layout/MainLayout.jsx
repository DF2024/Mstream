import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';

const MainLayout = () => {
    return (
        <div className="h-screen flex flex-col bg-black text-white">
            <div className="flex-1 flex overflow-hidden">
                {/* 1. Sidebar Fijo */}
                <Sidebar />
                
                {/* 2. Contenido Central con Scroll */}
                <main className="flex-1 overflow-y-auto bg-spotify-base rounded-lg m-2">
                    <Outlet /> {/* Aquí cargan las páginas (Home, Playlist, Admin) */}
                </main>
            </div>

            {/* 3. Barra de Reproducción Fija */}
            <PlayerBar />
        </div>
    );
};

export default MainLayout;