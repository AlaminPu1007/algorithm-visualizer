import React from 'react';
// import TreeComponent from './components/Tree/TreeComponent';

const page = () => {
  return (
    <>
      <div className='container'>
        {/* for jest */}
        <h1 className='py-5 text-center text-3xl'>Hello world!</h1>
      </div>

      <div className='container'>
        <Graph />
      </div>
    </>
  );
};

export default page;

// Define the types for nodes and edges
type Node = {
  cx: number;
  cy: number;
};

type Nodes = {
  [key: string]: Node;
};

type Edge = {
  from: string;
  to: string;
  weight: number;
};

const Graph: React.FC = () => {
  // Define node positions
  const nodes: Nodes = {
    A: { cx: 50, cy: 150 },
    B: { cx: 150, cy: 50 },
    C: { cx: 150, cy: 250 },
    D: { cx: 250, cy: 50 },
    E: { cx: 250, cy: 250 },
    F: { cx: 350, cy: 150 },
  };

  // Define edges with their weights
  const edges: Edge[] = [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 5 },
    { from: 'B', to: 'C', weight: 11 },
    { from: 'B', to: 'D', weight: 9 },
    { from: 'C', to: 'E', weight: 3 },
    { from: 'D', to: 'E', weight: 13 },
    { from: 'D', to: 'F', weight: 2 },
    { from: 'E', to: 'F', weight: 6 },
  ];

  return (
    <svg viewBox='-200 0 800 300'>
      {/* Draw edges */}
      {edges.map((edge, index) => {
        const start = nodes[edge.from];
        const end = nodes[edge.to];
        return (
          <g key={index}>
            <line
              x1={start.cx}
              y1={start.cy}
              x2={end.cx}
              y2={end.cy}
              stroke='black'
              strokeWidth='1'
            />
            {/* Label the edge with its weight */}
            <text
              x={(start.cx + end.cx) / 2 + 15}
              y={(start.cy + end.cy) / 2}
              fill='black'
              fontSize='10'
              textAnchor='middle'
              dy={-5}
            >
              {edge.weight}
            </text>
          </g>
        );
      })}

      {/* Draw nodes */}
      {Object.keys(nodes).map((key) => (
        <g key={key}>
          <circle
            cx={nodes[key].cx}
            cy={nodes[key].cy}
            r='15'
            fill='#fff'
            stroke='black'
            strokeWidth='1.2'
          />
          {/* Label the node */}
          <text
            x={nodes[key].cx}
            y={nodes[key].cy + 5}
            fill='black'
            fontSize='12'
            textAnchor='middle'
          >
            {key}
          </text>
        </g>
      ))}
    </svg>
  );
};
