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

  const [addMode, setAddMode] = useState(false)
  const [inputValue, setInputValue] = useState('')

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
      <button onClick={() => { toggleIsExpandedReactTreeItem(id) }}>
        {isExpanded ? '-' : '+'}
      </button>
      {name}
      <button onClick={() => {deleteNode(id)}}>Del</button>
      <button onClick={() => {setAddMode(!addMode)}}>Add</button>
      <button onClick={() => { console.log(path) }}>Path</button>

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