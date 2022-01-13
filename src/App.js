import { useEffect, useState } from 'react'
import DragNDrop from './components/DragNDrop'

const defaultData = [
  { title: 'Fruits', items: ['Apple', 'Orange', 'Banana'] },
  { title: 'Vegetables', items: ['Carrot', 'Potato', 'Tomato'] },
  { title: 'Animals', items: ['Cat', 'Dog', 'Bird'] },
]

function App() {
  const [data, setData] = useState()
  useEffect(() => {
    if (localStorage.getItem('list')) {
      console.log('localStorage exist')
      setData(JSON.parse(localStorage.getItem('list')))
    } else {
      console.log('localStorage not exist')
      setData(defaultData)
    }
  }, [])
  return data ? (
    <div className="App">
      <header className="App-header">
        {console.log(data)}
        <DragNDrop data={data} />
      </header>
    </div>
  ) : null
}

export default App
