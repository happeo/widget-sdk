import { trackEvent } from '../analytics';
import { getCustomWidgetGlobal } from '../globals';
import { ANALYTICS_EVENTS } from '../interfaces';
import { getCurrentUser, oAuthBegin } from '../user';
import {
  declareSettings,
  getContent,
  getContext,
  getJWT,
  getSettings,
  setContent,
  setSettings,
} from '../widget';

export default class widgetApi {
  widgetId: string;

  constructor(widgetId: string) {
    if (typeof widgetId === 'undefined' || widgetId.length === 0) {
      throw new Error(
        'Call "await widgetApi.init(widgetId)" in order to initialise widgetApi.'
      );
    }

    this.widgetId = widgetId;
  }

  static async init(widgetId: string) {
    if (!widgetId) {
      throw new Error('Missing widgetId');
    }

    await getCustomWidgetGlobal();
    await trackEvent(widgetId, ANALYTICS_EVENTS.WIDGET_INIT, {});

    return new widgetApi(widgetId);
  }

  getWidgetId = () => {
    if (!this.widgetId || this.widgetId.length === 0) {
      throw new Error(
        'Widget SDK not initialised. Please call init -function first.'
      );
    }

    return this.widgetId;
  };

  // User api
  getCurrentUser = async () => getCurrentUser(this.getWidgetId());
  oAuthBegin = async () => oAuthBegin(this.getWidgetId());

  // Widget api
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
}
