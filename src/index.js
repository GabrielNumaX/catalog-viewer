import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import images from './images'

const Autoplay = () => {
  const [autoPlay, setAutoPlay] = useState(3)

  const stopAutoPlay = useCallback(() => {
    setAutoPlay(0)
  }, [])

  return (
    <App slides={images} autoPlay={autoPlay} stopAutoPlay={stopAutoPlay} />
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Autoplay />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
