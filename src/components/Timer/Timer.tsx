import React from "react";


interface TimerProps {
  time: number
}

export default function Timer({time}: TimerProps) {
    return (
        <div className="timer">
            <p>{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
        </div>
    )
}