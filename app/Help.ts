export interface DisplayState {
    time: number;
    timeType: "Session" | "Break";
    timeRunning: boolean;
}

export const FormatTime = (time: number): string => {
    const Minutes = Math.floor(time / 60);
    const Seconds = time % 60;
    return `${Minutes < 10 ? "0" + Minutes.toString() : Minutes}:
    ${Seconds < 10 ? "0" + Seconds.toString() : Seconds}`;
}