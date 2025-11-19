import { useValentineState } from '../hooks/useValentineState';
import { GifDisplay } from './GifDisplay';
import { Button } from './Button';
import { PHASES, NO_BUTTON_PHASES } from './constants';

const floatingEmojis = ['💖', '💕', '💗', '💝', '💓', '💞', '💟', '💌', '🌹', '✨'];

export const MainPage = () => {
  const { state, handleYes, handleNo, handleCloseInitial } = useValentineState();
  const {
    showInitialGif,
    happyPhase,
    showMessage,
    noButtonState
  } = state;

  const propose = "¿Qué dices de un plan juntos en San Valentín? 💕✨";

  return (
    <div className="container">
      <div className="animated-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="fun-shapes">
        {floatingEmojis.map((emoji, i) => (
          <div
            key={i}
            className="shape"
            style={{
              top: `${10 + (i * 8)}%`,
              left: `${5 + (i * 10)}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {showInitialGif && (
        <div className="initial-content">
          <h1 id="question" className="hello-text">
            <span className="emoji-big">👋</span>
            ¡Hola!
            <span className="emoji-big">💖</span>
          </h1>
          <GifDisplay
            type="initial"
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5lenZyZHI5OXM2eW95b3pmMG40cWVrMDhtNjVuM3A4dGNxa2g2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VM1fcpu2bKs1e2Kdbj/giphy.gif"
          />
          <button
            onClick={handleCloseInitial}
            className="continue-button"
          >
            Continuar 💕
          </button>
        </div>
      )}

      {happyPhase > 0 && (
        <div className="fade-in">
          <GifDisplay
            type="happy"
            phase={happyPhase}
            src={PHASES.HAPPY[happyPhase]}
          />
        </div>
      )}

      {showMessage && (
        <div id="messageContainer" className="fade-in">
          <div className="celebration">
            {['🎉', '🎊', '🎈', '💕', '✨'].map((emoji, i) => (
              <div
                key={i}
                className="celebration-emoji"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
          <p>¡Sabía que dirías que sí! 🎉💕✨</p>
          <h5>
            P.D: Espero que no le hayas dado click al botón rojo... aunque si lo hiciste, ¡ya es muy tarde! 😏💚
          </h5>
        </div>
      )}

      {!showMessage && !showInitialGif && (
        <>
          <h1 id="question" className="propose-text fade-in">
            {propose.split('').map((char, i) => (
              <span
                key={i}
                className="letter-bounce"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                {char}
              </span>
            ))}
          </h1>

          <div className="buttons-wrapper fade-in-delay">
            <Button
              onClick={handleYes}
              size={state.yesButtonSize}
              text="¡Sí! 💚"
            />
            <Button
              onClick={handleNo}
              size={18}
              text={NO_BUTTON_PHASES[noButtonState].text}
              isNo
            />
          </div>
        </>
      )}
    </div>
  );
};
