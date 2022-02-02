import { trackEvent } from '../analytics';
import { getCustomWidgetGlobal } from '../globals';
import { ANALYTICS_EVENTS } from '../interfaces';

/**
 * Happeo Metascaper extract
 *
 * @param widgetId WidgetId for tracking
 * @param url url to scrape
 */
export const metaScaperExtract = async (
  uniqueWidgetId: string,
  url: string
) => {
  try {
    const api = await getCustomWidgetGlobal();

    trackEvent(uniqueWidgetId, ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'metaScaper.extract',
    });
    return api.metaScraper.extract({ url });
  } catch (error) {
    throw error;
  }
};
