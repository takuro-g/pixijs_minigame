import { Graphics as GraphicsComponent } from '@pixi/react'
import { ColorSource, Graphics } from 'pixi.js'
import { useCallback } from 'react'

type RectangleProps = {
  lineWidth: number
  color: ColorSource
  backgroundColor?: ColorSource
  width: number
  height: number
}

export const Rectangle = (props: RectangleProps) => {
  const { lineWidth, color, backgroundColor, width, height } = props
  const draw = useCallback(
    (g: Graphics) => {
      g.clear()
      if (backgroundColor !== undefined) {
        g.beginFill(backgroundColor)
      }
      g.lineStyle(lineWidth, color)
      g.drawRect((width / 2) * -1, (height / 2) * -1, width, height)
    },
    [props],
  )

  return <GraphicsComponent draw={draw} />
}
