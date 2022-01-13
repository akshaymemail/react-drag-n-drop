import React, { useState } from 'react'
import { useRef } from 'react/cjs/react.development'

function DragNDrop({ data }) {
  const [list, setList] = useState(data)
  const [dragging, setDragging] = useState(false)
  const dragItem = useRef()
  const dragNode = useRef()

  const onDragStartHandler = (e, params) => {
    console.log('dragstart', params)
    dragItem.current = params
    dragNode.current = e.target
    dragNode.current.addEventListener('dragend', handleDragEnd)
    setTimeout(() => {
      setDragging(true)
    }, 0)
  }

  const onDragEnterHandler = (e, params) => {
    const currentItem = dragItem.current
    if (dragNode.current !== e.target) {
      setList((oldList) => {
        const newList = JSON.parse(JSON.stringify(oldList))
        newList[params.groupIndex].items.splice(
          params.itemIndex,
          0,
          newList[currentItem.groupIndex].items.splice(
            currentItem.itemIndex,
            1
          )[0]
        )
        dragItem.current = params
        localStorage.setItem('list', JSON.stringify(newList))
        return newList
      })
    } else {
      console.log('TARGET IS SAME')
    }
    console.log('dragenter', params)
  }

  const handleDragEnd = (e) => {
    console.log('dragend')
    dragItem.current = null
    dragNode.current.removeEventListener('dragend', handleDragEnd)
    dragNode.current = null
    setDragging(false)
  }
  const getStyle = (params) => {
    const currentItem = dragItem.current
    if (
      currentItem.groupIndex === params.groupIndex &&
      currentItem.itemIndex === params.itemIndex
    ) {
      return 'current dnd-item'
    }
    return 'dnd-item'
  }
  return (
    <div className="drag-n-drop">
      {list.map(({ title, items }, groupIndex) => {
        return (
          <div
            key={groupIndex}
            className="dnd-group"
            onDragEnter={
              dragging && !items.length
                ? (e) => onDragEnterHandler(e, { groupIndex, itemIndex: 0 })
                : null
            }
          >
            <div className="group-title">{title}</div>
            {items.map((item, itemIndex) => {
              return (
                <div
                  draggable
                  key={itemIndex}
                  className={
                    dragging ? getStyle({ groupIndex, itemIndex }) : 'dnd-item'
                  }
                  onDragStart={(e) =>
                    onDragStartHandler(e, { groupIndex, itemIndex })
                  }
                  onDragEnter={
                    dragging
                      ? (e) => onDragEnterHandler(e, { groupIndex, itemIndex })
                      : null
                  }
                >
                  <div>
                    <p>{item}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default DragNDrop
