import { useState } from 'react'
import s from './App.module.css'
import { TreeNodeItem } from './components/TreeNodeItem/TreeNodeItem'
import { addRootNode, addTreeNode, deleteTreeNode, setTreeExpanded, toggleIsExpanded, updateTreeKeys } from './utils/utils'

// Consta Imports
import { Theme, presetGpnDefault } from '@consta/uikit/Theme'
import { Button } from '@consta/uikit/Button'
import { TextField } from '@consta/uikit/TextField'
import { IconExpand } from '@consta/icons/IconExpand'
import { IconCollapse } from '@consta/icons/IconCollapse'
import { IconAdd } from '@consta/icons/IconAdd'
import { IconClose } from '@consta/icons/IconClose'
import { IconCheck } from '@consta/icons/IconCheck'


// Types
export type TreeNode = {
  name: string
  children?: TreeNode[]
}

export type ReactTreeNode = {
  key: string
  name: string
  path: string
  isExpanded: boolean
  children?: ReactTreeNode[]
}

export type Tree = TreeNode[]
export type ReactTree = ReactTreeNode[]

// Init Array
const initTree: Tree = [
  {
    name: "guitars",
    children: [
      {
        name: "acoustic",
        children: [
          { name: "Kremona" },
          { name: "Epiphone" },
          { name: "Gibson" },
          { name: "Yamaha" },
        ],
      },
      {
        name: "electric",
        children: [
          {
            name: "Fender",
            children: [
              {
                name: "Telecaster",
              },
              {
                name: "Stratocaster",
              },
              {
                name: "Jaguar",
              },
            ],
          },
          {
            name: "Gibson",
            children: [
              {
                name: "Les Paul",
              },
              {
                name: "SG",
              },
              {
                name: "ES-335",
              },
              {
                name: "ES-339",
              },
            ],
          },
        ],
      },
      { name: "acoustic bass" },
      { name: "electric bass" },
    ],
  },
  {
    name: "footbal leagues",
    children: [
      {
        name: "apl",
        children: [
          { name: "liverpool" },
          { name: "arsenal" },
          { name: "man city" },
          { name: "man united" },
        ],
      },
      {
        name: "serie a",
        children: [
          {
            name: "AC Milan",
            children: [
              {
                name: "Rafa Leao",
              },
              {
                name: "Theo",
              },
              {
                name: "Maignain",
              },
            ],
          },
          {
            name: "Inter",
            children: [
              {
                name: "merda",
              },
            ],
          },
        ],
      },
      { name: "la liga" },
      { name: "liga 1" },
    ],
  },
]



function App() {

  // Making Array of elements for React Components from Init Array
  // Set all Tree Nodes Collapsed
  let initReactTree = updateTreeKeys(initTree)
  initReactTree = setTreeExpanded(initReactTree, false)

  // Local State
  const [tree, setTree] = useState(initReactTree)

  const [addRootNodeMode, setAddRootNodeMode] = useState(false)
  const [inputRootValue, setInputRootValue] = useState('')
  

  // Adds React Tree Root Item
  function addReactTreeRootItem(newRootNodeName: string) {
    if(newRootNodeName) {
      setAddRootNodeMode(false)
      setInputRootValue('')
      
      const updatedTree = addRootNode(tree, newRootNodeName)
      setTree(updatedTree)
    }
  }

  // Adds React Tree Item
  function addReactTreeItem(id: string, newNodeName: string) {
    const updatedTree = addTreeNode(tree, id, newNodeName)
    setTree(updatedTree)
  }

  // Deletes React Tree Item
  function deleteReactTreeItem(id: string) {
    let updatedTree = deleteTreeNode(tree, id)
    updatedTree = updateTreeKeys(updatedTree)
    setTree(updatedTree)
  }

  // Changes React Tree Item state: Expanded / Collapsed
  function toggleIsExpandedReactTreeItem(id: string) {
    const updatedTree = toggleIsExpanded(tree, id)
    setTree(updatedTree)
  }


  // Making Array of React Tree Node Items
  const reactTree = tree.map(el => <TreeNodeItem key={el.key}
                                                 id={el.key}
                                                 name={el.name}
                                                 path={el.path}
                                                 isExpanded={el.isExpanded}
                                                 children={el.children}
                                                 addReactTreeItem={addReactTreeItem}
                                                 deleteReactTreeItem={deleteReactTreeItem}
                                                 toggleIsExpandedReactTreeItem={toggleIsExpandedReactTreeItem} />)
 
  // Render
  return (
    <Theme preset={presetGpnDefault}>
      <div className={s.appContainer}>

        <div className={s.buttonsBlock}>
          <Button
            onClick={() => {setTree(setTreeExpanded(tree, true))}}
            label={'Expand all'}
            size='s'
            iconRight={IconExpand}
          />

          <Button
            onClick={() => {setTree(setTreeExpanded(tree, false))}}
            label={'Collapse all'}
            size='s'
            iconRight={IconCollapse}
          />

          <Button
            className={s.addRootNodeButton}
            onClick={() => { setAddRootNodeMode(!addRootNodeMode) }}
            label={addRootNodeMode ? 'Cancel' : 'Add Root'}
            size='s'
            iconRight={addRootNodeMode ? IconClose : IconAdd}
            iconSize='s'
          />
        </div>

        { addRootNodeMode &&
          <div className={s.addRootNodeBlock}>    
            <TextField
              autoFocus={true}
              value={inputRootValue}
              onChange={(event) => {setInputRootValue(event as string) }}
              size='s'
              type='text'
              placeholder='Enter your text...'
              withClearButton
            />

            <Button
              onClick={() => {addReactTreeRootItem(inputRootValue)}}
              size='s'
              iconRight={IconCheck}
              iconSize='s'
            />
          </div>
        }

        {reactTree}
      </div>
    </Theme>
  )
}

export default App



export const TextFieldExampleTypeText = () => {
  const [value, setValue] = useState<string>('');

  return (
    <TextField
      onChange={(event) => {setValue(event as string) }}
      value={value}
      type="text"
      placeholder="Одна строчка"
    />
  );
};
