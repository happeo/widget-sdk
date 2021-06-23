import { trackEvent } from '../analytics';
import { getCustomWidgetGlobal } from '../globals';
import { ANALYTICS_EVENTS, User } from '../interfaces';
import { getWidgetId } from '../widget';

export namespace UserApi {
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
}
