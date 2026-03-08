import $api from "@/utils/api";
import { UserEndpointInterface } from "./interface/user-endpoint-interface";

export class UserEndpoint implements UserEndpointInterface {
  axios = $api;

  async getProfile(): Promise<unknown> {
    const response = await this.axios.get("/user/profile");
    return response.data;
  }

  async updateProfile(data: unknown): Promise<unknown> {
    const response = await this.axios.put("/user/profile", data);
    return response.data;
  }

  async getOrders(): Promise<unknown> {
    const response = await this.axios.get("/user/orders");
    return response.data;
  }
}
