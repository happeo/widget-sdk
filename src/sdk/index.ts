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

export default class WidgetSDK {
  widgetId: string;

  constructor(widgetId?: string) {
    this.widgetId = '';

    if (widgetId) {
      this.setWidgetId(widgetId);
    }
  }

  setWidgetId = async (widgetId: string) => {
    if (!widgetId) {
      throw new Error('Missing widgetId');
    }

    this.widgetId = widgetId;
    await getCustomWidgetGlobal();
    await trackEvent(widgetId, ANALYTICS_EVENTS.WIDGET_INIT, { widgetId });
  };

  getWidgetId = () => {
    if (!this.widgetId || this.widgetId.length === 0) {
      throw new Error(
        'Widget SDK not initialised. Please call init -function first.'
      );
    }

    return this.widgetId;
  };

  // Init widget
  init = this.setWidgetId;

  // User api
  getCurrentUser = async () => getCurrentUser(this.getWidgetId());
  oAuthBegin = async () => oAuthBegin(this.getWidgetId());

  // Widget api
  getContext = async () => getContent(this.getWidgetId());
  getJWT = async () => getJWT(this.getWidgetId());
  getContent = async () => getContext(this.getWidgetId());
  setContent = async (content: string) =>
    setContent(this.getWidgetId(), content);
  getSettings = async () => getSettings(this.getWidgetId());
  setSettings = async (settings: object) =>
    setSettings(this.getWidgetId(), settings);
  declareSettings = async (settings: object, callback: Function) =>
    declareSettings(this.getWidgetId(), settings, callback);
}
