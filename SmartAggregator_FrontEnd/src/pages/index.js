import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import { homeObjOne, homeObjThree } from '../components/InfoSection/Data';
import Footer from '../components/Footer';
import BotPackages from '../components/botPackage';
import DappPackages from '../components/dappPackage';
import AOS from 'aos';
import "aos/dist/aos.css";
import Members from '../components/Members';

export default function Home() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        AOS.init();
    }, []);

    const [firstScroll, setFirstScroll] = useState(false);

    const changeNav = () => {
        if (firstScroll === false) {
            if (window.scrollY >= 80) {
                setFirstScroll(true);
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav);
    }, [])

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            {firstScroll ? (<Navbar toggle={toggle} />) : <></>}
            <HeroSection />
            <InfoSection {...homeObjOne} />
            <DappPackages />
            <BotPackages />
            {/* <InfoSection {...homeObjThree} /> */}
            <Members />
            <Footer />
        </>
    )
}
