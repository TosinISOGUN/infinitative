import { AxiosInstance } from "axios";

export interface AdminEndpointInterface {
  axios: AxiosInstance;
  getAllUsers(): Promise<unknown>;
  getVendors(): Promise<unknown>;
  getStats(): Promise<unknown>;
  approveVendor(vendorId: string): Promise<unknown>;
}
