import { Route, Routes } from 'react-router-dom'
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import User from './components/User'
import Admin from './components/Admin'
import { Balance, getContract, isWalletConnected, listOrganisations, listStakeholder } from './components/Blockchains'
import { useEffect, useState } from 'react'

function App() {

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      console.log('Blockchain loaded');
      await isWalletConnected();
      setLoaded(true);
      await listOrganisations();
      await getContract();
      await Balance();
      await listStakeholder()
    };
    loadData();
  }, []);
  
  return (
    <>
      <div className='min-h-screen'>
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Hero/>} />
          <Route path="/User" exact element={<User/>} />
          <Route path="/Admin" exact element={<Admin/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
