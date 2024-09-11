/**
 * Represents a color configuration for status indicators.
 *
 * @interface StatusColorsDataProps
 * @property {number} id - A unique identifier for the status color entry.
 * @property {string} title - The descriptive title of the status.
 * @property {string} bg_color - The background color associated with the status, specified as a color string (e.g., hex, rgb, or color name).
 */
export interface StatusColorsDataProps {
  id: number;
  title: string;
  bg_color: string;
}

/**
 * N-Queens grid inline styles types props
 *
 * @interface ChessBoardGridInlineStyleProps
 * @property {string} display - css property
 * @property {string} gap - css grid property
 * @property {string} gridTemplateColumns - css grid property
 * @property {width} display - css to control the width property
 * @property {string} height - css to control the hight property
 */
export interface ChessBoardGridInlineStyleProps {
  display: string;
  gap: string;
  gridTemplateColumns: string;
  width: string;
  height: string;
}
