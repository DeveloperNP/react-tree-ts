import { useState } from 'react'
import './App.css'
import { TreeNodeItem } from './components/TreeNodeItem/TreeNodeItem'

export type TreeNode = {
  name: string
  children?: TreeNode[]
  key?: string
  isExpanded?: boolean
}

type Tree = TreeNode[]

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

function updateTreeKeys(tree: Tree, level: number, parentKey: string): Tree {
  const updatedTree = tree.map(
    (el, index) => {
      if(el.children) {
        return ({
          ...el,
          key: `${parentKey}/${level}-${index}`,
          name: el.name,
          children: updateTreeKeys(el.children, level+1, `${parentKey}/${level}-${index}`)
        })
      } else {
        return ({
          ...el,
          key: `${parentKey}/${level}-${index}`,
          name: el.name
        })
      }
    }
  )
  return updatedTree
}

function setTreeExpanded(tree: Tree, expanded: boolean): Tree {
  const updatedTree = tree.map(
    (el) => {
      if(el.children) {
        return ({
          ...el,
          isExpanded: expanded,
          children: setTreeExpanded(el.children, expanded)
        })
      } else {
        return ({
          ...el,
          isExpanded: expanded
        })
      }
    }
  )
  return updatedTree
}


export const deleteTreeNode = (array: TreeNode[], id: string) => {
  return array.reduce((arr: TreeNode[], item) => {
    if (item.key !== id) {
      if (item.children) {
        arr.push({
          ...item,
          children: deleteTreeNode(item.children, id)
        })
      } else {
        arr.push({...item})
      }
    }

    return arr
  }, [])
}

export const toggleIsExpanded = (array: TreeNode[], id: string) => {
  return array.reduce((arr: TreeNode[], item) => {
    
    if (item.key !== id) {
      if (item.children) {
        arr.push({
          ...item,
          children: toggleIsExpanded(item.children, id)
        })
      } else {
        arr.push({...item})
      }
    } else {
      arr.push({...item, isExpanded: !item.isExpanded})
    }

    return arr
  }, [])
}


function App() {

  let initReactTree = updateTreeKeys(initTree, 0, '')
  initReactTree = setTreeExpanded(initReactTree, false)


  const [tree, setTree] = useState(initReactTree)


  function deleteReactTreeItem(id: string) {
    let updatedTree = deleteTreeNode(tree, id)
    updatedTree = updateTreeKeys(updatedTree, 0, '')
    setTree(updatedTree)
  }

  function toggleIsExpandedReactTreeItem(id: string) {
    const updatedTree = toggleIsExpanded(tree, id)
    setTree(updatedTree)
  }


  const reactTree = tree.map(el => <TreeNodeItem key={el.key}
                                                 name={el.name}
                                                 children={el.children}
                                                 id={el.key}
                                                 deleteReactTreeItem={deleteReactTreeItem}
                                                 isExpanded={el.isExpanded}
                                                 toggleIsExpandedReactTreeItem={toggleIsExpandedReactTreeItem} />)

  return (
    <>
      <button onClick={() => {setTree(setTreeExpanded(tree, true))}}>Expand all</button>
      <button onClick={() => {setTree(setTreeExpanded(tree, false))}}>Collapse all</button>
      {reactTree}
    </>
  )
}

export default App
