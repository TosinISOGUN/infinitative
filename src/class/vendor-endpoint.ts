import $api from "@/utils/api";
import { VendorEndpointInterface } from "./interface/vendor-endpoint-interface";

export class VendorEndpoint implements VendorEndpointInterface {
  axios = $api;

  async getProducts(): Promise<unknown> {
    const response = await this.axios.get("/vendor/products");
    return response.data;
  }

  async addProduct(data: unknown): Promise<unknown> {
    const response = await this.axios.post("/vendor/products", data);
    return response.data;
  }

  async updateProduct(id: string, data: unknown): Promise<unknown> {
    const response = await this.axios.put(`/vendor/products/${id}`, data);
    return response.data;
  }

  async deleteProduct(id: string): Promise<unknown> {
    const response = await this.axios.delete(`/vendor/products/${id}`);
    return response.data;
  }

  async getOrders(): Promise<unknown> {
    const response = await this.axios.get("/vendor/orders");
    return response.data;
  }
}
