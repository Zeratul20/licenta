import { engine, producers, pathFn } from "@c11/engine.runtime";
import { render } from "@c11/engine.react";
import { App } from "./App";

const state: State = {};

export const createApp = () => {
  const app = engine({
    state,
    use: [render(<App />, "#app")],
  });

  return app;
};
