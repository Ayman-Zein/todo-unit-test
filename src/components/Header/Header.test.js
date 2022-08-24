import { render, screen } from "@testing-library/react";

import Header from "./Header";

// 3 A's arrange - act - assert

describe("header", () => {
  test("render header component with title passed as prop", () => {
    render(<Header title="My Header" />);

    const headingElement = screen.getByText("My Header", { exact: false });
    //assertion
    expect(headingElement).toBeInTheDocument();
  });
});
