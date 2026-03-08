import { AxiosInstance } from "axios";

export interface VendorEndpointInterface {
  axios: AxiosInstance;
  getProducts(): Promise<unknown>;
  addProduct(data: unknown): Promise<unknown>;
  updateProduct(id: string, data: unknown): Promise<unknown>;
  deleteProduct(id: string): Promise<unknown>;
  getOrders(): Promise<unknown>;
}
