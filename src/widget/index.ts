import { trackEvent } from '../analytics';
import { getCustomWidgetGlobal } from '../globals';
import { ANALYTICS_EVENTS, WidgetContent, WidgetContext } from '../interfaces';

let thisWidgetId = '';

export const setWidgetId = (widgetId: string) => {
  thisWidgetId = widgetId;
};

export const getWidgetId = (): string => thisWidgetId;

/**
 * Gets the context of the widget.Who is viewing the widget and where is this widget being displayed
 *
 * @returns Context of the widget.
 */
export const getWidgetContext = async (): Promise<WidgetContext> => {
  try {
    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'getWidgetContext',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.getContext(thisWidgetId);
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
    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'getJWT',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.getJWT(thisWidgetId);
  } catch (error) {
    throw error;
  }
};

/**
 * Gets the content for the widget. Depending on where widget is shown, different content will be delivered
 *
 * @returns Content for the widget. String content and object properties
 */
export const getWidgetContent = async (): Promise<WidgetContent> => {
  try {
    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'getWidgetContent',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.getContent(thisWidgetId);
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
export const setWidgetContent = async (
  content: string,
  properties: any
): Promise<any> => {
  try {
    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'setWidgetContent',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.setContent(content, properties, thisWidgetId);
  } catch (error) {
    throw error;
  }
};
