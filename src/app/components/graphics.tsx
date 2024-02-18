import { Graphics as GraphicsComponent } from '@pixi/react'
import { ColorSource, Graphics } from 'pixi.js'
import { useCallback } from 'react'

type RectangleProps = {
  lineWidth: number
  lineColor: ColorSource
  color?: ColorSource
  width: number
  height: number
  position: number[]
}

export const Rectangle = (props: RectangleProps) => {
  const { lineWidth, lineColor, color, width, height, position } = props
  const draw = useCallback(
    (g: Graphics) => {
      g.clear()
      if (color !== undefined) {
        g.beginFill(color)
      }
      g.lineStyle(lineWidth, lineColor)
      g.drawRect(position[0], position[1], width, height)
    },
    [props],
  )

  return <GraphicsComponent draw={draw} />
}
