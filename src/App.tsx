import './App.css'
import "./index.css"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setStores } from '@/redux/slices/storesSlice';
import { Store } from '@/redux/storeTypes';

import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Analysis from './pages/Analysis'
import Map from './pages/Map'
import Overview from './pages/Overview'
import Header from './components/Header'

function App() {

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Stores von der API ziehen und im global State speichern
    const fetchStores = async () => {
      const response = await fetch('https://www.mueller.de/api/ccstore/allPickupStores/');
      const data: Store[] = await response.json();
      dispatch(setStores(data));
    };

    fetchStores();
  }, [dispatch]);

  return (
    <div className='flex h-screen'>
      <Header currentPath={location.pathname}></Header>

      <div className='flex flex-col items-center justify-center h-full ml-8'>
        <Navbar currentPath={location.pathname}></Navbar>
      </div>

      <div className='flex flex-1 p-4  m-6 mt-28'>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />

          <Route path='/overview' element={<Overview />}></Route>
          <Route path='/analysis' element={<Analysis />}></Route>
          <Route path='/map' element={<Map />}></Route>

          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </div>
    </div>
  )
}


export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}