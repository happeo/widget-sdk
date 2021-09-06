import { trackEvent } from '../analytics';
import { getCustomWidgetGlobal } from '../globals';
import { ANALYTICS_EVENTS, WidgetContent, WidgetContext } from '../interfaces';

/**
 * Returns a stringified error or empty string
 *
 * @param error any
 * @returns string
 */
const getStringifiedError = (error?: Error | string): string => {
  if (typeof error === 'string') {
    return error;
  }
  try {
    return JSON.stringify(error);
  } catch (error) {
    return '';
  }
};

/**
 * Reports error to the backend analytics. Automates error reporting to the developer.
 *
 * @param error any
 * @returns void
 */
export const reportError = (
  uniqueWidgetId: string,
  error?: Error | string
): void => {
  try {
    trackEvent(uniqueWidgetId, ANALYTICS_EVENTS.WIDGET_ERROR, {
      error: getStringifiedError(error),
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Gets the context of the widget.Who is viewing the widget and where is this widget being displayed
 *
 * @returns Context of the widget.
 */
export const getContext = async (
  uniqueWidgetId: string
): Promise<WidgetContext> => {
  try {
    trackEvent(uniqueWidgetId, ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.getContext',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.getContext(uniqueWidgetId);
  } catch (error) {
    throw error;
  }
};

/**
 * Gets the JWT for the widget. JWT includes signed data from the user & organisation
 *
 * @returns string JWT
 */
export const getJWT = async (uniqueWidgetId: string): Promise<string> => {
  try {
    trackEvent(uniqueWidgetId, ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.getJWT',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.getJWT(uniqueWidgetId);
  } catch (error) {
    throw error;
  }
};

/**
 * Gets the content for the widget. Depending on where widget is shown, different content will be delivered
 *
 * @returns Content for the widget. String content and object properties
 */
export const getContent = async (
  uniqueWidgetId: string
): Promise<WidgetContent> => {
  try {
    trackEvent(uniqueWidgetId, ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.getContent',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.getContent(uniqueWidgetId);
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
export const setContent = async (
  uniqueWidgetId: string,
  content: string
): Promise<any> => {
  try {
    if (typeof content !== 'string') {
      throw new Error('Invalid content type, only string allowed.');
    }

    trackEvent(uniqueWidgetId, ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.setContent',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.setContent(content, uniqueWidgetId);
  } catch (error) {
    throw error;
  }
};

/**
 * Gets widget settings
 *
 * @returns Object settings
 */
export const getSettings = async (uniqueWidgetId: string): Promise<any> => {
  try {
    trackEvent(uniqueWidgetId, ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.getSettings',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.getSettings(uniqueWidgetId);
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
export const setSettings = async (
  uniqueWidgetId: string,
  settings: object
): Promise<any> => {
  try {
    if (typeof settings !== 'object') {
      throw new Error('Invalid content type, only object allowed.');
    }

    trackEvent(uniqueWidgetId, ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.setSettings',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.setSettings(settings, uniqueWidgetId);
  } catch (error) {
    throw error;
  }
};

/**
 * Creates settings to the Happeo UI that the user can interact with
 *
 * @param settings Array of Objects settings to save
 * @param callback Callback function with updated data, runs on init and on every settings update
 * @returns void
 */
export const declareSettings = async (
  uniqueWidgetId: string,
  settings: object,
  callback: Function
) => {
  try {
    if (typeof settings !== 'object') {
      throw new Error('Invalid content type, only object allowed.');
    }
    if (typeof callback !== 'function') {
      throw new Error('Missing callback function');
    }

    trackEvent(uniqueWidgetId, ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'widget.declareSettings',
    });
    const api = await getCustomWidgetGlobal();
    return api.widget.declareSettings(settings, callback, uniqueWidgetId);
  } catch (error) {
    throw error;
  }
};
