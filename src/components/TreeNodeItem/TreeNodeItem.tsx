import { TreeNode } from '../../App'
import s from './TreeNodeItem.module.css'

type TreeNodeItemType = {
  name: string,
  children?: TreeNode[]
  id?: string,
  deleteReactTreeItem: (id: string) => void
  isExpanded?: boolean
  toggleIsExpandedReactTreeItem: (id: string) => void
}

export const TreeNodeItem = ({name, children, id, deleteReactTreeItem, isExpanded, toggleIsExpandedReactTreeItem}: TreeNodeItemType) => {

  let childTree = null
  if(children) {
    childTree = children.map(ch => <TreeNodeItem key={ch.key}
                                                 name={ch.name}
                                                 children={ch.children}
                                                 id={ch.key}
                                                 deleteReactTreeItem={deleteReactTreeItem}
                                                 isExpanded={ch.isExpanded}
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
      <button onClick={() => { console.log(id) }}>Path</button>
      <div className={s.children}>
        {isExpanded && childTree}
      </div>
    </div>
  )
}