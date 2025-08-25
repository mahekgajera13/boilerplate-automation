/**
 * @format
 *
 * global context used for sharing data from one suite to another suite
 */

interface GlobalContext {
  user: Record<string, unknown>;
  envData: Record<string, unknown>;
  resources: unknown[];
}

declare global {
  // eslint-disable-next-line no-var
  var context: GlobalContext;
}

const clearContext = () => {
    global.context = {
      user: {},
      envData: {},
      resources: [],
    } as GlobalContext;
  };
  
  global.context = {
    user: {},
    envData: {},
    resources: []
  } as GlobalContext;
  
  const context = () => global.context;
  
  export {
    context,
    clearContext,
  };