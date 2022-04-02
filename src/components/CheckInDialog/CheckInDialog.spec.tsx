import React, { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import CheckInDialog from "./CheckInDialog";
import InventoryItem from "../../types/InventoryItem";

const baseListItems: Array<InventoryItem> = [
  {
    _id: "thisisalongidforitemone",
    serial: "itemoneserial",
    description: "itemonedescription",
    count: 1,
  },
  {
    _id: "thisisalongidforitemtwo",
    serial: "itemtwoserial",
    description: "itemtwodescription",
    count: 2,
  },
];

const baseCallback = (selectedItems: Array<InventoryItem>) => {
  return selectedItems;
};

const baseProps: ComponentProps<typeof CheckInDialog> = {
  listItems: baseListItems,
  callback: baseCallback,
};

describe("<CheckInDialog />", () => {
  it("Renders a button with the text 'Material Einlagern'", async () => {
    render(<CheckInDialog {...baseProps} />);

    expect(screen.getByText("Material Einlagern")).toBeInTheDocument();
    expect(screen.getByText("Material Einlagern")).toBeEnabled();
    expect(screen.getByText("Material Einlagern")).toBeVisible();
  });

  it("Opens a dialog when the button is clicked", async () => {
    render(<CheckInDialog {...baseProps} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Material Einlagern" })
    );

    expect(screen.getByLabelText("Suchbegriff")).toBeInTheDocument();
    expect(screen.getByLabelText("Suchbegriff")).toBeVisible();
    expect(screen.getByText(baseListItems[0].serial)).toBeInTheDocument();
    expect(screen.getByText(baseListItems[0].serial)).toBeVisible();
    expect(screen.getByText(baseListItems[0].description)).toBeInTheDocument();
    expect(screen.getByText(baseListItems[0].description)).toBeVisible();
    expect(screen.getByText(baseListItems[1].serial)).toBeInTheDocument();
    expect(screen.getByText(baseListItems[1].serial)).toBeVisible();
    expect(screen.getByText(baseListItems[1].description)).toBeInTheDocument();
    expect(screen.getByText(baseListItems[1].description)).toBeVisible();
  });

  it("Renders two buttons 'Abbrechen' and 'Einlagern' in the dialog", async () => {
    render(<CheckInDialog {...baseProps} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Material Einlagern" })
    );

    expect(screen.getByText("Abbrechen")).toBeInTheDocument();
    expect(screen.getByText("Abbrechen")).toBeVisible();
    expect(screen.getByText("Einlagern")).toBeInTheDocument();
    expect(screen.getByText("Einlagern")).toBeVisible();
  });

  it("Closes the dialog when 'Abbrechen' is clicked", async () => {
    render(<CheckInDialog {...baseProps} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Material Einlagern" })
    );
    await userEvent.click(screen.getByRole("button", { name: "Abbrechen" }));

    expect(screen.queryByText("Abbrechen")).not.toBeVisible();
  });

  it("Closes the dialog when 'Einlagern' is clicked and fires the callback", async () => {
    const cb = jest.fn();
    render(<CheckInDialog {...{ ...baseProps, callback: cb }} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Material Einlagern" })
    );
    await userEvent.click(screen.getByRole("button", { name: "Einlagern" }));

    expect(screen.queryByText("Einlagern")).not.toBeVisible();
    expect(cb).toHaveBeenCalled();
  });

  it("Shows item one when 'one' is entered in the search field", async () => {
    render(<CheckInDialog {...baseProps} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Material Einlagern" })
    );
    await userEvent.type(screen.getByLabelText("Suchbegriff"), "one");

    expect(screen.getByText(baseListItems[0].serial)).toBeInTheDocument();
    expect(screen.getByText(baseListItems[0].serial)).toBeVisible();
    expect(screen.getByText(baseListItems[0].description)).toBeInTheDocument();
    expect(screen.getByText(baseListItems[0].description)).toBeVisible();
    expect(screen.queryByText(baseListItems[1].serial)).not.toBeInTheDocument();
    expect(
      screen.queryByText(baseListItems[1].description)
    ).not.toBeInTheDocument();
  });

  it("Shows item one when 'two' is entered in the search field", async () => {
    render(<CheckInDialog {...baseProps} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Material Einlagern" })
    );
    await userEvent.type(screen.getByLabelText("Suchbegriff"), "two");

    expect(screen.getByText(baseListItems[1].serial)).toBeInTheDocument();
    expect(screen.getByText(baseListItems[1].serial)).toBeVisible();
    expect(screen.getByText(baseListItems[1].description)).toBeInTheDocument();
    expect(screen.getByText(baseListItems[1].description)).toBeVisible();
    expect(screen.queryByText(baseListItems[0].serial)).not.toBeInTheDocument();
    expect(
      screen.queryByText(baseListItems[0].description)
    ).not.toBeInTheDocument();
  });

  it("Return the item when it is selected and the button 'Einlagern' is pressed", async () => {
    const cb = jest.fn();
    render(<CheckInDialog {...{ ...baseProps, callback: cb }} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Material Einlagern" })
    );
    await userEvent.type(screen.getByLabelText("Suchbegriff"), "one");
    await userEvent.click(screen.getByRole("checkbox"));
    await userEvent.click(screen.getByText("Einlagern"));

    expect(cb.mock.calls[0][0]).toEqual(
      expect.arrayContaining([expect.objectContaining(baseListItems[0])])
    );
  });
});
