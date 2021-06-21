export const getCustomWidgetGlobal = async (
  round = 0
): Promise<any | undefined> => {
  try {
    if (window.__customWidget) {
      return window.__customWidget;
    } else if (round < 4) {
      const nextRound = round + 1;
      return setTimeout(
        async () => getCustomWidgetGlobal(nextRound),
        50 * round
      );
    } else {
      throw new Error('__customWidget not found');
    }
  } catch (error) {
    throw error;
  }
};

export const getAnalyticsGlobal = async (
  round = 0
): Promise<any | undefined> => {
  try {
    if (window.__ngrcttracks) {
      return window.__ngrcttracks;
    } else if (round < 4) {
      const nextRound = round + 1;
      return setTimeout(
        async () => getCustomWidgetGlobal(nextRound),
        50 * round
      );
    } else {
      throw new Error('__ngrcttracks not found');
    }
  } catch (error) {
    throw error;
  }
};
