import { trackEvent } from '../analytics';
import { getCustomWidgetGlobal } from '../globals';
import { ANALYTICS_EVENTS, UploadInput } from '../interfaces';

/**
 * Happeo Image upload
 *
 * @param widgetId WidgetId for tracking
 * @param input input for files
 */
export const uploadImage = async (widgetId: string, input: UploadInput) => {
  try {
    const api = await getCustomWidgetGlobal();

    trackEvent(widgetId, ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'upload.uploadImage',
    });
    return api.upload.uploadImage(
      input.files,
      undefined, // upcoming feature channelId, pagesId, orgId
      input.startUpload,
      input.updateUploadProgress,
      input.onUploadError,
      input.chooseDestinationDirectory
    );
  } catch (error) {
    throw error;
  }
};
