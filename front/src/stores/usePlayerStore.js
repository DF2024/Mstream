import { create } from 'zustand';

export const usePlayerStore = create((set) => ({
    isPlaying: false,
    currentSong: null,
    volume: 50,
    playlist: [], // Lista de canciones actual (cola de reproducción)
    currentIndex: 0,

    setSong: (song) => set({ currentSong: song, isPlaying: true }),
    setPlaylist: (songs) => set({ playlist: songs }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    setVolume: (val) => set({ volume: val }),
}));