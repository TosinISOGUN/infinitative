import $api from "@/utils/api";
import { PublicEndpointInterface } from "./interface/public-endpoint-interface";

export class PublicEndpoint implements PublicEndpointInterface {
  axios = $api;

  async login(data: unknown): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
}
