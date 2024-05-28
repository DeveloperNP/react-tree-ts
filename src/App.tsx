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

function App() {

  const treeWithID = initTree.map(el => ({
    level: 0,
    name: el.name,
    children: el.children?.map(ch => ({
      level: 1,
      name: ch.name,
      children: ch.children?.map(ch => ({
        level: 2,
        name: ch.name
      }))
    }))
  }))

  const tree = initTree.map(el => <TreeNodeItem name={el.name} children={el.children} />)
  
  return (
    <>
      {tree}
    </>
  );
}

export default App;
