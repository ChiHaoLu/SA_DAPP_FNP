// 命名index.js的話，App.js裡import就只需要"import NavBar from './components/NavBar';"
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { FaBars } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll/modules';
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavBarElements';
import SignIn from '../Signin';

export default function Navbar({ toggle }) {

    const [user, setUser] = useState({
        id: ''
    });

    const [connectBool, setConnectBool] = useState(false);

    useEffect(() => {
        if (user.id === '') {}
        else {
            connect();
        }
    }, [user])

    // Login System
    const connect = () => {
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((newAccounts) => setUser({id: newAccounts[0]}));
    }

    // react scroll
    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <>
        {/* <IconContext.Provider value={{color: 'red'}}> */}
            <Nav>
                <NavbarContainer>
                    <NavLogo to='/' onClick={toggleHome}>swfLAB</NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        {/* react scroll */}
                        <NavItem>
                            <NavLinks to="smartContract" smooth={true} duration={500} spy={true} offset={-80}>Smart Contract</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="dappPackage" smooth={true} duration={500} spy={true} offset={-80}>Dapp Package</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="botPackage" smooth={true} duration={500} spy={true} offset={-80}>BOT Package</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="team" smooth={true} duration={500} spy={true} offset={-80}>Team</NavLinks>
                        </NavItem>
                    </NavMenu>
                    { (user.id == '') ? 
                        (<NavBtn>
                            <NavBtnLink onClick={() => {connect(); setConnectBool(true);}}>Sign In</NavBtnLink>
                        </NavBtn>) : 
                        (<NavBtn>
                            <NavBtnLink>{user.id.substring(0, 4) + '...' + user.id.substring(16, 20)}</NavBtnLink>
                        </NavBtn>)
                    }
                </NavbarContainer>
            </Nav>
        {/* </IconContext.Provider> */}
        </>
    )
}
