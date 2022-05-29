import { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { AccountInfo } from "@azure/msal-browser";

import UserInformation, { UserInformationProps } from "./UserInformation";

const baseAccountInfo: AccountInfo = {
  homeAccountId: "homeId",
  environment: "env",
  tenantId: "tenantId",
  username: "username",
  localAccountId: "localAccountId",
  name: undefined,
  idTokenClaims: undefined,
};

const baseProps: ComponentProps<typeof UserInformation> = {
  accountInfo: baseAccountInfo,
};

describe("<UserInformation />", () => {
  describe.each([
    ["John Doe", "JD"],
    ["Max Mustermann", "MM"],
    ["Mary Peach", "MP"],
  ])(
    "Rendering the information with username: %s",
    (accountName: string, initials: string) => {
      const props: UserInformationProps = {
        accountInfo: {
          ...baseAccountInfo,
          name: accountName,
        },
      };

      it("Renders the name", () => {
        render(<UserInformation {...props} />);

        expect(screen.getByText(accountName)).toBeInTheDocument();
      });

      it("Renders the initials in the avatar", () => {
        render(<UserInformation {...props} />);

        expect(screen.getByText(initials)).toBeInTheDocument();
      });
    }
  );

  describe("Providing ability to logout via a menu on avatar click", () => {
    const props: UserInformationProps = {
      accountInfo: {
        ...baseAccountInfo,
        name: "John Doe",
      },
    };

    it("Renders the avatar and it is clickable", () => {
      render(<UserInformation {...props} />);

      const avatar = screen.getByRole("button", { name: "JD" });

      expect(avatar).toBeEnabled();
    });

    it("Renders a menu when clicked", () => {
      render(<UserInformation {...props} />);

      const avatar = screen.getByRole("button", { name: "JD" });

      userEvent.click(avatar);

      expect(screen.getByText("Logout")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeVisible();
    });

    it("Renders a 'Logout' item in the menu and it is clickable", () => {
      render(<UserInformation {...props} />);

      const avatar = screen.getByRole("button", { name: "JD" });

      userEvent.click(avatar);

      const logoutButton = screen.getByText("Logout");

      expect(logoutButton).toBeInTheDocument();
      expect(logoutButton).toBeEnabled();
    });

    it("Closes the menu when the 'Logout' button is pressed", () => {
      render(<UserInformation {...props} />);

      const avatar = screen.getByRole("button", { name: "JD" });

      userEvent.click(avatar);

      const logoutButton = screen.getByText("Logout");

      userEvent.click(logoutButton);

      expect(screen.getByText("Logout")).not.toBeVisible();
    });
  });
});
