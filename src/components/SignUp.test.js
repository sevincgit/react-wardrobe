import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import SignUp from './SignUp';
import { server } from '../mocks/server.js';

// mock server:
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// mock callback functions:
const setMessageNewUser = jest.fn();

describe('Signup', () => {
  test('renders the form', () => {
    render(<SignUp />);
    // elements are present using the table
    const inputUserName = screen.getByLabelText(/username/i);
    expect(inputUserName).toBeInTheDocument();
    const inputEmail = screen.getByLabelText(/email/i);
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByLabelText(/password/i);
    expect(inputPassword).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('displays text for signup', async () => {
    render(<SignUp />);

    // fill out form:
    await userEvent.type(screen.getByLabelText(/username/i), 'test123');
    await userEvent.type(screen.getByLabelText(/email/i), 'test123@test.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'ABC123abc!');
    await userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText('Account created successfully')).toBeInTheDocument();
  });

  xtest('displays an alert for signup', async () => {
    render(<SignUp />);

    // fill out form:
    await userEvent.type(screen.getByLabelText(/username/i), 'test123');
    await userEvent.type(screen.getByLabelText(/email/i), 'test123@test.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'ABC123abc!');
    await userEvent.click(screen.getByRole('button'));

    expect(await screen.findByRole('alert')).toHaveTextContent();
  });

  test('displays error for unsuccessful signup bcs server is not responding', async () => {
    //mock a 500 response
    let pathSignUp = `${process.env.REACT_APP_WARDROBE_API}/users/`;
    server.use(
      rest.post(pathSignUp, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            success: false,
            errors: 'could not sign up',
          })
        );
      })
    );

    render(<SignUp />);

    // fill out form:
    await userEvent.type(screen.getByLabelText(/username/i), 'test123');
    await userEvent.type(screen.getByLabelText(/email/i), 'test123@test.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'ABC123abc!');
    await userEvent.click(screen.getByRole('button'));
    // check if we see the text

    expect(await screen.findByText('There was an error signing up')).toBeInTheDocument();
    expect(screen.queryByText('Created')).not.toBeInTheDocument();
  });
});
