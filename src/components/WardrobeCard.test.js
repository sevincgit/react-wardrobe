import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import WardrobeCard from './WardrobeCard';

let testItem = {
  url: 'a',
  title: 'a',
  definition: 'a',
  id: '1',
};

describe('Wardrobe card', () => {
  test('renders title of props', () => {
    render(<WardrobeCard item={{ ...testItem, title: 'abc' }} />);
    const text = screen.getByText('abc');
    expect(text).toBeInTheDocument();
  });
  test('renders url of props', () => {
    render(<WardrobeCard item={{ ...testItem, url: 'some.url' }} />);
    const button = screen.getByRole('img');
    expect(button).toHaveAttribute('src', expect.stringContaining('some.url'));
  });
  test('Renders buttons', () => {
    render(<WardrobeCard item={{ url: '', title: 'a', id: '1' }} />);
    const button = screen.getAllByRole('button');
    expect(button[0]).toHaveTextContent('Add to outfit');
    expect(button[1]).toHaveTextContent('Edit');
    expect(button[2]).toHaveTextContent('Delete');
  });
  // Bonus:
  test('Opens Modal on click', async () => {
    render(<WardrobeCard item={{ url: '', title: 'a', id: '1' }} />);
    await userEvent.click(screen.getByRole('button', { name: /edit/i }));
    const modalText = screen.getByText('Edit your item');
    expect(modalText).toBeInTheDocument();
  });
});
