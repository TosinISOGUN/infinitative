import { AxiosInstance } from "axios";

export interface UserEndpointInterface {
  axios: AxiosInstance;
  getProfile(): Promise<unknown>;
  updateProfile(data: unknown): Promise<unknown>;
  getOrders(): Promise<unknown>;
}
