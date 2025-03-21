export default {
  get: jest.fn(),
  post: jest.fn(),
  create: () => ({
    get: jest.fn(),
    post: jest.fn(),
  }),
};
