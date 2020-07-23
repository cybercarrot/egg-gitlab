import { Gitlab } from "@gitbeaker/node";

declare module "egg" {
  // extend app
  interface Application {
    gitlab: typeof Gitlab;
  }

  type Client = {
    host: string;
    token: string;
  };

  // extend your config
  interface EggAppConfig {
    gitlab: {
      client: Client;
    };
  }
}
