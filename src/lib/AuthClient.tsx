import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface IAccount {
  id: string;
  name: string;
  scopes: string[];
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export class AuthenticationClient {
  private readonly BACKEND_URL = "http://localhost:3001";

  private instance: AxiosInstance;
  private accounts: IAccount[] = [];
  private activeAccount: IAccount | undefined = undefined;

  constructor(options?: AxiosRequestConfig) {
    this.instance = axios.create(options);
  }

  login = (provider: string) => {
    const redirectUrl = `${this.BACKEND_URL}/user/auth/${provider}`;
    window.location.replace(redirectUrl);

    console.debug(`Login called. Redirecting to: ${redirectUrl}`);
  };

  logout = () => {
    throw new Error("Method not implemented.");
  };

  addAccount = (account: IAccount) => {
    const { id, tokens } = account;
    const existingAccount = this.findAccountById(id);

    if (existingAccount) return existingAccount;

    console.debug(`Adding new account: ${id}`);
    console.debug(`Access Token: ${tokens.accessToken}`);
    this.accounts.push(account);
    return this.setActiveAccount(account);
  };

  removeAccount = (accountIdentifier: IAccount | string) => {
    const id = this.getIdFromAccountIdentifier(accountIdentifier);
    const account = this.findAccountById(id);

    if (!account) return;

    console.debug(`Deleting account: ${id}`);
    const index = this.accounts.indexOf(account);
    delete this.accounts[index];
  };

  setActiveAccount = (accountIdentifier: IAccount | string) => {
    const id = this.getIdFromAccountIdentifier(accountIdentifier);
    const account = this.findAccountById(id);

    console.debug(`Setting active account: ${id}`);
    return (this.activeAccount = account);
  };

  getActiveAccount = () => {
    return this.activeAccount;
  };

  private findAccountById = (id?: string) => {
    if (!id) return this.activeAccount;

    return this.accounts.find((account) => {
      return account.id === id;
    });
  };

  private getIdFromAccountIdentifier = (
    accountIdentifier: IAccount | string
  ) => {
    if (typeof accountIdentifier === "string") return accountIdentifier;

    return accountIdentifier.id;
  };
}
