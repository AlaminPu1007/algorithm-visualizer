/**
 * interface to fill the two dimensional grid
 *
 * @interface ICell
 *
 * @param {id} number-each grid item unique id
 * @param {value} number-either 0/1
 */
export interface ICell {
  id: number;
  value: number;
}

/**
 * Interface for grid current item
 *
 * @interface ICell
 *
 * @param {row} number grid row index
 * @param {col} number grid col index
 */
export interface CurrentItemProps {
  row: number | null;
  col: number | null;
}
