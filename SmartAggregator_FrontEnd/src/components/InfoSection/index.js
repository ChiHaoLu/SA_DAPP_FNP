import { LinkButton } from '../ButtonElements';
import AOS from 'aos';
import "aos/dist/aos.css";
import { InfoContainer, InfoWrapper, InfoRow, Column1, TextWrapper, TopLine, Heading, Subtitle, BtnWrap, Column2, ImgWrap, Img } from './InfoElements';
import { useEffect } from 'react';

export default function InfoSection({lightBg, id, imgStart, topLine, lightText, headline, darkText, description, buttonLabel, url, img, alt, primary, dark, dark2}) {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <InfoContainer lightBg={lightBg} id={id}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>{topLine}</TopLine>
                                <Heading lightText={lightText}>{headline}</Heading>
                                <Subtitle darkText={darkText}>{description}</Subtitle>
                                <BtnWrap>
                                    <LinkButton href={url} target='_blank' smooth={true} duration={500} spy={true} exact="true" offset={-80}
                                        primary={primary ? 1 : 0} dark={dark ? 1 : 0} dark2={dark2 ? 1 : 0}>
                                        {buttonLabel}
                                    </LinkButton>
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap data-aos="fade-left" data-aos-duration="600">
                                <Img src={img} alt={alt}/>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </>
    )
}
