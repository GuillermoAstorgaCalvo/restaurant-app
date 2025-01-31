const bcrypt = {
  compare: jest.fn(() => Promise.resolve(true)),
  hash: jest.fn(() => Promise.resolve("mocked_hash")),
};

export default bcrypt;
