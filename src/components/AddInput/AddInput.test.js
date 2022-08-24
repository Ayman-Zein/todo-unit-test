import { render, screen, fireEvent } from "@testing-library/react";

import AddInput from "./AddInput";

const mockSetTodos = jest.fn();

describe("Add todo input", () => {
  test("render input correctly", () => {
    render(<AddInput todos={[]} setTodos={mockSetTodos} />);

    const inputElement = screen.getByPlaceholderText(/Add a new task here/i);
    expect(inputElement).toBeInTheDocument();
  });

  test("should be able to type in input", () => {
    render(<AddInput todos={[]} setTodos={mockSetTodos} />);

    const inputElement = screen.getByPlaceholderText(/Add a new task here/i);
    fireEvent.change(inputElement, { target: { value: "write unit test" } });
    expect(inputElement.value).toBe("write unit test");
  });

  test("should be empty input after add button has been clicked", () => {
    render(<AddInput todos={[]} setTodos={mockSetTodos} />);

    const inputElement = screen.getByPlaceholderText(/Add a new task here/i);
    const btnElement = screen.getByRole("button");
    fireEvent.change(inputElement, { target: { value: "write unit test" } });
    fireEvent.click(btnElement);
    expect(inputElement.value).toBe("");
  });
});
