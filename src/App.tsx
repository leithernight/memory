import React, { useEffect, useState } from 'react';
import './App.css';
import Desk from './components/Desk/Desk';
import Button from './components/Button/Button';


export default function App() {
  const [window, setWindow] = useState(0);
  const [size, setSize] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  function changeTheme() {
    let newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme) 
    localStorage.setItem('theme', newTheme)
  }

  function setSizeDesk(size: string) {
    setWindow(1)
    setSize(size)
  }

  if (window === 0) {
    return (
      <div className={"App " + theme}>
         <button onClick={changeTheme} className='theme'>
          <img src={'./images/' + theme + '.png'} alt="" />
        </button>
        <div className="buttons">
          <h2>Choose size</h2>
          <div>
            <Button onClick={() => setSizeDesk('sm')}>Small</Button>
            <Button onClick={() => setSizeDesk('md')}>Medium</Button>
            <Button onClick={() => setSizeDesk('lg')}>Large</Button>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className={"App " + theme}>
        <button onClick={changeTheme} className='theme'>
          <img src={'./images/' + theme + '.png'} alt="" />
        </button>
        <Desk size={size}/>
      </div>
    )
  }
};