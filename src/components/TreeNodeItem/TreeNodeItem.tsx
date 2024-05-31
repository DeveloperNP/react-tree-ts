import { ReactTreeNode } from '../../App'
import s from './TreeNodeItem.module.css'

type TreeNodeItemType = {
  id: string
  name: string
  path: string
  isExpanded: boolean
  children?: ReactTreeNode[]
  deleteReactTreeItem: (id: string) => void
  toggleIsExpandedReactTreeItem: (id: string) => void
}

export const TreeNodeItem = ({id, name, path, isExpanded, children, deleteReactTreeItem, toggleIsExpandedReactTreeItem}: TreeNodeItemType) => {

  let childTree = null
  if(children) {
    childTree = children.map(el => <TreeNodeItem key={el.key}
                                                 id={el.key}
                                                 name={el.name}
                                                 path={el.path}
                                                 isExpanded={el.isExpanded}
                                                 children={el.children}
                                                 deleteReactTreeItem={deleteReactTreeItem}
                                                 toggleIsExpandedReactTreeItem={toggleIsExpandedReactTreeItem} />)
  }

  return (
    <div className={s.treeNodeItemContainer}>
      <h3>{id}</h3> {/* FOR DEBUG */}
      <button onClick={() => { toggleIsExpandedReactTreeItem(id as string) }}>
        {isExpanded ? '-' : '+'}
      </button>
      {name}
      <button onClick={() => { deleteReactTreeItem(id as string) }}>Del</button>
      <button>Add</button>
      <button onClick={() => { console.log(path) }}>Path</button>
      <span>: {path}</span> {/* FOR DEBUG */}
      <div className={s.children}>
        {isExpanded && childTree}
      </div>
    </div>
  )
}