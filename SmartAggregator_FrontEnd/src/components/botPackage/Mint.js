import React, { useState } from "react";
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

const apiKey = "TVQ7CXSAVS8VYXHC84PGFA3I8A618IMQYQ";
const d = new Date();

async function checkMinting(results, setOutput) {
    var done = new Array(results.length);
    for (let i = 0; i < results.length; i++) {
        // console.log("result = " + i);
        if (
            done[i] !== 1 &&
            results[i].from === "0x0000000000000000000000000000000000000000"
        ) {
            done[i] = 1;
            let count = 1;
            //Check the whole result list to calculate the number of minting event from the same person(results[i].to).
            for (let t = i + 1; t < results.length; t++) {
                if (results[t].contractAddress === results[i].contractAddress) {
                    count++;
                    done[t] = 1;
                }
            }
            //If the same person minted NFT more than 30 times in the past 10 minutes, we print alert.
            if (count >= 30) {
                // setOutput((prev) => [
                //     ...prev,
                //     results[i].tokenName +
                //     " have been minted " +
                //     count +
                //     " times in the last 10 minutes."
                // ]);
                // setOutput((prev) => [
                //     ...prev,
                //     "The contact address of " +
                //     results[i].tokenName +
                //     " is " +
                //     results[i].contractAddress
                // ]);
                // setOutput((prev) => [
                //     ...prev,
                //     "The URL is https://opensea.io/assets/" +
                //     results[i].contractAddress +
                //     "/1"
                // ]);
                setOutput((prev) => [
                    ...prev,
                    createData(results[i].tokenName, results[i].contractAddress, count, "https://opensea.io/assets/" + results[i].contractAddress + "/1")]);
            }
        }
    }
}

async function fetchMinting(setOutput) {
    setOutput([]);
    //In order to check minting event, we check ERC721 token transfer event from address 0.
    const proxyAddr = `0x0000000000000000000000000000000000000000`;
    //Get current time
    let time = Math.round(d.getTime() / 1000 - 3);
    let blockIndex;
    console.log("time = " + time);
    const URL1 = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${time}&closest=before&apikey=${apiKey}`;

    await axios
        .get(URL1)
        .then((response) => {
            blockIndex = response.data.result;
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    const URL2 = `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${proxyAddr}&startblock=${blockIndex - 50
        }&endblock=${blockIndex - 1}&sort=asc&apikey=${apiKey}`;

    //Get all the minting event in the last 11 mins.
    await axios
        .get(URL2)
        .then((response) => {
            checkMinting(response.data.result, setOutput);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
}

function createData(token, addr, cnt, os) {
    return { token, addr, cnt, os };
}

const Mint = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        fetchMinting(setOutput);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [rows, setOutput] = useState([]);
    
    return (
        <div>

            <Button aria-describedby={id} variant="contained" color="success" onClick={handleClick}>
                Get
            </Button>
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
                                <TableCell>NFT</TableCell>
                                <TableCell align="right">Contract Address</TableCell>
                                <TableCell align="right">Minted Num</TableCell>
                                <TableCell align="right">Opensea&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.token}
                                    </TableCell>
                                    <TableCell align="right">{row.addr}</TableCell>
                                    <TableCell align="right">{row.cnt}</TableCell>
                                    <TableCell align="right"><a href={row.os} target="_blank">Link</a></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Popover>
        </div>
        
    );
};

export default Mint;
