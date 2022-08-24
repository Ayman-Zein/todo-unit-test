import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Todo from "./Todo";

const MockTodo = () => {
  return (
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  );
};

const addTodos = (todos) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here/i);
  const btnElement = screen.getByRole("button");

  todos.forEach((element) => {
    fireEvent.change(inputElement, { target: { value: element } });
    fireEvent.click(btnElement);
  });
};

// integration testing
describe("Todo", () => {
  test("should render same value inserted in input to todo list", () => {
    render(<MockTodo />);
    // const inputElement = screen.getByPlaceholderText(/Add a new task here/i);
    // const btnElement = screen.getByRole("button");
    // fireEvent.change(inputElement, { target: { value: "write unit test" } });
    // fireEvent.click(btnElement);

    addTodos(["write unit test"]);

    const divElement = screen.getByText(/write unit test/i);

    expect(divElement).toBeInTheDocument();
  });

  test("should render todo list after add more than one todo", () => {
    render(<MockTodo />);

    addTodos(["write unit test", "study graphql", "enhance code"]);
    const divElements = screen.getAllByTestId("todo-item");

    expect(divElements.length).toBe(3);
  });

  test('should not have "todo-item-active" class in initial render', () => {
    render(<MockTodo />);

    addTodos(["write unit test"]);
    const divElement = screen.getByText(/write unit test/i);
    expect(divElement).not.toHaveClass("todo-item-active");
  });

  test('should have "todo-item-active" class when clinking it (completed)', () => {
    render(<MockTodo />);

    addTodos(["write unit test"]);
    const divElement = screen.getByText(/write unit test/i);
    fireEvent.click(divElement);
    expect(divElement).toHaveClass("todo-item-active");
  });
});
