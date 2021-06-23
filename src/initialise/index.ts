import { trackEvent } from '../analytics';
import { getCustomWidgetGlobal } from '../globals';
import { ANALYTICS_EVENTS } from '../interfaces';

export const init = async (widgetId: string): Promise<void> => {
  try {
    if (!widgetId) {
      throw new Error('Missing widgetId');
    }
    await getCustomWidgetGlobal();
    await trackEvent(ANALYTICS_EVENTS.WIDGET_INIT, { widgetId });
    setWidgetId(widgetId);
  } catch (error) {
    throw new Error();
  }
};
