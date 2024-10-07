/**
 * Interface representing the properties of a single cell in a Sudoku board.
 *
 * @interface SudoKuBoardProps
 *
 * @property {number | string} id - A unique identifier for the cell.
 * @property {string} value - The current value of the cell (typically a number from 1-9 or empty).
 * @property {boolean} isValid - Indicates whether the current value of the cell is valid according to Sudoku rules.
 * @property {boolean} isActive - Specifies if the cell is currently selected or active for input.
 * @property {boolean} isCurrent - Highlights the cell as the one being operated on in the current algorithm step.
 * @property {boolean} isTarget - Marks the cell as the target for a specific algorithm or validation process.
 * @property {boolean} isValidRowItem - Highlights the cell as part of the row being validated.
 * @property {boolean} isValidColItem - Highlights the cell as part of the column being validated.
 * @property {boolean} isValidSubGridItem - Highlights the cell as part of the 3x3 subgrid being validated.
 * @property {boolean} isInvalid - Marks the cell as invalid if a conflict is detected (e.g., duplicate value in row, column, or subgrid).
 */
export interface SudoKuBoardProps {
  id: number | string;
  value: string;
  isValid: boolean;
  isActive: boolean;
  isCurrent: boolean;
  isTarget: boolean;
  isValidRowItem: boolean;
  isValidColItem: boolean;
  isValidSubGridItem: boolean;
  isInvalid: boolean;
}

/**
 * Interface representing the properties for grid input fields in the Sudoku board.
 *
 * @interface GridInputProps
 *
 * @property {string} value - The current value of the input (typically a number from 1-9 or an empty string).
 * @property {string | number} id - A unique identifier for the input field.
 */
export interface GridInputProps {
  value: string;
  id: string | number;
}
