import { useState } from 'react'
import s from './App.module.css'
import { TreeNodeItem } from './components/TreeNodeItem/TreeNodeItem'
import { addRootNode, addTreeNode, deleteTreeNode, setTreeExpanded, toggleIsExpanded, updateTreeKeys } from './utils/utils'

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
    <div className={s.appContainer}>
      <button onClick={() => {setTree(setTreeExpanded(tree, true))}}>Expand all</button>
      <button onClick={() => {setTree(setTreeExpanded(tree, false))}}>Collapse all</button>

      <button onClick={() => {setAddRootNodeMode(!addRootNodeMode)}}>Add Root</button>
      { addRootNodeMode &&
        <div>    
          <input autoFocus={true} value={inputRootValue} onChange={(event) => setInputRootValue(event.target.value)} />
          <button onClick={() => {addReactTreeRootItem(inputRootValue)}}>✔</button>
        </div>
      }

      {reactTree}
    </div>
  )
}

export default App