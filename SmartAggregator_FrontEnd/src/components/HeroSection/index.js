import { useState } from 'react'
import Video from '../../videos/video.mp4';
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight } from './HeroElements';
import { HeroButton } from '../ButtonElements';

export default function HeroSection() {

    const [hover, setHover] = useState(false);
    const onHover = () => {
        setHover(!hover);
    }

    return (
        <HeroContainer id="home">
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>
            <HeroContent>
                <HeroH1>Smart Aggregator</HeroH1>
                <HeroP>
                    A Decentralized Application which is similar with Remix IDE and some other Dev. Tools.
                </HeroP>
                <HeroBtnWrapper>
                    <HeroButton onMouseEnter={onHover} onMouseLeave={onHover} primary="true" dark="true"
                        smooth={true} duration={500} spy={true} offset={-80} onClick={() => {window.open('https://hackmd.io/@ChiHaoLu/HyTLOaRGc')}}>
                        <b>White Paper</b> { hover ? <ArrowForward />  : <ArrowRight /> }
                    </HeroButton>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}
