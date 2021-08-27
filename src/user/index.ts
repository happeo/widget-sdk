import { trackEvent } from '../analytics';
import { getCustomWidgetGlobal } from '../globals';
import { ANALYTICS_EVENTS, User } from '../interfaces';

/**
 * Get the current happeo user who is viewing this widget
 *
 * @returns Happeo user object
 */
export const getCurrentUser = async (widgetId: string): Promise<User> => {
  try {
    const api = await getCustomWidgetGlobal();

    trackEvent(widgetId, ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'user.getCurrentUser',
    });
    return api.user.getCurrentUser(widgetId);
  } catch (error) {
    throw error;
  }
};
