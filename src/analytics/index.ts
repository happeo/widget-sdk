import { getAnalyticsGlobal } from '../globals';
import { AnalyticsEvent, ANALYTICS_EVENTS } from '../interfaces';

/**
 * _sendToHappeo
 * Taps into global event exposed through Happeo source code
 *
 * @param round Count how many times tried
 * @param type Type of event
 * @param event ANALYTICS_EVENT to send
 */
async function _sendToHappeo(type: string, event: AnalyticsEvent) {
  const analyticsFn = await getAnalyticsGlobal();
  analyticsFn(type, event);
}

/**
 *
 * Sends an event to Happeo backend analytics
 *
 * @param eventName Event name to send
 * @param properties Properties to be sent with the event.
 */
export const trackEvent = (
  uniqueWidgetId: string,
  eventName: ANALYTICS_EVENTS,
  properties: any = {}
): void => {
  try {
    const splitWidgetId = uniqueWidgetId.split('_')[0];
    _sendToHappeo('trackClient', {
      name: eventName,
      properties: {
        widgetId: splitWidgetId,
        uniqueId: uniqueWidgetId,
        ...properties,
      },
      timestamp: Date.now(),
    });
  } catch (error) {
    throw error;
  }
};
