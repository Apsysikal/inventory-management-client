import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class Api {
  private instance: AxiosInstance;
  private baseUrl: string;
  private endpoint: string;

  constructor(url: string, endpoint: string) {
    this.baseUrl = url;
    this.endpoint = endpoint;
    this.instance = axios.create({
      baseURL: `${url}`,
      timeout: 5 * 1000,
    });
  }

  get<T>(config?: AxiosRequestConfig) {
    const url = this.getUrl(config);

    return this.instance.get<T>(url, config);
  }

  post<T>(data: any, config?: AxiosRequestConfig) {
    const url = this.getUrl(config);

    return this.instance.post<T>(url, data, config);
  }

  put<T>(data: any, config?: AxiosRequestConfig) {
    const url = this.getUrl(config);

    return this.instance.put<T>(url, data, config);
  }

  patch<T>(data: any, config?: AxiosRequestConfig) {
    const url = this.getUrl(config);

    return this.instance.patch<T>(url, data, config);
  }

  delete<T>(config?: AxiosRequestConfig) {
    const url = this.getUrl(config);

    return this.instance.delete<T>(url, config);
  }

  request<T>(config: AxiosRequestConfig) {
    return this.instance.request<T, AxiosResponse<T>, T>(config);
  }

  public getBaseUrl() {
    return this.baseUrl;
  }

  public getEndpoint() {
    return this.endpoint;
  }

  private getUrl(config?: AxiosRequestConfig) {
    if (config?.url) return this.instance.getUri(config);

    return this.instance.getUri({ url: this.endpoint });
  }
}

export { Api };
