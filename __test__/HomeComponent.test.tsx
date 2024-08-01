/**
 * Write a test case for home page
 */

import { render, screen } from '@testing-library/react';
import Page from '../src/app/page';

describe('Home component', () => {
  it('Should have a Hello World text', () => {
    render(<Page />);
    const getText = screen.getByText('Hello world!');
    expect(getText).toBeInTheDocument();
  });
});
