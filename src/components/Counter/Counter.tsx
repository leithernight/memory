import React from "react";
import "./Counter.css";

interface CounterProps {
    value: number
}

export default function Counter({value}: CounterProps) {
    return (
        <div>
            <p>Moves: {value}</p>
        </div>
    )
}