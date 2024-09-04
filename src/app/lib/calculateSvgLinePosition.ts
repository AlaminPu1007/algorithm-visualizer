/**
 * Draw a line between parent to it's child node
 *
 * @param {x1} from the starting point of the line of parent node in x-axis
 * @param {y1} from the starting point of the line of parent node in y-axis
 * @param {x2} from the ending point of the line of child node in x-axis
 * @param {y2} from the ending point of the line of child node in y-axis
 * @return {object} Result of line position
 */

export const calculateLinePosition = (x1: number, y1: number, x2: number, y2: number, r: number) => {
  // calculate dale x, and y axis
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / length;
  const uy = dy / length;

  return {
    startX: x1 + ux * r,
    startY: y1 + uy * r,
    endX: x2 - ux * r,
    endY: y2 - uy * r,
  };
};
