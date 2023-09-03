import { useState } from 'react'
import { Button } from "antd"
import './App.scss'
import { HighlightOutlined } from '@ant-design/icons'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button type='primary' onClick={() => setCount((count) => count + 1)}>
        <HighlightOutlined />
        count is {count}
      </Button>

    </>
  )
}

export default App
