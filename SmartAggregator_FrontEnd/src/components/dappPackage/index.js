import Icon1 from '../../images/dream_world.svg';
import Icon2 from '../../images/web_develop.svg';
import Icon3 from '../../images/react.svg';
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesLink, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from "./ServicesElements";
import AOS from 'aos';
import "aos/dist/aos.css";
import { useEffect } from 'react';
import Swap from "./Swap";

export default function DappPackages() {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <ServicesContainer id='dappPackage'>
            <ServicesH1>Dapp Package</ServicesH1>
            <ServicesWrapper>
                <ServicesLink href='https://mollyy0514.github.io/NFT_Verification_System/' target='_blank'>
                    <ServicesCard data-aos="fade-right" data-aos-duration="600">
                        <ServicesIcon src={Icon1} />
                        <ServicesH2>NFT Verify System</ServicesH2>
                        <ServicesP>Help verifying NFT owners as well as simplifying the methods.</ServicesP>
                    </ServicesCard>
                </ServicesLink>
                <ServicesLink href="https://github.com/Web3Modal/web3modal" target='_blank'>
                    <ServicesCard data-aos="fade-up" data-aos-duration="600">
                        <ServicesIcon src={Icon2} />
                        <ServicesH2>Login System</ServicesH2>
                        <ServicesP>There are many ways to begin your WEB3 project! Powered by web3modal</ServicesP>
                    </ServicesCard>
                </ServicesLink>
                {/* <ServicesLink href="https://app.uniswap.org/#/swap?chain=mainnet" target='_blank'> */}
                    <ServicesCard data-aos="fade-left" data-aos-duration="600">
                        <ServicesIcon src={Icon3} />
                        <ServicesH2>Swap System</ServicesH2>
                        <ServicesP>Support ERC20 Token Swap. Powered by UniSwap V3.</ServicesP>
                        <Swap />
                    </ServicesCard>
                {/* </ServicesLink> */}
            </ServicesWrapper>
        </ServicesContainer>
    )
}
