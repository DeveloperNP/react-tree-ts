import { ReactTree, ReactTreeNode, Tree } from "../App"



// Makes Array of elements for React Components from Init Array / Updates keys in Array of elements for React Components
export function updateTreeKeys(tree: Tree | ReactTree, level: number = 0, parentKey: string = '', parentItem: string = ''): ReactTree {
  
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



// Set all Tree Nodes Expanded or Collapsed
export function setTreeExpanded(tree: ReactTree, expanded: boolean): ReactTree {
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

// Changes Tree Node state: Expanded / Collapsed
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



// Adds Root Node
export const addRootNode = (array: ReactTreeNode[], newRootNodeName: string) => {
  if(array) {    
    const newRootID = array.length
    return [
      ...array,
      {
        key: `0-${newRootID}`,
        name: newRootNodeName,
        path: newRootNodeName,
        isExpanded: false
      }
    ]
  } else {
    return [
      {
        key: '0-0',
        name: newRootNodeName,
        path: newRootNodeName,
        isExpanded: false
      }
    ]
  }
}

// Calculates child level from parent's key
function getChildLevelOf(parentKey: string) {
  return Number(parentKey.split('/').at(-1)?.split('-')[0]) + 1
}

// Adds Tree Node
export const addTreeNode = (array: ReactTreeNode[], id: string, newNodeName: string) => {
  return array.reduce((arr: ReactTreeNode[], item) => {
    if (item.key === id) {
      
      if(item.children) {
        const childLevel = getChildLevelOf(item.key)
        const newChildID = item.children.length
        
        arr.push({
          ...item,
          children: [
            ...item.children,
            {
              key: `${item.key}/${childLevel}-${newChildID}`,
              name: newNodeName,
              path: `${item.path} -> ${newNodeName}`,
              isExpanded: false
            }
          ]
        })
        
      } else {
        const childLevel = getChildLevelOf(item.key)
        const newChildID = 0
        
        arr.push({
          ...item,
          children: [
            {
              key: `${item.key}/${childLevel}-${newChildID}`,
              name: newNodeName,
              path: `${item.path} -> ${newNodeName}`,
              isExpanded: false
            }
          ]
        })
      }

    } else {
      if (item.children) {
        arr.push({
          ...item,
          children: addTreeNode(item.children, id, newNodeName)
        })
      } else {
        arr.push({...item})
      }
    }

    return arr
  }, [])
}



// Deletes Tree Node
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