import { trackEvent } from '../analytics';
import { getCustomWidgetGlobal } from '../globals';
import { ANALYTICS_EVENTS } from '../interfaces';

let thisWidgetId = '';

export const setWidgetId = (widgetId: string) => {
  thisWidgetId = widgetId;
};

export const getWidgetId = (): string => {
  if (!thisWidgetId || thisWidgetId.length === 0) {
    throw new Error(
      'Widget SDK not initialised. Please call init -function first.'
    );
  }
  return thisWidgetId;
};

/**
 * Initialisation function for Happeo Widget SDK
 * If you try to use the SDK without first initialising, all requests will fail.
 *
 * @param widgetId Widget id
 */
export const init = async (widgetId: string): Promise<void> => {
  try {
    if (!widgetId) {
      throw new Error('Missing widgetId');
    }
    setWidgetId(widgetId);
    const api = await getCustomWidgetGlobal();
    await trackEvent(ANALYTICS_EVENTS.WIDGET_INIT, { widgetId });
  } catch (error) {
    throw error;
  }
};
