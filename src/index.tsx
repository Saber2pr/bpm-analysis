import detect from 'bpm-detective'

import React, { useRef, useState } from '@saber2pr/react'
import ReactDOM from '@saber2pr/react/lib/client'

const AudioContext = window.AudioContext || window['webkitAudioContext']
const context = new AudioContext()

const readAsAudioData = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    reader.onload = () => {
      context.decodeAudioData(reader.result, resolve, reject)
    }
    reader.onerror = () => reject(reader.result)
  })

const App = () => {
  const ref = useRef<HTMLInputElement>()
  const [result, setResult] = useState('')

  const onChange = async (event: InputEvent) => {
    const file = event.target?.['files']?.[0]
    try {
      setResult(`正在努力分析曲速，请稍等哦。。`)
      const audioData = await readAsAudioData(file)
      const bpm = detect(audioData)
      setResult(`分析成功！BPM: ${bpm}`)
    } catch (err) {
      console.error(err)
      setResult(`解析失败`)
    }
  }
  return (
    <div>
      <header>电子音乐BPM分析</header>
      <main>
        <section>
          <input ref={ref} type="file" onchange={onChange} />
        </section>
        <aside>{result}</aside>
      </main>
      <footer>
        by <a href="https://github.com/Saber2pr">saber2pr</a>
      </footer>
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
