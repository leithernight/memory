import React from "react";
import './Button.css';

interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
}

export default function Button({children, onClick}: ButtonProps) {
    return <button className="size" onClick={onClick}>{children}</button>
}