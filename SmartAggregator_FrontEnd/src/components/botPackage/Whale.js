import React, { useState } from "react";
import Moralis from "moralis";
import axios from "axios";
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

var YourApiKeyToken = "TVQ7CXSAVS8VYXHC84PGFA3I8A618IMQYQ";

const d = new Date();

async function checkERC20Value(result, setOutput) {
    const options = {
        address: result.token_address,
        chain: "Eth"
    };
    const price = await Moralis.Web3API.token.getTokenPrice(options);
    if (Number(price.usdPrice) >= 300 || Number(price.usdPrice) * result.value / (10 ** 18) >= 500) {
        setOutput((prev) => [
            ...prev,
            createData(result.value / 10 ** 18, result.token_name, result.sender, result.recipient)
        ]);
    }
}

async function checkETHValue(result, setOutput) {
    if (Number(result.value) >= 1 * 10 ** 18) {
        // setRows(...createData(result.value / 10 ** 18, result.sender, result.recipient));
        setOutput((prev) => [
            ...prev,
            createData(result.value / 10 ** 18, "ETH",result.sender, result.recipient)
        ]);
    }
}

async function getBlock(time) {
    let URLtime = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${time}&closest=before&apikey=${YourApiKeyToken}`;

    await axios
        .get(URLtime)
        .then((response) => {
            console.log(response.data.result);
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
}

async function fetchTransactions(setOutput) {
    setOutput([]);
    // Address of contract of interest
    console.log(`Fetching Txs For erc20`);
    let time = Math.round(d.getTime() / 1000 - 3);
    //console.log(time);
    //let blockIndex = Number(getBlock(time));
    //console.log('getblock return ' +getBlock(time));
    await getBlock(time);
    //console.log(`bstart=${blockIndex}`);

    let URL1 = `https://api.blockchair.com/ethereum/transactions?limit=100`;

    await axios
        .get(URL1)
        .then((response) => {
            console.log("num of results is " + response.data.data.length);
            let results = response.data.data;
            for (let j = 0; j < results.length; j++) {
                //if (Number(results[j].value) >= 10 * (10 ** 18)) {
                //    console.log(results[j].value / (10 ** 18) + ' of ' + results[j].token_name + ' has been sent from ' + results[j].sender + ' to ' + results[j].recipient);
                //}
                checkETHValue(results[j], setOutput);
            }
        })
        .catch((error) => {
            //console.log(error);
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });

    let URL2 = `https://api.blockchair.com/ethereum/erc-20/transactions?limit=30`;

    await axios
        .get(URL2)
        .then((response) => {
            console.log("num of results is " + response.data.data.length);
            let results = response.data.data;
            for (let j = 0; j < results.length; j++) {
                //if (Number(results[j].value) >= 10 * (10 ** 18)) {
                //    console.log(results[j].value / (10 ** 18) + ' of ' + results[j].token_name + ' has been sent from ' + results[j].sender + ' to ' + results[j].recipient);
                //}
                setTimeout(checkERC20Value, 700, results[j], setOutput);
            }
        })
        .catch(function (error) {
            //console.log(error);
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
}

function createData(eth, token, from, to) {
    return { eth, token, from, to };
}

const Whale = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        fetchTransactions(setOutput);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [rows, setOutput] = useState([]);
    const serverUrl = "https://ndmzfy2k4vne.usemoralis.com:2053/server";
    const appId = "dancwX26CjSTv88Kvgz5i1syQj4Cz7H5lP8aQpvu";
    Moralis.start({ serverUrl, appId });
    //Make the rate error disappear, but seems not working
    // Moralis.settings.setAPIRateLimit({
    //   anonymous: 10,
    //   authenticated: 20,
    //   windowMs: 60000
    // });
    return (
        <div>
            <Button aria-describedby={id} variant="contained" color="success" onClick={handleClick}>
                Get
            </Button>
            {/* <div>{output}</div> */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Value (ETH)</TableCell>
                                <TableCell align="right">Token</TableCell>
                                <TableCell align="right">From</TableCell>
                                <TableCell align="right">To&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.eth}
                                    </TableCell>
                                    <TableCell align="right">{row.token}</TableCell>
                                    <TableCell align="right">{row.from}</TableCell>
                                    <TableCell align="right">{row.to}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Popover>
            
        </div>
    );
};

export default Whale;
