import React, { useRef } from "react";
import CButton from "../../components/CButton";
import PicturesCard from "../../components/PicturesCard";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { SlArrowDown } from "react-icons/sl";
import { cardsContent } from "../../utils/getStartedCardContent";

const GetStarted = () => {
    const themedStyles = useThemedStyles();
    const gamesToday = 18392697;
    const playingNow = 145925;
    const firstCardRef = useRef<HTMLDivElement>(null);

    const handleLearnMoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (firstCardRef.current) {
            const rect = firstCardRef.current.getBoundingClientRect();
            const scrollOffset = rect.top + window.scrollY - (window.innerHeight - rect.height);
            window.scrollTo({ top: scrollOffset, behavior: "smooth" });
        }
    };

    return (
        <div
            className={`container-fluid ${themedStyles.backgroundClass} ${themedStyles.textClass}`}
            style={themedStyles.inlineStyles}
        >
            <div className="d-flex justify-content-center mb-4 text-uppercase">
                <div className="me-4">
                    <strong>{playingNow.toLocaleString()}</strong> Playing Now
                </div>
                <div>
                    <strong>{gamesToday.toLocaleString()}</strong> Games Today
                </div>
            </div>

            <div className="main-section">
                <div className="row justify-content-center align-items-center text-center text-md-start">
                    <div className="col-12 col-md-6 d-flex justify-content-center mb-4 mb-md-0">
                        <img
                            src="assets/images/chess-pieces.png"
                            alt="Chess pieces"
                            className="img-fluid chess-image"
                        />
                    </div>

                    <div className="col-12 col-md-4 d-flex flex-column align-items-center align-items-md-start">
                        <h2 className="fw-bold mb-4 display-5">
                            Play chess.<br />
                            Improve your game.<br />
                            Have fun!
                        </h2>
                        <CButton link="/connect" text="Get Started" />
                    </div>
                </div>
            </div>

            <div className="text-center mt-5 d-flex flex-row justify-content-center">
                <a
                    onClick={handleLearnMoreClick}
                    className="text-decoration-none text-white d-flex flex-column align-items-center"
                >
                    <div className="fw-bold">Learn More</div>
                    <div className="arrow-down">
                        <SlArrowDown />
                    </div>
                </a>
            </div>

            {cardsContent.map((cardContent, index) => (
                <div
                    key={cardContent.id}
                    id={cardContent.id}
                    ref={index === 0 ? firstCardRef : undefined}
                >
                    <PicturesCard
                        imgLink={cardContent.img}
                        imgAlt={cardContent.imgAlt}
                        text={cardContent.text}
                        haveButtons={cardContent.haveButtons}
                        buttonLink={cardContent.buttonLink}
                        buttonText={cardContent.buttonText}
                    />
                </div>
            ))}

            <h3 className="d-flex justify-content-center">
                Emportez vos parties et votre entraînement partout avec vous avec nos apps mobiles.
            </h3>
            <div className="d-flex justify-content-center">

            </div>

            <h1 className="d-flex justify-content-center">
                Apprenez, jouez et amusez-vous
            </h1>

            <div className="d-flex justify-content-center"> <CButton link="#" text="Commencer"></CButton></div>
        </div>
    );
};

export default GetStarted;
