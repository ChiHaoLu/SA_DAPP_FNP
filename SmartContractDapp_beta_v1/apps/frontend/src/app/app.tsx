import React from 'react';
import { useState, useEffect } from 'react';
import CompileSmartContractDemo from '../components/CompilingSmartContactDemo';
import LoginSys from '../components/LoginSystem';
import FunctionSys from '../components/FunctionSystem';
import TestingSys from '../components/TestingSystem';
import { StyledApp } from './styled';

import { Layer, DarkMode, Toolbar, Tabs, Pager, TabPanel, Text, Tab, useTheme, Container } from 'sancho'
import { jsx } from "@emotion/core";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';


function Copyright() {

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/ChiHaoLu/">
        swfLAB - Mur**
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Body() {
  const [index, setIndex] = React.useState(0);
  const theme = useTheme();


  return (
    <Layer css={{ overflow: "hidden" }}>
      <DarkMode>
        {darkTheme => (
          <div css={{ background: darkTheme.colors.background.tint2 }}>
            <Toolbar css={{ paddingTop: theme.spaces.md }} compressed>
              <IconButton sx={{ mr: 2 }} href="https://hackmd.io/@ChiHaoLu/HyTLOaRGc" target="_blank" rel="noopener noreferrer" aria-label="home">
                <HomeIcon />
              </IconButton>
              <Text variant="h5">Smart Contract Testing System</Text>
            </Toolbar>

            <Tabs value={index} onChange={i => setIndex(i)}>
              <Tab id="you">1. Login</Tab>
              <Tab id="sports">2. Compile & Deploy</Tab>
              <Tab id="about">3. Dapp Functionality</Tab>
            </Tabs>
          </div>
        )}
      </DarkMode>

      <Pager value={index} onRequestChange={(i : any) => setIndex(i)}>
        <TabPanel id="you" className="Tab-panel">
          <LoginSys />
        </TabPanel>
        <TabPanel id="sports" className="Tab-panel">
          <Container>
            <CompileSmartContractDemo />
          </Container>
        </TabPanel>
        <TabPanel id="about" className="Tab-panel">
          <FunctionSys />
        </TabPanel>
      </Pager>
    </Layer>
  );
}

declare let window: any;
export function App(): React.ReactElement {

  return (
    <StyledApp>

      {/* App */}
      <Body />
      {/* End App */}

      {/* Footer */}
      <Box sx={{ p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          110-2 CSIE-Decentralized Applications Design and Practice Final Project
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}

    </StyledApp>
  );
}

export default App;
