import { Sleep } from '@/app/lib/sleepMethod';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import React from 'react';

export const preOrderTraversal = async (
  node: ITreeNode | null,
  visitedNodes: Set<number>,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  setVisitedNodes: React.Dispatch<React.SetStateAction<Set<number>>>,
  steps: ITreeNode[],
  speedRange: number
) => {
  // handle the base case
  if (!node) return;

  // mark this node as visited
  if (node.id !== null) {
    visitedNodes.add(node.id);
  }

  // Mark the current node
  setCurrentStep(steps.indexOf(node));

  // update state of visited
  setVisitedNodes(new Set(visitedNodes));

  // wait until completed the current node
  await Sleep(speedRange);

  // Traverse left subtree
  if (node.left) {
    await preOrderTraversal(node.left, visitedNodes, setCurrentStep, setVisitedNodes, steps, speedRange);
  }

  // Backtrack to current node
  setCurrentStep(steps.indexOf(node));
  await Sleep(speedRange);

  // Traverse right subtree
  if (node.right) {
    await preOrderTraversal(node.right, visitedNodes, setCurrentStep, setVisitedNodes, steps, speedRange);
  }

  // Backtrack to current node
  setCurrentStep(steps.indexOf(node));
  await Sleep(speedRange);
};
