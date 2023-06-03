import { ethers } from 'ethers';
import abi from '../../artifacts/contracts/Vesting.sol/Vesting.json'
// import address from '../abis/contractAddress.json'

import { getGlobalState, setGlobalState  } from './store'

const {ethereum } = window
// const contractAddress =  address.address
const contractAbi = abi.abi


const contractAddress =  '0xe81B82118188DE0650f24DaDF6f7C71A167F2a91';
const connectWallet = async () => {
    try {
        if (!ethereum) return alert('Wallet not found')
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    }catch(error){
        reportError(error)
    }
}
const isWalletConnected = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
  
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload()
      })
  
      window.ethereum.on('accountsChanged', async () => {
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
        await isWalletConnected()
      })
  
      if (accounts.length) {
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
      } else {
        alert('Please connect wallet.')
        console.log('No accounts found.')
      }
    } catch (error) {
      reportError(error)
    }
  }

  const getContract = async () => {
    const connectedAccount = getGlobalState('connectedAccount')
  
    if (connectedAccount) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractAbi, signer)
      return contract
    } else {
      return getGlobalState('contract')
    }
  
  }
 
  const addNewOrganisation = async (name ,address, token) => {
    try {
  
      if (!ethereum) return alert("Please install Metamask")
      // const connectedAccount = getGlobalState("connectedAccount")
      const contract = await getContract()
      console.log("name ,address, token   ",name ,address, token)
      const organisation = await contract.addOrganisation(name ,address, token)
      console.log("organisation ",organisation)
      return true
    } catch (error) {
      reportError(error)
    } 
    
  }

  const listOrganisations = async ( ) => {
    try {
  
      if (!ethereum) return alert("Please install Metamask")
      const connectedAccount = getGlobalState("connectedAccount")
      const contract = await getContract()
      const organisation = await contract.organisations(connectedAccount)
      // setGlobalState("organisation", organisation )
      console.log(organisation) ;
    } catch (error) {
      reportError(error)
    }
  }

  const listStakeholder = async ( ) => {
    try {
  
      if (!ethereum) return alert("Please install Metamask")
      const connectedAccount = getGlobalState("connectedAccount")
      const contract = await getContract()
      const organisation = await contract.getStakeholderPostion(connectedAccount)
      setGlobalState("organisation", organisation )
      console.log(organisation) ;
    } catch (error) {
      reportError(error)
    }
  }


  const addNewStakeholder = async ( _stakeholderAddress,_post, _vestingPeriod, _token) => {
    try {
  
      if (!ethereum) return alert("Please install Metamask")
      // const connectedAccount = getGlobalState("connectedAccount")
      const contract = await getContract()
      const organisation = await contract.addStakeholder(_stakeholderAddress,_post, _vestingPeriod, _token)
      console.log("organisation ",organisation)
      
      return true;
    } catch (error) {
      reportError(error)
    }
  }

  const addToWhitelist = async (_address) => {
    try {
  
      if (!ethereum) return alert("Please install Metamask")
      // const connectedAccount = getGlobalState("connectedAccount")
      const contract = await getContract()
      const organisation = await contract.whitelistAddress(_address)
      console.log("organisation ",organisation)
      return true;
    } catch (error) {
      reportError(error)
    }
  }
  
  const claimVesting = async () => {
    try {
  
      if (!ethereum) return alert("Please install Metamask")
      // const connectedAccount = getGlobalState("connectedAccount")
      const contract = await getContract()
      const organisation = await contract.claimToken()
      console.log("organisation ",organisation)
      return true;
    } catch (error) {
      reportError(error)
    }
  }

  const Balance = async () => {
    try {
  
      if (!ethereum) return alert("Please install Metamask")
      const connectedAccount = getGlobalState("connectedAccount")
      const contract = await getContract()
      const bal = await contract.balance(connectedAccount)
      console.log("bal ",bal.toString())
      setGlobalState('bal', bal.toString())
      return bal;
    } catch (error) {
      reportError(error)
    }
  }



  // const restructuredOrg = (orgers) =>
  // orgers
  //   .map((org) => ({
  //     token: org.token.toNumber(),
  //     orgAddress: org.orgAddress.toLowerCase(),
  //     name: org.name,
  //   }))
  //   .reverse()

const reportError = (error) => { 
    console.log(error.message)
    throw new Error( "Error", error)
}

export {
    connectWallet,
    isWalletConnected,
    getContract,
    addNewOrganisation,
    addNewStakeholder,
    listOrganisations,
    addToWhitelist,
    claimVesting,
    listStakeholder,
    Balance,
}