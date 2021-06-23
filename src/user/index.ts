import { trackEvent } from '../analytics';
import { getCustomWidgetGlobal } from '../globals';
import { getWidgetId } from '../initialise';
import { ANALYTICS_EVENTS, User } from '../interfaces';

/**
 * Get the current happeo user who is viewing this widget
 *
 * @returns Happeo user object
 */
export const getCurrentUser = async (): Promise<User> => {
  try {
    const widgetId = getWidgetId();
    const api = await getCustomWidgetGlobal();

    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'user.getCurrentUser',
    });
    return api.user.getCurrentUser(widgetId);
  } catch (error) {
    throw error;
  }
};

/**
 * Function that initialises oAuth flow. This requires oAuthUrl to be specified for the
 * widget. The flow opens up a popup that ends up in marketplace.happeo.com oauth flow
 * ending page that will report the result back to this function.
 *
 * @returns Promise. Success = oAuth succeeded, Failure = oAuth failed
 */
export const oAuthBegin = async (): Promise<void> => {
  try {
    const widgetId = getWidgetId();
    const api = await getCustomWidgetGlobal();
    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'user.oAuthBegin',
    });

    return api.user.oAuthBegin(widgetId);
  } catch (error) {
    throw error;
  }
};
