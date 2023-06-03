import { createGlobalState } from 'react-hooks-global-state'


const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({

    connectedAccount: '',
    contract: null,
    organisation: [],
    bal: '',
    
})

const shortenString = (str, firstLength, lastLength)  =>{
    let firstChars = str.toString().substr(0, firstLength);
    let lastChars = str.toString().substr(-lastLength);
  
    return firstChars + "..." + lastChars;
  }
  

export {
    useGlobalState,
    setGlobalState,
    getGlobalState,
    shortenString
}