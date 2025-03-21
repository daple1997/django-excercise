import axios from "axios";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("axios");

// Mock matchMedia (fix for Ant Design's grid responsiveness)
beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        media: "",
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
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

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
