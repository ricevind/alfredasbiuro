/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />
interface Window {
  ENV: {
    NODE_ENV: NodeJS.ProcessEnv["NODE_ENV"];
  };
}
