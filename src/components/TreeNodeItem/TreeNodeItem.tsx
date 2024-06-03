import { useState } from 'react'
import { ReactTreeNode } from '../../App'
import s from './TreeNodeItem.module.css'

// Consta Imports
import { Button } from '@consta/uikit/Button'
import { Text } from '@consta/uikit/Text'
import { TextField } from '@consta/uikit/TextField'
import { IconArrowRight } from '@consta/icons/IconArrowRight'
import { IconArrowDown } from '@consta/icons/IconArrowDown'
import { IconTrash } from '@consta/icons/IconTrash'
import { IconHealth } from '@consta/icons/IconHealth'
import { IconClear } from '@consta/icons/IconClear'
import { IconFolderOpen } from '@consta/icons/IconFolderOpen'
import { IconCheck } from '@consta/icons/IconCheck'


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
    <>
      <div className={s.parentContainer}>        
        <Button
          onClick={() => { toggleIsExpandedReactTreeItem(id) }}
          view='secondary'
          size='s'
          iconRight={isExpanded ? IconArrowDown : IconArrowRight}
        />
        
        <Text view='brand' size='xl' font='mono' lineHeight='m'>
          {name}
        </Text>

        <Button
          onClick={() => {deleteNode(id)}}
          view='clear'
          size='s'
          iconRight={IconTrash}
        />

        <Button
          onClick={() => {setAddMode(!addMode)}}
          view='clear'
          size='s'
          iconRight={addMode ? IconClear : IconHealth}
        />

        <Button
          onClick={() => {console.log(path)}}
          view='clear'
          size='s'
          iconRight={IconFolderOpen}
        /> 
      </div>

      { addMode &&
        <div className={s.addNodeBlock}>
          <TextField
            autoFocus={true}
            value={inputValue}
            onChange={(value) => {setInputValue(value as string) }}
            size='s'
            type='text'
            placeholder='Enter your text...'
            withClearButton
          />

          <Button
            onClick={() => {addNode(id, inputValue)}}
            size='s'
            iconRight={IconCheck}
            iconSize='s'
          />
        </div>
      }

      <div className={s.children}>
        {isExpanded && childTree}
      </div>
    </>
  )
}