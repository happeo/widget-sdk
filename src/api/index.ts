import { trackEvent } from '../analytics';
import { getCustomWidgetGlobal } from '../globals';
import { ANALYTICS_EVENTS, UploadInput } from '../interfaces';
import { getCurrentUser } from '../user';
import { uploadImage } from '../upload';
import {
  declareSettings,
  getContent,
  getContext,
  getJWT,
  getSettings,
  reportError,
  setContent,
  setSettings,
} from '../widget';

export default class widgetApi {
  uniqueWidgetId: string;

  constructor(uniqueWidgetId: string) {
    if (typeof uniqueWidgetId === 'undefined' || uniqueWidgetId.length === 0) {
      throw new Error(
        'Call "await widgetApi.init(uniqueWidgetId)" in order to initialise widgetApi.'
      );
    }

    this.uniqueWidgetId = uniqueWidgetId;
  }

  static async init(uniqueWidgetId: string) {
    if (!uniqueWidgetId) {
      throw new Error('Missing uniqueWidgetId');
    }

    await getCustomWidgetGlobal();
    await trackEvent(uniqueWidgetId, ANALYTICS_EVENTS.WIDGET_INIT, {});

    return new widgetApi(uniqueWidgetId);
  }

  getWidgetId = () => {
    if (!this.uniqueWidgetId || this.uniqueWidgetId.length === 0) {
      throw new Error(
        'Widget SDK not initialised. Please call init -function first.'
      );
    }

    return this.uniqueWidgetId;
  };

  // User api
  getCurrentUser = async () => getCurrentUser(this.getWidgetId());

  // Widget api
  reportError = (error: Error | string) =>
    reportError(this.getWidgetId(), error);
  getContext = async () => getContext(this.getWidgetId());
  getJWT = async () => getJWT(this.getWidgetId());
  getContent = async () => getContent(this.getWidgetId());
  setContent = async (content: string) =>
    setContent(this.getWidgetId(), content);
  getSettings = async () => getSettings(this.getWidgetId());
  setSettings = async (settings: object) =>
    setSettings(this.getWidgetId(), settings);
  declareSettings = async (settings: object, callback: Function) =>
    declareSettings(this.getWidgetId(), settings, callback);

  // Image upload api
  uploadImage = (input: UploadInput) => uploadImage(this.getWidgetId(), input);
}
