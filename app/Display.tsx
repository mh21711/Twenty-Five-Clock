import { DisplayState, FormatTime } from "./Help";
import styles from "./page.module.css";
import { FaPause, FaPlay, FaUndo } from "react-icons/fa";

interface DisplayProps {
    displayState: DisplayState;
    reset: () => void;
    startStop: (displayState: DisplayState) => void;
}

const Display: React.FC<DisplayProps> = ({
    displayState,
    reset,
    startStop,
}) => {
  return (
    <div className={styles.display}>
        <h4 id="timer-label">{displayState.timeType}</h4>
        <span id="time-left" style={{ color: `${displayState.timeRunning ? "red" : "white"}`}}>{FormatTime(displayState.time)}</span>
        <div className={styles.buttons}>
            <button id="start_stop" onClick={() => startStop(displayState)}>
                {displayState.timeRunning ? <FaPause /> : <FaPlay />}
            </button>
            <button id="reset" onClick={reset}>
                <FaUndo />
            </button>
        </div>
    </div>
  )
}

export default Display;