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

export interface GridInputProps {
  value: string;
  id: string | number;
}
