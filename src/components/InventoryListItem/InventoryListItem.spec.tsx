import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import InventoryListItem, { InventoryListItemType } from "./InventoryListItem";
import InventoryItem from "../../types/InventoryItem";

const baseItem: InventoryItem = {
  _id: "idforbaseitem",
  checked: false,
  serial: "serialforbaseitem",
  description: "descriptionforbaseitem",
  count: 0,
  maxCount: 2,
};

const baseProps = {
  initialItem: baseItem,
  itemType: "checkin" as InventoryListItemType,
  callback: jest.fn(),
};

describe("<InventoryListItem />", () => {
  describe.each([
    "checkin" as InventoryListItemType,
    "checkout" as InventoryListItemType,
  ])("Rendering the item with type: '%s'", (itemType) => {
    it("The serial is in the document", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      expect(screen.getByText(baseItem.serial)).toBeInTheDocument();
    });

    it("The description is in the document", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      expect(screen.getByText(baseItem.description)).toBeInTheDocument();
    });

    it("The count is 0 in the document", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("Renders the checkbox and it is unchecked", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("Renders the add button and it is enabled", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      expect(screen.getByLabelText("add")).toBeInTheDocument();
      expect(screen.getByLabelText("add")).toBeEnabled();
    });

    it("Renders the remove button and it is disabled", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      expect(screen.getByLabelText("remove")).toBeInTheDocument();
      expect(screen.getByLabelText("remove")).not.toBeEnabled();
    });
  });

  describe.each([
    "checkin" as InventoryListItemType,
    "checkout" as InventoryListItemType,
  ])("Checkbox functionality with type: '%s'", (itemType) => {
    it("Changes to selected when clicked", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      const checkbox = screen.getByRole("checkbox");

      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it("Sets the count of the item to one when selected", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      const checkbox = screen.getByRole("checkbox");

      expect(screen.getByText("0")).toBeInTheDocument();
      userEvent.click(checkbox);
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("Sets the count of the item to zero when deselected", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      const checkbox = screen.getByRole("checkbox");

      userEvent.click(checkbox);
      expect(screen.getByText("1")).toBeInTheDocument();
      userEvent.click(checkbox);
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe.each([
    "checkin" as InventoryListItemType,
    "checkout" as InventoryListItemType,
  ])("Add button functionality with type: '%s'", (itemType) => {
    it("Changes to selected when clicked", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      const checkbox = screen.getByRole("checkbox");
      const addButton = screen.getByLabelText("add");

      userEvent.click(addButton);
      expect(checkbox).toBeChecked();
    });

    it("Sets the count of the item to one when clicked", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      const addButton = screen.getByLabelText("add");

      expect(screen.getByText("0")).toBeInTheDocument();
      userEvent.click(addButton);
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("Sets the count of the item to two when clicked twice", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      const addButton = screen.getByLabelText("add");

      userEvent.click(addButton);
      expect(screen.getByText("1")).toBeInTheDocument();
      userEvent.click(addButton);
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  describe("Add button functionality (special) with type: 'checkout'", () => {
    it("Disables the add button when max count is reached", async () => {
      render(
        <InventoryListItem
          {...{ ...baseProps, itemType: "checkout" as InventoryListItemType }}
        />
      );

      const addButton = screen.getByLabelText("add");

      userEvent.click(addButton);
      userEvent.click(addButton);
      expect(addButton).not.toBeEnabled();
    });
  });

  describe.each([
    "checkin" as InventoryListItemType,
    "checkout" as InventoryListItemType,
  ])("Remove button functionality with type: '%s'", (itemType) => {
    it("Is enabled when count is greater than zero", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      const addButton = screen.getByLabelText("add");
      const removeButton = screen.getByLabelText("remove");

      expect(removeButton).not.toBeEnabled();
      userEvent.click(addButton);
      expect(removeButton).toBeEnabled();
    });

    it("Sets the count of the item to zero when count is one and it is clicked", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      const addButton = screen.getByLabelText("add");
      const removeButton = screen.getByLabelText("remove");

      userEvent.click(addButton);
      expect(screen.getByText("1")).toBeInTheDocument();
      userEvent.click(removeButton);
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("Sets the count of the item to one when count is two and it is clicked", async () => {
      render(<InventoryListItem {...{ ...baseProps, itemType: itemType }} />);

      const addButton = screen.getByLabelText("add");
      const removeButton = screen.getByLabelText("remove");

      userEvent.click(addButton);
      userEvent.click(addButton);
      expect(screen.getByText("2")).toBeInTheDocument();
      userEvent.click(removeButton);
      expect(screen.getByText("1")).toBeInTheDocument();
    });
  });
});
