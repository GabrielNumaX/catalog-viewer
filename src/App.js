/** @jsx jsx */
import { useState, useEffect, useRef } from 'react'
import { css, jsx } from '@emotion/core'
import SliderContent from './components/SliderContent'
import Slide from './components/Slide'
import Arrow from './components/Arrow'
import Dots from './components/Dots'

const getWidth = () => window.innerWidth


const App = props => {
  const autoPlayRef = useRef()
  const transitionRef = useRef()
  const resizeRef = useRef()

  const { slides } = props

  const firstSlide = slides[0]
  const secondSlide = slides[1]
  const lastSlide = slides[slides.length - 1]

  const [state, setState] = useState({
    activeSlide: 0,
    translate: getWidth(),
    transition: 0.45,
    _slides: [lastSlide, firstSlide, secondSlide]
  })

  const { activeSlide, translate, _slides, transition } = state

  useEffect(() => {
    transitionRef.current = smoothTransition
    resizeRef.current = handleResize
    autoPlayRef.current = props.autoPlay ? nextSlide : null
  })

  // Reactivate the transition that is removed in smoothTransition.
  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45 })
  }, [transition, state])

  // AutoPlay
  useEffect(() => {
    if (props.autoPlay) {
      const play = () => {
        autoPlayRef.current()
      }

      const interval = setInterval(play, props.autoPlay * 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [props.autoPlay])

  // Smooth transitions and browser resizing.
  useEffect(() => {
    const smooth = e => {
      if (e.target.className.includes('SliderContent')) {
        transitionRef.current()
      }
    }

    const resize = () => {
      resizeRef.current()
    }

    const transitionEnd = window.addEventListener('transitionend', smooth)
    const onResize = window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('transitionend', transitionEnd)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const handleResize = () => {
    setState({ ...state, translate: getWidth(), transition: 0 })
  }

  const smoothTransition = () => {
    let _slides = []


    if (activeSlide === slides.length - 1)
      _slides = [slides[slides.length - 2], lastSlide, firstSlide]

    else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide]
 
    else _slides = slides.slice(activeSlide - 1, activeSlide + 2)

    setState({
      ...state,
      _slides,
      transition: 0,
      translate: getWidth()
    })
  }

  const hasAutoPlayBeenStopped = e => {
    if (e && autoPlayRef.current && e.target.className.includes('Arrow')) {
      props.stopAutoPlay()
      autoPlayRef.current = null
    }
  }

  const nextSlide = e => {
    hasAutoPlayBeenStopped(e)

    setState({
      ...state,
      translate: translate + getWidth(),
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1
    })
  }

  const prevSlide = e => {
    hasAutoPlayBeenStopped(e)

    setState({
      ...state,
      translate: 0,
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1
    })
  }

  return (
    <div css={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * _slides.length}
      >
        {_slides.map((_slide, i) => (
          <Slide width={'100%'} key={_slide + i} content={_slide} />
        ))}
      </SliderContent>

      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />

      <Dots slides={slides} activeSlide={activeSlide} />
    </div>
  )
}

const SliderCSS = css`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
`

export default App;
