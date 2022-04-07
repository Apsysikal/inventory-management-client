import React, { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ItemTable from "./ItemTable";
import InventoryItem from "../../types/InventoryItem";

const baseListItems: Array<InventoryItem> = [
  {
    _id: "thisisalongidforitemone",
    serial: "itemoneserial",
    description: "itemonedescription",
    count: 0,
  },
];

const baseProps: ComponentProps<typeof ItemTable> = {
  listItems: baseListItems,
  searchText: "",
};

describe("<ItemTable />", () => {
  it("Renders the table header", async () => {
    render(<ItemTable {...baseProps} />);

    expect(screen.getByText("Bezeichnung")).toBeInTheDocument();
    expect(screen.getByText("Seriennummer")).toBeInTheDocument();
    expect(screen.getByText("Anzahl (St)")).toBeInTheDocument();
  });

  it("Renders the item", async () => {
    render(<ItemTable {...baseProps} />);

    expect(screen.getByText(baseListItems[0].serial)).toBeInTheDocument();
    expect(screen.getByText(baseListItems[0].description)).toBeInTheDocument();
    expect(screen.getByText(baseListItems[0].count)).toBeInTheDocument();
  });

  it("Renders the item when the search is set to 'one'", async () => {
    render(<ItemTable {...{ ...baseProps, searchText: "one" }} />);

    expect(screen.getByText(baseListItems[0].serial)).toBeInTheDocument();
    expect(screen.getByText(baseListItems[0].description)).toBeInTheDocument();
    expect(screen.getByText(baseListItems[0].count)).toBeInTheDocument();
  });

  it("Does not render the item when the search is set to 'two'", async () => {
    render(<ItemTable {...{ ...baseProps, searchText: "two" }} />);

    expect(screen.queryByText(baseListItems[0].serial)).not.toBeInTheDocument();
    expect(
      screen.queryByText(baseListItems[0].description)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(baseListItems[0].count)).not.toBeInTheDocument();
  });
});
