import { createBrowserRouter } from "react-router-dom"
import { Home } from "../pages/Home"
import { About } from "../pages/About"
import { Profile } from "../pages/Profile"
import { Super } from "../pages/ChildrenApi"
import { Foo } from "../pages/Foo"
import { Baz } from "../pages/Baz"
import Bazz from "../pages/Bazz"
import { Bar } from "../pages/Bar"
import { Key } from "../pages/Key"
import { SuperAdd } from "../pages/Add"
import { CountDown } from "../pages/CountDown"
import { Smile } from "../pages/Smile"
import { GestureAndSpring } from "../pages/GestureAndSpring"
import { Poker } from "../pages/poker/Poker"
import { Message } from "../pages/Message"
import { SlidePage } from "../pages/SlidePage"
import { PopoverPage } from "../pages/PopoverPage"
import { OnBoardingPage } from "../pages/OnBoarding"
import { ColorPickerPage } from "../pages/ColorPicker"
import { FormPage } from "../pages/FromPage"
import { ZustandPage } from "../pages/ZustandPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/childrenApi",
    element: <Super />
  },
  {
    path: "/foo",
    element: <Foo />
  },
  {
    path: "/baz",
    element: <Baz />
  },
  {
    path: "/bazz",
    element: <Bazz />
  },
  {
    path: "bar",
    element: <Bar />
  },
  {
    path: "key",
    element: <Key />
  },
  {
    path: "add",
    element: <SuperAdd />
  },
  {
    path: "countDown",
    element: <CountDown />
  },
  {
    path: "smile",
    element: <Smile />
  },
  {
    path: "gestureAndSpring",
    element: <GestureAndSpring />
  },
  {
    path: "poker",
    element: <Poker />
  },
  {
    path: "message",
    element: <Message />
  },
  {
    path: "slidePage",
    element: <SlidePage />
  },
  {
    path: "popover",
    element: <PopoverPage />
  },
  {
    path: "onBoarding",
    element: <OnBoardingPage />
  },
  {
    path: "ColorPickerPage",
    element: <ColorPickerPage />
  },
  {
    path: "FormPage",
    element: <FormPage />
  },
  {
    path: "ZustandPage",
    element: <ZustandPage />
  }
])