import { TreeNode } from '../../App';
import s from './TreeNodeItem.module.css'

type TreeNodeItemType = {
  name: string,
  children?: TreeNode[];
}

export const TreeNodeItem = ({name, children}: TreeNodeItemType) => {
 
  let childTree = null
  if(children) {
    childTree = children.map(ch => <TreeNodeItem name={ch.name} children={ch.children} />)
  }
  
 
  return (
    <div className={s.treeNodeItemContainer}>
      <button>+-</button>
      {name}
      <button>Del</button>
      <button>Add</button>
      <button>Path</button>

      <div className={s.children}>
        {childTree}
      </div>
    </div>
  );
}