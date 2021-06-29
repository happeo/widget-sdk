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
 * @returns void
 */
export const setContent = async (content: string): Promise<any> => {
  try {
    if (typeof content !== 'string') {
      throw new Error('Invalid content type, only string allowed.');
    }

    const widgetId = getWidgetId();
    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.setContent',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.setContent(content, widgetId);
  } catch (error) {
    throw error;
  }
};

/**
 * Gets widget settings
 *
 * @returns Object settings
 */
export const getSettings = async (): Promise<any> => {
  try {
    const widgetId = getWidgetId();
    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.getSettings',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.getSettings(widgetId);
  } catch (error) {
    throw error;
  }
};

/**
 * Does not perform remote calls itself, depending where widget is displayed, this may include
 * an automatic remote call.
 *
 * @param settings Object settings to save
 * @returns void
 */
export const setSettings = async (settings: object): Promise<any> => {
  try {
    if (typeof settings !== 'object') {
      throw new Error('Invalid content type, only object allowed.');
    }

    const widgetId = getWidgetId();
    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.setSettings',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.setSettings(settings, widgetId);
  } catch (error) {
    throw error;
  }
};

/**
 * Creates settings to the Happeo UI that the user can interact with
 *
 * @param settings Array of Objects settings to save
 * @returns void
 */
export const declareSettings = async (settings: object, callback: Function) => {
  try {
    if (typeof settings !== 'object') {
      throw new Error('Invalid content type, only object allowed.');
    }
    if (typeof callback !== 'function') {
      throw new Error('Missing callback function');
    }

    const widgetId = getWidgetId();
    trackEvent(ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.declareSettings',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.declareSettings(settings, callback, widgetId);
  } catch (error) {
    throw error;
  }
};
