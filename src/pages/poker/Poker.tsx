import { useState } from "react"
import card1 from "../../assets/poker/RWS_Tarot_01_Magician.jpg"
import card2 from "../../assets/poker/RWS_Tarot_02_High_Priestess.jpg"
import card3 from "../../assets/poker/RWS_Tarot_07_Chariot.jpg"
import card4 from "../../assets/poker/RWS_Tarot_08_Strength.jpg"
import card5 from "../../assets/poker/RWS_Tarot_16_Tower.jpg"
import { animated, useSprings, to as interpolate } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"
import s from "./Poker.module.scss"

const cards = [card1, card2, card3, card4, card5]

const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export const Poker: React.FC = () => {
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, api] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  })) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.2 // If you flick hard enough it should trigger the card to fly out
    if (!active && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    api.start(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = active ? 1.1 : 1 // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
      }
    })
    if (!active && gone.size === cards.length)
      setTimeout(() => {
        gone.clear()
        api.start(i => to(i))
      }, 600)
  })
  console.log(props, "props")
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div h-screen flex items-center justify-center bg-blue-3>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div
          key={i}
          style={{ x, y }}
          absolute w-300px h-200px touch-none flex items-center justify-center
        >
          <animated.div
            className={s.hover}
            touch-none h-85vh w-45vw max-w-300px max-h-570px bg-white bg-center-center bg-no-repeat will-change-transform rounded-10px 
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${cards[i]})`,
              backgroundSize: "auto 85%"
            }}
          />
        </animated.div>
      ))}
    </div>
  )
}
