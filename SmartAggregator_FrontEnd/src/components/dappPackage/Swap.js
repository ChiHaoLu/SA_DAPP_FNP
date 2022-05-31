import React, { useState, useEffect } from "react";
import bigInt from "big-integer";
import { AlphaRouter } from "@uniswap/smart-order-router";
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";
import { ethers, BigNumber } from "ethers";
import abi from "erc-20-abi";
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

/*
    Uniswap V3 AlphaRouter Swap Bot:

        Swap tokens Programmatically.

*/

// Router Address
const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

// Environment Variables Setting
// **TODO**

// ChainID, 4 is Rinkeby Testnet's chainId
const chainId = 4;


// Swap Tokens infos, hardcode WETH to UNI
const name0 = "Wrapped Ether";
const symbol0 = "WETH";
const decimals0 = 18;
const address0 = "0xc778417e063141139fce010982780140aa0cd5ab";

const name1 = "Uniswap Token";
const symbol1 = "UNI";
const decimals1 = 18;
const address1 = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";

const WETH = new Token(chainId, address0, decimals0, symbol0, name0);
const UNI = new Token(chainId, address1, decimals1, symbol1, name1);

// Desired Swap Amount, 0.01 WETH
const wei = ethers.utils.parseUnits("0.01", 18);
const inputAmount = CurrencyAmount.fromRawAmount(WETH, bigInt(wei));

// Main Function
async function main( setOutput) {
    setOutput([]);
    // Web3Provider
    // **TODO**
    // Change to metamask web plugin as provider
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any"); // rinkeby
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const user = await signer.getAddress()

    const router = new AlphaRouter({ chainId: chainId, provider: provider });

    console.log("Enter main");
    setOutput("Swapping...")
    // Search and Print optimal swap price
    const route = await router.route(inputAmount, UNI, TradeType.EXACT_INPUT, {
        recipient: user,
        slippageTolerance: new Percent(25, 100),
        deadline: Math.floor(Date.now() / 1000 + 1800)
    });
    console.log(`Quote Exact In: ${route.quote.toFixed(10)}`);
    setOutput(`Quote Exact In: ${route.quote.toFixed(10)}`)
    // Swap Transaction Setting
    const transaction = {
        data: route.methodParameters.calldata,
        to: V3_SWAP_ROUTER_ADDRESS,
        value: BigNumber.from(route.methodParameters.value),
        from: user,
        gasPrice: BigNumber.from(route.gasPriceWei),
        gasLimit: ethers.utils.hexlify(1000000)
    };

    // Swap Contract Setting
    const approvalAmount = ethers.utils.parseUnits("0.1", 18).toString();
    const ERC20ABI = abi;
    const contract0 = new ethers.Contract(address0, ERC20ABI, provider);
    await contract0
        .connect(signer)
        .approve(V3_SWAP_ROUTER_ADDRESS, approvalAmount);

    //Begin Transaction
    const tradeTransaction = await signer.sendTransaction(transaction);
    console.log(`Swap Complete~!`);
    setOutput(`Swap Complete~!`)
}

const Swap = () => {
    const [output, setOutput] = useState([]);

    // Wallet and Provider should be accessed by metamask plugin.
    const [user, setUser] = useState({
        id: ''
    });

    useEffect(() => {
        if (user.id === '') { }
        else {
            connect();
        }
    }, [user])

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        connect();
        main(setOutput);
        setO(true);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const connect = () => {
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((newAccounts) => setUser({ id: newAccounts[0] }));
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [O, setO] = useState(false);
    return (

        <div>
            <div>
            <Button aria-describedby={id} variant="contained" color="success" onClick={() => handleClick()}>
                Swap with 0.01 Weth
            </Button>
            </div>
            <Collapse in={O}>
                <Alert
                    severity="info"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setO(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {output}
                </Alert>
            </Collapse>
        </div>
    );
};

export default Swap;
