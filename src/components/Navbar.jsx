
// import {Link} from 'react'
import {HiOutlineHome} from 'react-icons/hi'
import { useGlobalState } from './store';
import { connectWallet } from './Blockchains';


const Navbar = () => {
    const [connectedAccount] = useGlobalState('connectedAccount')
  return <header className={`flex justify-between p-5 top-0 z-0 shadow-md left-0 right-0 fixed bg-slate-200 `}>
    <div className="flex  ">
        
        <div className="flex space-x-2 justify-between items-center font-light text-2l text-white">
        <a href='/'> 
        <button className="flex space-x-2 hover:cursor-pointer bg-blue-500 px-5 py-2 hover:bg-blue-600
        rounded-md shadow-md items-center shadow-slate-500 hover:shadow-slate-800 leading-tight uppercase " >
            <HiOutlineHome className="text-white mr-1"/>
            
             Home </button>
             </a>
        </div>
    </div>

    <div className="flex space-x-2 justify-between items-center font-light text-2xl text-black uppercase"> 
    <p >Vesting App</p>

    </div>

    <div className="flex text-white ">
        <div className="flex space-x-8 justify-between items-center font-normal text-sm ">
       
        { connectedAccount ? (
            <div className="hover:cursor-pointer bg-blue-500 px-5 py-2 hover:bg-blue-600
                rounded-full shadow-md  shadow-slate-500 hover:shadow-slate-800 leading-tight uppercase " >
                    {connectedAccount.slice(0,4) + "..." + connectedAccount.slice(-5) }
            </div>
        ):(
            <div>
             <button className="hover:cursor-pointer bg-blue-500 px-5 py-2 hover:bg-blue-600
                rounded-full shadow-md  shadow-slate-500 hover:shadow-slate-800 leading-tight uppercase "
                onClick={connectWallet} >connect Wallet </button>
            </div>
        ) }
       
        </div>
    </div>
   
    </header>;
};

export default Navbar;
