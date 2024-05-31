import { useState } from 'react'
import s from './App.module.css'
import { TreeNodeItem } from './components/TreeNodeItem/TreeNodeItem'

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

type Tree = TreeNode[]
type ReactTree = ReactTreeNode[]

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

function updateTreeKeys(tree: Tree | ReactTree, level: number = 0, parentKey: string = '', parentItem: string = ''): ReactTree {
  
  const updatedTree = tree.map(
    (el, index) => {
      const itemKey = parentKey ? `${parentKey}/${level}-${index}` : `${level}-${index}`
      const itemPath = parentItem ? `${parentItem} -> ${el.name}` : el.name

      if(el.children) {
        return ({
          ...el,
          key: itemKey,
          path: itemPath,
          name: el.name,
          children: updateTreeKeys(el.children, level+1, itemKey, itemPath)
        } as ReactTreeNode)
      } else {
        return ({
          ...el,
          key: `${parentKey}/${level}-${index}`,
          path: itemPath,
          name: el.name
        } as ReactTreeNode)
      }
    }
  )
  return updatedTree
}

function setTreeExpanded(tree: ReactTree, expanded: boolean): ReactTree {
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


export const deleteTreeNode = (array: ReactTreeNode[], id: string) => {
  return array.reduce((arr: ReactTreeNode[], item) => {
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

export const toggleIsExpanded = (array: ReactTreeNode[], id: string) => {
  return array.reduce((arr: ReactTreeNode[], item) => {
    
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

  let initReactTree = updateTreeKeys(initTree)
  initReactTree = setTreeExpanded(initReactTree, false)


  const [tree, setTree] = useState(initReactTree)


  function deleteReactTreeItem(id: string) {
    let updatedTree = deleteTreeNode(tree, id)
    updatedTree = updateTreeKeys(updatedTree)
    setTree(updatedTree)
  }

  function toggleIsExpandedReactTreeItem(id: string) {
    const updatedTree = toggleIsExpanded(tree, id)
    setTree(updatedTree)
  }


  const reactTree = tree.map(el => <TreeNodeItem key={el.key}
                                                 id={el.key}
                                                 name={el.name}
                                                 path={el.path}
                                                 isExpanded={el.isExpanded}
                                                 children={el.children}
                                                 deleteReactTreeItem={deleteReactTreeItem}
                                                 toggleIsExpandedReactTreeItem={toggleIsExpandedReactTreeItem} />)

  return (
    <div className={s.appContainer}>
      <button onClick={() => {setTree(setTreeExpanded(tree, true))}}>Expand all</button>
      <button onClick={() => {setTree(setTreeExpanded(tree, false))}}>Collapse all</button>
      {reactTree}
    </div>
  )
}

export default App
