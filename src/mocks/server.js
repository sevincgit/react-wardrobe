import { rest } from 'msw';
import { setupServer } from 'msw/node';

let pathLogin = `${process.env.REACT_APP_WARDROBE_API}/users/login`;
let pathSignUp = `${process.env.REACT_APP_WARDROBE_API}/users/`;

const handlers = [
  rest.post(pathLogin, (req, res, ctx) => {
    // the real response, match with ctx
    // res.status(200).json({
    //   message: 'logged in',
    //   token: token
    //   })

    return res(
      ctx.status(200),
      ctx.json({
        message: 'logged in',
        token: 'a token',
      })
    );
  }),
  rest.post(pathSignUp, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        message: 'account created',
      })
    );
  }),
];

export const server = setupServer(...handlers);
