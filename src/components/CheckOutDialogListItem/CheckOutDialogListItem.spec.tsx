import React, { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import List from "@mui/material/List";
import CheckOutDialogListItem from "./CheckOutDialogListItem";
import InventoryItem from "../../types/InventoryItem";

const baseItem: InventoryItem = {
  _id: "thisisalongidforitemone",
  serial: "itemoneserial",
  description: "itemonedescription",
  count: 0,
};

const baseCallback = (changedItem: InventoryItem) => {
  return changedItem;
};

const baseProps: ComponentProps<typeof CheckOutDialogListItem> = {
  item: baseItem,
  onItemChangeCallback: baseCallback,
};

describe("<CheckOutDialogListItem />", () => {
  it("Renders the serial according to the item passed in props", async () => {
    render(<CheckOutDialogListItem {...baseProps} />, { wrapper: List });

    expect(screen.getByText(baseItem.serial)).toBeInTheDocument();
    expect(screen.getByText(baseItem.serial)).toBeVisible();
  });

  it("Renders the description according to the item passed in props", async () => {
    render(<CheckOutDialogListItem {...baseProps} />, { wrapper: List });

    expect(screen.getByText(baseItem.description)).toBeInTheDocument();
    expect(screen.getByText(baseItem.description)).toBeVisible();
  });

  it("Renders the checkbox, it is clickable and fires the callback with the item", async () => {
    const cb = jest.fn();

    render(
      <CheckOutDialogListItem
        {...{ ...baseProps, onItemChangeCallback: cb }}
      />,
      { wrapper: List }
    );

    const checkBox = screen.getByRole("checkbox");

    expect(checkBox).toBeInTheDocument();
    expect(checkBox).toBeEnabled();

    await userEvent.click(checkBox);

    expect(cb).toHaveBeenCalled();
    expect(cb.mock.calls[0][0]).toEqual(
      expect.objectContaining({ ...baseItem, checked: true, count: 1 })
    );
  });

  it("Renders the checkbox, it is clickable and resets the item on deselect", async () => {
    const cb = jest.fn();

    render(
      <CheckOutDialogListItem
        {...{ ...baseProps, onItemChangeCallback: cb }}
      />,
      { wrapper: List }
    );

    const checkBox = screen.getByRole("checkbox");

    expect(checkBox).toBeInTheDocument();
    expect(checkBox).toBeEnabled();

    await userEvent.click(checkBox);
    await userEvent.click(checkBox);

    expect(cb).toHaveBeenCalledTimes(2);
    expect(cb.mock.calls[0][0]).toEqual(
      expect.objectContaining({ ...baseItem, checked: true, count: 1 })
    );
    expect(cb.mock.calls[1][0]).toEqual(
      expect.objectContaining({ ...baseItem, checked: false, count: 0 })
    );
  });

  it("Renders the add button, it is clickable and fires the callback with the item", async () => {
    const cb = jest.fn();

    render(
      <CheckOutDialogListItem
        {...{ ...baseProps, onItemChangeCallback: cb }}
      />,
      { wrapper: List }
    );

    const addButton = screen.getByLabelText("add");

    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeEnabled();

    await userEvent.click(addButton);
    await userEvent.click(addButton);

    expect(cb).toHaveBeenCalledTimes(2);
    expect(cb.mock.calls[0][0]).toEqual(
      expect.objectContaining({ ...baseItem, checked: true, count: 1 })
    );
    expect(cb.mock.calls[1][0]).toEqual(
      expect.objectContaining({ ...baseItem, checked: true, count: 2 })
    );
  });

  it("Renders the remove button, it is clickable and fires the callback with the item", async () => {
    const cb = jest.fn();

    render(
      <CheckOutDialogListItem
        {...{ ...baseProps, onItemChangeCallback: cb }}
      />,
      { wrapper: List }
    );

    const addButton = screen.getByLabelText("add");
    const removeButton = screen.getByLabelText("remove");

    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toBeDisabled();

    await userEvent.click(addButton);

    expect(removeButton).toBeEnabled();

    await userEvent.click(addButton);
    await userEvent.click(removeButton);
    await userEvent.click(removeButton);

    expect(cb).toHaveBeenCalledTimes(4);
    expect(cb.mock.calls[0][0]).toEqual(
      expect.objectContaining({ ...baseItem, checked: true, count: 1 })
    );
    expect(cb.mock.calls[1][0]).toEqual(
      expect.objectContaining({ ...baseItem, checked: true, count: 2 })
    );
    expect(cb.mock.calls[2][0]).toEqual(
      expect.objectContaining({ ...baseItem, checked: true, count: 1 })
    );
    expect(cb.mock.calls[3][0]).toEqual(
      expect.objectContaining({ ...baseItem, checked: false, count: 0 })
    );
  });
});
