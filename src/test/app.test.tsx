import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders welcome message", () => {
  render(<App />);
  const welcomeElement = screen.getByText(/home page/i);
  expect(welcomeElement).toBeInTheDocument();
});
