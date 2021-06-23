import { trackEvent } from '../analytics';
import { getCustomWidgetGlobal } from '../globals';
import { getWidgetId } from '../initialise';
import { ANALYTICS_EVENTS, WidgetContent, WidgetContext } from '../interfaces';

/**
 * Gets the context of the widget.Who is viewing the widget and where is this widget being displayed
 *
 * @returns Context of the widget.
 */
export const getContext = async (): Promise<WidgetContext> => {
  try {
    const widgetId = getWidgetId();
    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.getContext',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.getContext(widgetId);
  } catch (error) {
    throw error;
  }
};

/**
 * Gets the JWT for the widget. JWT includes signed data from the user & organisation
 *
 * @returns string JWT
 */
export const getJWT = async (): Promise<string> => {
  try {
    const widgetId = getWidgetId();
    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.getJWT',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.getJWT(widgetId);
  } catch (error) {
    throw error;
  }
};

/**
 * Gets the content for the widget. Depending on where widget is shown, different content will be delivered
 *
 * @returns Content for the widget. String content and object properties
 */
export const getContent = async (): Promise<WidgetContent> => {
  try {
    const widgetId = getWidgetId();
    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.getContent',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.getContent(widgetId);
  } catch (error) {
    throw error;
  }
};

/**
 * Does not perform remote calls itself, depending where widget is displayed, this may include
 * an automatic remote call.
 *
 * @param content Stringified content to save
 * @param properties Object properties to save
 * @returns void
 */
export const setContent = async (
  content: string,
  properties: any
): Promise<any> => {
  try {
    const widgetId = getWidgetId();
    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.setContent',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.setContent(content, properties, widgetId);
  } catch (error) {
    throw error;
  }
};