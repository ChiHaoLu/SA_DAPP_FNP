import React from 'react';
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute } from './SidebarElements';

export default function Sidebar({ isOpen, toggle }) {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon />
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="smartContract" onClick={toggle}>Smart Contract</SidebarLink>
                <SidebarLink to="dappPackage" onClick={toggle}>Dapp Package</SidebarLink>
                <SidebarLink to="botPackage" onClick={toggle}>BOT Package</SidebarLink>
                <SidebarLink to="team" onClick={toggle}>Team</SidebarLink>
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoute to="/signin">Sign In</SidebarRoute>
            </SideBtnWrap>
        </SidebarWrapper>
    </SidebarContainer>
  )
}
