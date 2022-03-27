import React, { ComponentProps } from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "./Header";

const baseProps: ComponentProps<typeof Header> = {
  titleText: "Test Title",
  maxWidth: "md",
};

describe("<Header />", () => {
  it("Renders the titleText provided in the props", async () => {
    render(<Header {...baseProps} />, { wrapper: MemoryRouter });

    expect(screen.getByText(baseProps.titleText)).toBeInTheDocument();
  });

  it("Renders the login button", async () => {
    render(<Header {...baseProps} />, { wrapper: MemoryRouter });

    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
