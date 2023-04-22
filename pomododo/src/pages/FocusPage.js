import React, { useState, useEffect } from 'react';

function FocusPage() {
  const [timeRemaining, setTimeRemaining] = useState(60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('study');

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let interval;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && timeRemaining === 0) {
      setMode((prevMode) => (prevMode === 'study' ? 'break' : 'study'));
      setTimeRemaining(mode === 'study' ? 30 : 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, mode]);

  useEffect(() => {
    setMode('study');
    setTimeRemaining(60);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    document.title = `${mode === 'study' ? 'Study' : 'Break'} - ${Math.floor(timeRemaining / 60)
      .toString()
      .padStart(2, '0')}:${(timeRemaining % 60).toString().padStart(2, '0')}`;
  }, [mode, timeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const circleProgress = {
    backgroundColor: '#1f1f1f',
    borderRadius: '50%',
    width: '200px',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  };

  const circleText = {
    fontSize: '4em',
    fontWeight: 'bold',
    color: '#fff'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: mode === 'study' ? '#e84c3d' : '#a7c957', color: '#fff' }}>
      <h1 style={{ marginBottom: 10 }}>{mode === 'study' ? 'Study' : 'Break'}</h1>
      <div style={circleProgress}>
        <p style={circleText}>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </p>
      </div>
      <div style={{ marginTop: '2em'}}>
        <button onClick={toggleTimer} style={{ padding: '0.5em 2em', borderRadius: '5px', border: 'none', backgroundColor: '#fff', color: '#1f1f1f', fontWeight: 'bold', cursor: 'pointer' }}>{isRunning ? 'Pause' : 'Start'}</button>
      </div>
    </div>
  );  
}

export default FocusPage;