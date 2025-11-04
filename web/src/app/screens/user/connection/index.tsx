import CButton from "../../../components/CButton";
import LogoButton from "../../../components/LogoButton";
import { useThemedStyles } from "../../../hooks/useThemedStyles";

const Connection = () => {
    const themedStyles = useThemedStyles();
    return (
        <div
            className={`container-fluid ${themedStyles.backgroundClass} ${themedStyles.textClass}`}
            style={themedStyles.inlineStyles}
        >
            <div className="d-flex justify-content-center align-items-center">
                <div className="shadow-sm" style={{ maxWidth: "400px" }}>
                    <div className="d-flex justify-content-between mb-4">
                        <LogoButton />
                        <a href="/login" className="text-decoration-none text-white align-self-center">
                            Se connecter
                        </a>
                    </div>

                    <div className="text-center mb-4">
                        <img src="assets/images/pawn-on-board.svg" className="img-fluid" alt="Pawn on board" />
                    </div>
                    <div className="d-flex juctify-content-center flex-column">
                        <CButton link='/register' text="Continuer avec une adresse mail" icon="mail"></CButton>

                        <hr className="my-3" style={{ backgroundColor: "#6c757d", opacity: "0.2" }} />

                        <CButton link="/" text="Continuer avec un téléphone" icon="phone" color="black"></CButton>
                        <CButton link="/" text="Continuer avec Google" icon="google" color="black"></CButton>
                        <CButton link="/" text="Continuer avec Apple" icon="apple" color="black"></CButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Connection;