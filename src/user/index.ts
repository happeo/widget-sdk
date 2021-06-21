import { trackEvent } from '../analytics';
import { getCustomWidgetGlobal } from '../globals';
import { ANALYTICS_EVENTS, User } from '../interfaces';
import { getWidgetId } from '../widget';

export const getCurrentUser = async (): Promise<User> => {
  try {
    const widgetId = getWidgetId();
    const api = await getCustomWidgetGlobal();

    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'getCurrentUser',
    });
    return api.widget.getCurrentUser(widgetId);
  } catch (error) {
    throw error;
  }
};
