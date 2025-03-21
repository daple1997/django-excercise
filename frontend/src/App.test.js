import axios from "axios";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("axios");

// Fix AntD matchMedia issue
beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        media: "",
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    };
});

test("axios mock test", () => {
  axios.get.mockResolvedValue({ data: { hello: "world" } });
  expect(axios.get).toBeCalledTimes(0);
});

test("renders welcome message", () => {
  render(<App />);
  const heading = screen.getByText(/welcome to your inventory/i);
  expect(heading).toBeInTheDocument();
});
