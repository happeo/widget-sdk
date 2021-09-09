export const getCustomWidgetGlobal = async (): Promise<any | undefined> => {
  window.__customWidget = {};
  return window.__customWidget;
};

export const getAnalyticsGlobal = async (): Promise<any | undefined> => {
  window.__ngrcttracks = () => {};
  return window.__ngrcttracks;
};
