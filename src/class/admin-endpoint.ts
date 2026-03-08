import $api from "@/utils/api";
import { AdminEndpointInterface } from "./interface/admin-endpoint-interface";

export class AdminEndpoint implements AdminEndpointInterface {
  axios = $api;

  async getAllUsers(): Promise<unknown> {
    const response = await this.axios.get("/admin/users");
    return response.data;
  }

  async getVendors(): Promise<unknown> {
    const response = await this.axios.get("/admin/vendors");
    return response.data;
  }

  async getStats(): Promise<unknown> {
    const response = await this.axios.get("/admin/stats");
    return response.data;
  }

  async approveVendor(vendorId: string): Promise<unknown> {
    const response = await this.axios.post(`/admin/vendors/${vendorId}/approve`);
    return response.data;
  }
}
