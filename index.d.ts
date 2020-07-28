import { Gitlab } from "@gitbeaker/core";

declare module "egg" {
  // extend app
  interface Application {
    gitlab: InstanceType<typeof Gitlab>;
  }

  type GitlabClient = {
    host: string;
    token: string;
  };

  // extend your config
  interface EggAppConfig {
    gitlab: {
      client: GitlabClient;
    };
  }
}
