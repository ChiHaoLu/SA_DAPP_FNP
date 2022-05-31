import Icon1 from '../../images/warning.svg';
import Icon2 from '../../images/gaming.svg';
import Icon3 from '../../images/unicorn_edited.png';
import Celebrity from "./Celebrity";
import Mint from "./Mint";
import Whale from "./Whale";
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesLink, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from "./ServicesElements";

export default function BotPackages() {
    return (
        <ServicesContainer id='botPackage'>
            <ServicesH1>BOT Package</ServicesH1>
            <ServicesWrapper>
                <ServicesCard data-aos="fade-right" data-aos-duration="600">
                    <ServicesIcon src={Icon1} />
                    <ServicesH2>Whale Alert</ServicesH2>
                    <ServicesP>Where is the Whale?</ServicesP>
                    <Whale />
                    <ServicesP />
                </ServicesCard>
                <ServicesCard data-aos="fade-up" data-aos-duration="600">
                    <ServicesIcon src={Icon2} />
                    <ServicesH2>Minted Track</ServicesH2>
                    <ServicesP>Who is the hottest NFT?</ServicesP>
                    <Mint />
                    <ServicesP />
                </ServicesCard>
                <ServicesCard data-aos="fade-left" data-aos-duration="600">
                    <ServicesIcon src={Icon3} />
                    <ServicesH2>Celebrity Track</ServicesH2>
                    <ServicesP>A heavy hitter comes!</ServicesP>
                    <Celebrity />
                    <ServicesP />
                </ServicesCard>
            </ServicesWrapper>
        </ServicesContainer>
    )
}
