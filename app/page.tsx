"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { DisplayState } from "./Help";
import TimeSetter from "./TimeSetter";
import Display from "./Display";

const DefaultBreakTime = 5 * 60;
const DefaultSessionTime = 25 * 60;
const Min = 60;
const Max = 60 * 60;
const Interval = 60;

function Home() {
  const [BreakTime, SetBreakTime] = useState(DefaultBreakTime);
  const [SessionTime, SetSessionTime] = useState(DefaultSessionTime);
  const [DisplayState, SetDisplayState] = useState<DisplayState>({
    time: SessionTime,
    timeType: "Session",
    timeRunning: false,
  })
  useEffect(() => {
    let TimerId: number;
    if (!DisplayState.timeRunning) return;
    if (DisplayState.timeRunning) {
      TimerId = window.setInterval(DecremenatChange, 1000)
    }

    return () => {
      window.clearInterval(TimerId);
    }
  }, [DisplayState.timeRunning])
  useEffect(() => {
    if (DisplayState.time === 0) {
      const Audio = document.getElementById("beep") as HTMLAudioElement;
      Audio.play().catch((err) => console.log(err));
      Audio.currentTime = 2;
      SetDisplayState((prev) => ({
        ...prev,
        timeType: prev.timeType === "Session" ? "Break" : "Session",
        time: prev.timeType === "Session" ? BreakTime : SessionTime,
      }))
    }
  }, [DisplayState, BreakTime, SessionTime]);
  const reset = () => {
    SetSessionTime(DefaultSessionTime);
    SetBreakTime(DefaultBreakTime);
    SetDisplayState({
      time: SessionTime,
      timeType: "Session",
      timeRunning: false,
    })
    const Audio = document.getElementById("beep") as HTMLAudioElement;
    Audio.pause();
    Audio.currentTime = 0;
  }
  const startStop = () => {
    SetDisplayState((prev) => ({
      ...prev,
      timeRunning: !prev.timeRunning
    }))
  }
  const ChangeBreakTime = (time: number) => {
    if (DisplayState.timeRunning) return;
    SetBreakTime(time);
  }
  const ChangeSessionTime = (time: number) => {
    if (DisplayState.timeRunning) return;
    SetSessionTime(time);
    SetDisplayState({
      time: time,
      timeType: "Session",
      timeRunning: false,
    })
  }
  const DecremenatChange = () => {
    SetDisplayState((prev) => ({
      ...prev,
      time: prev.time - 1,
    }))
  }
  return (
    <div className={styles.clock}>
      <div className={styles.setters}>
        <div className={styles.break}>
          <h4 id="break-label">Break Lengh</h4>
          <TimeSetter 
            type="break" 
            min={Min} 
            max={Max} interval={Interval}
            time={BreakTime}
            setTime={ChangeBreakTime}
          />
        </div>
        <div className={styles.session}>
          <h4 id="session-label">Session Lengh</h4>
          <TimeSetter
            type="session" 
            min={Min} 
            max={Max} interval={Interval}
            time={SessionTime}
            setTime={ChangeSessionTime}   
          />
        </div>
      </div>
      <Display
        displayState={DisplayState}
        reset={reset}
        startStop={startStop}
       />
       <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
}

export default Home;
