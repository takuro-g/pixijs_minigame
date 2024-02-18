'use client'

import { Stage, Container, Sprite, useTick } from '@pixi/react'
import { Container as YContainer, useBoolean } from '@yamada-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Rectangle } from '../components/graphics'

export default function Example() {
  const i = useRef(0)

  const [isStop, { toggle: toggleIsStop }] = useBoolean(false)

  const Bunny = (props: { stop: boolean }) => {
    // states
    const [x, setX] = useState(0)
    // const [y, setY] = useState(0)
    // const [rotation, setRotation] = useState(0)

    // custom ticker
    useTick((delta) => {
      if (!props.stop) {
        i.current = i.current += 0.1 * delta
      }
      setX(Math.sin(i.current) * 400)
      // setY(Math.sin(i / 1.5) * 100)
      // setRotation(-10 + Math.sin(i / 10 + Math.PI * 2) * 10)
    })

    return (
      <Sprite
        image='https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png'
        anchor={0.5}
        x={x}
        y={0}
      />
    )
  }

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.isComposing || event.key === 'Enter') {
      toggleIsStop()
      return
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])

  return (
    <YContainer centerContent>
      <Stage width={1000} height={300} options={{ backgroundColor: 0xeef1f5 }}>
        <Container position={[500, 150]}>
          <Rectangle
            lineWidth={0}
            color={'black'}
            backgroundColor={'white'}
            width={800}
            height={100}
          />
          <Rectangle lineWidth={0} color={'red'} backgroundColor={'red'} width={100} height={100} />
          <Rectangle lineWidth={2} color={'black'} width={800} height={100} />
          <Bunny stop={isStop} />
        </Container>
      </Stage>
    </YContainer>
  )
}
