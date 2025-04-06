// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
// Mock react-router-dom to avoid Jest trying to resolve it
jest.mock("react-router-dom", () => ({
  BrowserRouter: "div",
  Route: "div",
  Routes: "div",
}));
