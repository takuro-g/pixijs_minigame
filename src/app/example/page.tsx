'use client'

import { Stage, Container, Text, useTick } from '@pixi/react'
import { Box, Button, ButtonGroup, Flex, Container as YContainer } from '@yamada-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Rectangle } from '../components/graphics'
import { TextStyle } from 'pixi.js'

export default function Example() {
  let i = useRef(0)

  const [isStop, setIsStop] = useState(false)
  const [targetX, setTargetX] = useState(100)
  const [pointerX, setPointerX] = useState(0)

  const [result, setResult] = useState('')

  useEffect(() => {
    const randomX = 100 + Math.floor(Math.random() * 600)
    setTargetX(randomX)
  }, [])

  const Pointer = () => {
    // custom ticker
    useTick((delta) => {
      if (!isStop) {
        i.current += 0.05 * delta
      }
      setPointerX(Math.sin(i.current) * 395)
    })
    return (
      <Rectangle
        lineWidth={0}
        lineColor={'black'}
        color={'black'}
        width={10}
        height={100}
        position={[495 + pointerX, 100]}
      />
    )
  }

  return (
    <YContainer centerContent>
      <Stage width={1000} height={300} options={{ backgroundColor: 0xeef1f5 }}>
        <Container position={[0, 0]}>
          <Text
            text={
              result === 'GOOD!'
                ? '🙂'
                : result === 'GREAT!!'
                  ? '😂'
                  : result === 'BAD…'
                    ? '🥺'
                    : '😐'
            }
            x={10}
            y={10}
            style={
              new TextStyle({
                fontSize: 48,
              })
            }
          />
          <Rectangle
            lineWidth={0}
            lineColor={'black'}
            color={'#CCFFFF'}
            width={800}
            height={100}
            position={[100, 100]}
          />
          <Rectangle
            lineWidth={0}
            lineColor={'orange'}
            color={'orange'}
            width={200}
            height={100}
            position={[targetX, 100]}
          />
          <Rectangle
            lineWidth={0}
            lineColor={'red'}
            color={'red'}
            width={50}
            height={100}
            position={[targetX + 75, 100]}
          />
          <Rectangle
            lineWidth={4}
            lineColor={'black'}
            width={800}
            height={100}
            position={[100, 100]}
          />
          <Pointer />
        </Container>
      </Stage>
      <Flex height={20} fontWeight='bold' fontSize={40} alignItems={'center'}>
        {result}
      </Flex>
      <ButtonGroup gap='sm' size='lg'>
        <Button
          type='button'
          colorScheme='red'
          onClick={() => {
            setIsStop(true)
            const pointer = 495 + pointerX
            setResult(
              targetX + 75 <= pointer && pointer <= targetX + 125 - 10
                ? 'GREAT!!'
                : targetX <= pointer && pointer <= targetX + 200 - 10
                  ? 'GOOD!'
                  : 'BAD…',
            )
          }}
        >
          Stop
        </Button>
        <Button
          type='button'
          disabled={!isStop}
          onClick={() => {
            const randomX = 100 + Math.floor(Math.random() * 600)
            setTargetX(randomX)
            i.current = 0
            setIsStop(false)
            setResult('')
          }}
        >
          Reset
        </Button>
      </ButtonGroup>
    </YContainer>
  )
}
