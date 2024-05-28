import './App.css';
import { TreeNodeItem } from './components/TreeNodeItem/TreeNodeItem';

export type TreeNode = {
  name: string;
  children?: TreeNode[];
};

type Tree = TreeNode[];

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
];

function mapTree(tree: Tree, level: number): Tree {
  const curLevel = level
  const mappedTree = tree.map(
    (el, index) => {
      if(el.children) {
        return ({
          level: curLevel,
          id: index,
          name: el.name,
          children: mapTree(el.children, curLevel+1)
        })
      } else {
        return ({
          level: curLevel,
          id: index,
          name: el.name
        })
      }
    }
  )

  return mappedTree
}

function App() {

  const mappedTree = mapTree(initTree, 0)
  console.log(mappedTree)
  const tree = mappedTree.map(el => <TreeNodeItem name={el.name} children={el.children} />)
  
  return (
    <>{tree}</>
  );
}

export default App;
