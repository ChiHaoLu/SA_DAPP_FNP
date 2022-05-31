import React, { useState, useEffect, ChangeEvent } from 'react';
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")
import ABI2solidity from "../../utils/abi2solidity";

import { Button, Text } from "sancho";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';



const FunctionSys: React.FC = () => {

    const [ABI, setABI] = useState<string>('');
    const [interfaceABi, setinterface] = useState<string>('');
    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setABI(event.currentTarget.value);
        console.log(ABI)
    };
  
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div>
                    <h3>Your Contract ABI</h3>
                    <div>
                        <textarea
                            value={ABI}
                            onChange={onChange}
                            style={{
                                width: '400px',
                                height: '300px',
                                resize: "none"
                            }}
                        ></textarea>
                    </div>
                </div>
                <div
                    style={{
                        padding: '1em',
                    }}
                >
                    <Button variant="outline" intent="primary"
                        className="resource flex"
                        onClick={() => {setinterface(ABI2solidity(ABI)); }}
                    >
                        Transfer ABI To Interface
                    </Button>
                    <h3 />
                </div>
                <div>
                    <h3>Contract Interface</h3>
                    <div>
                        <textarea
                            defaultValue={interfaceABi}
                            style={{
                                width: '400px',
                                height: '200px',
                                resize: "none"
                            }}
                        ></textarea>
                    </div>
                    <h3 />
                    <Text variant="uppercase">Interface can be used in your Solidity Dapp !</Text>
                    <h4 />
                </div>

            </div>

        </div>
    );
};

export default FunctionSys;
