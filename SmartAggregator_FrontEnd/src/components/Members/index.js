import Icon1 from '../../images/warning.svg';
import Icon2 from '../../images/gaming.svg';
import Icon3 from '../../images/unicorn_edited.png';
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesLink, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from "./MembersElements";

import Marquee from "react-fast-marquee";

export default function Members() {
    return (
        <ServicesContainer id='team'>
            <ServicesH1>Team</ServicesH1>
            <ServicesWrapper>
            <Marquee 
                gradient={false} 
                speed={80} 
                pauseOnHover={true}
                pauseOnClick={true} 
                delay={0}
                play={true} 
                direction="left"
            >
                <ServicesCard>
                    {/* <ServicesIcon src={Icon1} /> */}
                    <ServicesH2>陸紀豪</ServicesH2>
                    <ServicesP>B08303113</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    {/* <ServicesIcon src={Icon2} /> */}
                    <ServicesH2>謝獻沅</ServicesH2>
                    <ServicesP>B07902049</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    {/* <ServicesIcon src={Icon3} /> */}
                    <ServicesH2>林治善</ServicesH2>
                    <ServicesP>B07902104</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    {/* <ServicesIcon src={Icon3} /> */}
                    <ServicesH2>趙晉杰</ServicesH2>
                    <ServicesP>B07902120</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    {/* <ServicesIcon src={Icon3} /> */}
                    <ServicesH2>游景恩</ServicesH2>
                    <ServicesP>B08303116</ServicesP>
                </ServicesCard>
            </Marquee>
            </ServicesWrapper>
            
        </ServicesContainer>
    )
}
