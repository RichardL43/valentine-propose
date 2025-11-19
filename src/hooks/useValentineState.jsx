import { useState } from "react";
import { NO_BUTTON_PHASES, PHASES } from "../components/constants";

export const useValentineState = () => {
  const [state, setState] = useState({
    showInitialGif: true,
    happyPhase: 0,
    sadPhase: 0,
    showMessage: false,
    noButtonState: 0,
    yesButtonSize: 18,  // Tamaño inicial del botón Sí
  });

  const handleYes = () => {
    setState(prev => ({
      ...prev,
      showInitialGif: false,
      sadPhase: 0,
      showMessage: true,
      happyPhase: 1
    }));

    [].forEach((delay, index) => {
      setTimeout(() => {
        setState(prev => ({ ...prev, happyPhase: index + 2 }));
      }, delay);
    });
  };

  const handleNo = () => {
    setState(prev => {
      const nextPhaseIndex = (prev.noButtonState + 1) % NO_BUTTON_PHASES.length;
      
      // El botón "Sí" crece más cada vez que se presiona "No"
      const newYesButtonSize = prev.yesButtonSize + 12;

      return {
        ...prev,
        noButtonState: nextPhaseIndex,
        yesButtonSize: newYesButtonSize,
        sadPhase: Math.min(3, Math.floor(nextPhaseIndex / 5) + 1)
      };
    });
  };

  const handleCloseInitial = () => {
    setState(prev => ({
      ...prev,
      showInitialGif: false
    }));
  };

  return { state, handleYes, handleNo, handleCloseInitial };
};