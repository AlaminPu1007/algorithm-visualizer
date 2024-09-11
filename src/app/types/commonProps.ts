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
