import React from 'react';
import './Card.css';
import CardModel from '../../models/CardModel';

export default function Card({img, name, backImg, status, onClick, id}: CardModel) {
    return (
        <li className="card" onClick={() => onClick(id)}>
            {status !== 0 && <img src={img} alt={name} />}
        </li>
    )
}