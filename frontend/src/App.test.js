import axios from "axios";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("axios");

test("axios mock test", () => {
  axios.get.mockResolvedValue({ data: { hello: "world" } });
  expect(axios.get).toBeCalledTimes(0); // hasn't been called yet
});

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
