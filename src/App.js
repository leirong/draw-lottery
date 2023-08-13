import "./App.css"
import { LuckyGrid } from "@lucky-canvas/react"
import { useEffect, useRef, useState } from "react"
import bgm from "./haoyunlai.mp3"

const blocks = [
  { padding: "10px", background: "#FD9F0C" },
  { padding: "10px", background: "#FFEB8B" },
]
const prizes = [
  { x: 0, y: 0, fonts: [{ text: "请我吃好吃的", top: "20%" }] },
  { x: 1, y: 0, fonts: [{ text: "给我买零食", top: "20%" }] },
  { x: 2, y: 0, fonts: [{ text: "朋友圈道歉", top: "20%" }] },
  { x: 3, y: 0, fonts: [{ text: "任选一个", top: "20%" }] },
  { x: 3, y: 1, fonts: [{ text: "转账520", top: "20%" }] },
  { x: 3, y: 2, fonts: [{ text: "买新衣服", top: "20%" }] },
  { x: 3, y: 3, fonts: [{ text: "一只口红", top: "20%" }] },
  { x: 3, y: 4, fonts: [{ text: "大喊一声", top: "20%" }] },
  { x: 2, y: 4, fonts: [{ text: "全部来一次", top: "20%" }] },
  { x: 1, y: 4, fonts: [{ text: "打屁股52下", top: "20%" }] },
  { x: 0, y: 4, fonts: [{ text: "跪下唱征服", top: "20%" }] },
  { x: 0, y: 3, fonts: [{ text: "再转一次", top: "20%" }] },
  { x: 0, y: 2, fonts: [{ text: "一包小浣熊", top: "20%" }] },
  { x: 0, y: 1, fonts: [{ text: "请我喝奶茶", top: "20%" }] },
]
function App() {
  const [buttons] = useState([
    {
      x: 1.5,
      y: 2,
      background: "red",
      fonts: [{ text: "开始", top: "25%" }],
    },
  ])

  const [width, setWidth] = useState("100vw")
  const [height, setHeight] = useState("100vw")
  const [bgmStatus, setBgmStatus] = useState(0)

  const myLucky = useRef()

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const handleWindowResize = () => {
    const { innerWidth } = getWindowSize()
    if (innerWidth > 1024) {
      setWidth("500px")
      setHeight("500px")
    } else {
      setWidth("100vw")
      setHeight("100vw")
    }
  }
  useEffect(() => {
    handleWindowResize()

    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
    // eslint-disable-next-line
  }, [])

  const audioRef = useRef(null)

  const playAudio = () => {
    if (bgmStatus) {
      setBgmStatus(0)
      audioRef.current.pause()
      return
    }
    setBgmStatus(1)
    audioRef.current.play()
  }

  return (
    <div className="App">
      <div className="lucky-grid-box">
        <audio src={bgm} ref={audioRef} />
        <div
          className={`bgm ${bgmStatus ? "open" : "close"}`}
          onClick={playAudio}
        ></div>
        <div className="title">男朋友犯错后的惩罚</div>
        <LuckyGrid
          ref={myLucky}
          width={width}
          height={height}
          className="lucky-grid"
          blocks={blocks}
          prizes={prizes}
          buttons={buttons}
          onStart={() => {
            // 点击抽奖按钮会触发star回调
            myLucky.current.play()
            setTimeout(() => {
              const index = (Math.random() * 6) >> 0
              myLucky.current.stop(index)
            }, 2500)
          }}
          onEnd={(prize) => {
            // 抽奖结束会触发end回调
            alert("恭喜你抽到奖品 【" + prize.fonts[0].text + "】")
          }}
          rows={5}
          cols={4}
          defaultConfig={{
            speed: 20,
          }}
          defaultStyle={{
            background: "#FF9C12",
          }}
        />
      </div>
    </div>
  )
}

export default App
