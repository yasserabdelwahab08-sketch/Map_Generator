import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import MapCreator from './components/MapCreator';


function App() {
  return (
    <div className="w-full min-h-screen bg-slate-900">
      <MapCreator />
    </div>
  );
}

export default App;
