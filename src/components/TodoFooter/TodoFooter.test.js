import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import TodoFooter from "./TodoFooter";

// as component has Link inside it and we test that as standalone function
//so we need to wrap component with BrowserRouter to use Link
const MockTodoFooter = ({ numberOfIncompleteTasks }) => {
  return (
    <BrowserRouter>
      <TodoFooter numberOfIncompleteTasks={numberOfIncompleteTasks} />
    </BrowserRouter>
  );
};

describe("Todo Footer", () => {
  test("render the right count of incomplete tasks", () => {
    render(<MockTodoFooter numberOfIncompleteTasks={5} />);
    const paragraphElement = screen.getByText(/5 tasks left/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  test("render task if count of incomplete tasks equal 1", () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const paragraphElement = screen.getByText(/1 task left/i);
    expect(paragraphElement).toBeInTheDocument();
  });
});
