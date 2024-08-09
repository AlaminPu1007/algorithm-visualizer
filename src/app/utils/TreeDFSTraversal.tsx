import React from 'react';
import { calculateLinePosition } from '@/app/lib/calculateSvgLinePosition';
import { NODE_POSITION } from '@/app/constant';
import { TreeDFSTraversalProps } from '../types/TreeTypeProps';

const TreeDFSTraversal: React.FC<TreeDFSTraversalProps> = ({
  root,
  steps,
  currentStep,
  visitedNodes,
}) => {
  if (!root || steps.indexOf(root) === -1) return null;

  const isCurrentNode = steps.indexOf(root) === currentStep;
  const isVisited = visitedNodes.has(root.id!);

  const renderLineToParent = () => {
    if (root.parent ) {
      const linePos = calculateLinePosition(
        root.parent.cx!,
        root.parent.cy!,
        root.cx!,
        root.cy!,
        NODE_POSITION
      );
      return (
        <line
          x1={linePos.startX}
          y1={linePos.startY}
          x2={linePos.endX}
          y2={linePos.endY}
          stroke={isCurrentNode ? 'green' : isVisited ? 'red' : 'black'}
          strokeWidth={'0.3'}
        >
          <animate
            attributeName='stroke-dasharray'
            attributeType='XML'
            from='0 9.375'
            to='79.375 0'
            dur={'4s'}
            fill='freeze'
          />
        </line>
      );
    }
    return null;
  };

  return (
    <g key={root.id}>
      {/* {root.parent &&
        (() => {
          const linePos = calculateLinePosition(
            root.parent.cx!,
            root.parent.cy!,
            root.cx!,
            root.cy!,
            NODE_POSITION
          );
          return (
            <>
              <line
                x1={linePos.startX}
                y1={linePos.startY}
                x2={linePos.endX}
                y2={linePos.endY}
                stroke={isCurrentNode ? 'green' : isVisited ? 'red' : 'black'}
                strokeWidth={'0.3'}
              >
                <animate
                  attributeName='stroke-dasharray'
                  attributeType='XML'
                  from='0 9.375'
                  to='79.375 0'
                  dur={'4s'}
                  fill='freeze'
                />
              </line>
            </>
          );
        })()} */}
      if()
      {renderLineToParent()}
      <circle
        cx={root.cx!}
        cy={root.cy!}
        r={NODE_POSITION}
        fill={isCurrentNode ? 'cyan' : isVisited ? '#3B9400' : 'white'}
        stroke={isCurrentNode ? 'white' : 'black'}
        strokeWidth={'0.2'}
      >
        <animate attributeName='r' from='4' to={5} dur='1s' begin={'0s'} />
      </circle>
      <text
        x={root.cx!}
        y={root.cy!}
        dy={2}
        textAnchor='middle'
        className='text-center text-[4px]'
        fill={`${visitedNodes.has(root.id!) ? 'white' : 'black'}`}
      >
        {root?.value || -1}
      </text>
      {root.left && (
        <TreeDFSTraversal
          root={root.left}
          steps={steps}
          currentStep={currentStep}
          visitedNodes={visitedNodes}
        />
      )}
      {root.right && (
        <TreeDFSTraversal
          root={root.right}
          steps={steps}
          currentStep={currentStep}
          visitedNodes={visitedNodes}
        />
      )}
    </g>
  );
};

export default TreeDFSTraversal;
