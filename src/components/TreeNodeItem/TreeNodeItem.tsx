import { useState } from 'react'
import { ReactTreeNode } from '../../App'
import s from './TreeNodeItem.module.css'

type TreeNodeItemType = {
  id: string
  name: string
  path: string
  isExpanded: boolean
  children?: ReactTreeNode[]
  addReactTreeItem: (id: string, newNodeName: string) => void
  deleteReactTreeItem: (id: string) => void
  toggleIsExpandedReactTreeItem: (id: string) => void
}

export const TreeNodeItem = ({id, name, path, isExpanded, children, addReactTreeItem, deleteReactTreeItem,
                              toggleIsExpandedReactTreeItem}: TreeNodeItemType) => {

  function deleteNode(id: string) {
    setAddMode(false)
    deleteReactTreeItem(id)
  }

  function addNode(id: string, newNodeName: string) {
    if(newNodeName) {
      setAddMode(false)
      setInputValue('')
      addReactTreeItem(id, newNodeName)
    }
  }

  const [addMode, setAddMode] = useState(false)
  const [inputValue, setInputValue] = useState('')



  let childTree = null
  if(children) {
    childTree = children.map(el => <TreeNodeItem key={el.key}
                                                 id={el.key}
                                                 name={el.name}
                                                 path={el.path}
                                                 isExpanded={el.isExpanded}
                                                 children={el.children}
                                                 addReactTreeItem={addReactTreeItem}
                                                 deleteReactTreeItem={deleteReactTreeItem}
                                                 toggleIsExpandedReactTreeItem={toggleIsExpandedReactTreeItem} />)
  }

  return (
    <div className={s.treeNodeItemContainer}>
      <h3>{id}</h3> {/* FOR DEBUG */}
      <button onClick={() => { toggleIsExpandedReactTreeItem(id) }}>
        {isExpanded ? '-' : '+'}
      </button>
      {name}
      <button onClick={() => {deleteNode(id)}}>Del</button>
      <button onClick={() => {setAddMode(!addMode)}}>Add</button>
      <button onClick={() => { console.log(path) }}>Path</button>
      <span>: {path}</span> {/* FOR DEBUG */}

      { addMode &&
        <div>    
          <input autoFocus={true} value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
          <button onClick={() => {addNode(id, inputValue)}}>✔</button>
        </div>
      }

      <div className={s.children}>
        {isExpanded && childTree}
      </div>
    </div>
  )
}