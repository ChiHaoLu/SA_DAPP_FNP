import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import * as Web3 from 'web3';

/*****************************************/
/* Detect the MetaMask Ethereum provider */
/*****************************************/

import detectEthereumProvider from '@metamask/detect-provider';

// this returns the provider, or null if it wasn't detected
const provider = async () => { await detectEthereumProvider(); }


if (provider) {
    startApp(provider); // Initialize your app
} else {
    console.log('Please install MetaMask!');
}

function startApp(provider: any) {
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
    }
    // Access the decentralized web!
}

const LoginSys: React.FC = () => {

    const [isLoging, setIsLoging] = useState(false);

    /**********************************************************/
    /* Handle chain (network) and chainChanged (per EIP-1193) */
    /**********************************************************/

    const [chainId, setChainId] = useState("");
    // const chainId = async () => { await (window).ethereum.request({ method: 'eth_chainId' }); }

    useEffect(() => {
        if (isLoging){
            (window).ethereum.on('chainChanged', handleChainChanged);
            (window).ethereum
                .request({ method: 'eth_chainId' })
                .then((newChain: any) => setChainId(newChain))
                .catch((err: any) => {
                    // Some unexpected error.
                    // For backwards compatibility reasons, if no accounts are available,
                    // eth_accounts will return an empty array.
                    console.error(err);
                });
        }
        
    }, []);

    function handleChainChanged(_chainId: any) {
        // We recommend reloading the page, unless you must do otherwise
        window.location.reload();
        (window).ethereum
            .request({ method: 'eth_chainId' })
            .then((newChain: any) => setChainId(newChain))
            .catch((err: any) => {
                // Some unexpected error.
                // For backwards compatibility reasons, if no accounts are available,
                // eth_accounts will return an empty array.
                console.error(err);
            });
    }

    /***********************************************************/
    /* Handle user accounts and accountsChanged (per EIP-1193) */
    /***********************************************************/

    const [user, setUser] = useState("");

    function handleAccountsChanged(accounts: any) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== user) {
            setUser(accounts[0]);
            // Do any other work!
        }
    }
    useEffect(() => {
        if (isLoging) {
        (window).ethereum.on('accountsChanged', handleAccountsChanged);
        (window).ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((newAccounts: any) => setUser(newAccounts[0]))
            .catch((err: any) => {
                // Some unexpected error.
                // For backwards compatibility reasons, if no accounts are available,
                // eth_accounts will return an empty array.
                console.error(err);
            });
        }
    }, []);

    const Login = () => {
        (window).ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((newAccounts: any) => setUser(newAccounts[0]))
            .catch((err: any) => {
                // Some unexpected error.
                // For backwards compatibility reasons, if no accounts are available,
                // eth_accounts will return an empty array.
                console.error(err);
            });
        
        (window).ethereum
            .request({ method: 'eth_chainId' })
            .then((newChain: any) => setChainId(newChain))
            .catch((err: any) => {
                // Some unexpected error.
                // For backwards compatibility reasons, if no accounts are available,
                // eth_accounts will return an empty array.
                console.error(err);
            });

        setIsLoging(true);
    };

    return (
        <div>
            {!isLoging &&
                <p><Button
                    sx={{ m: 2, width: '26.5ch' }}
                    onClick={() => { Login() }}
                    variant="contained">Login by Metamask
                </Button></p>
            }
            {isLoging && 
                <div>
                    <p >User: {user} </p >
                    <p >ChainID: {chainId}</p >
                </div>
            }
        </div>
    );
};

export default LoginSys;
