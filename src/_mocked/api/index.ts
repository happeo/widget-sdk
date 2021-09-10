import { UploadInput } from '../../interfaces';
import { getCustomWidgetGlobal, getAnalyticsGlobal } from '../globals';

import {
  user,
  context,
  getContent,
  setContent,
  getSettings,
  setSettings,
} from './mockData';

export default class mockedWidgetApi {
  uniqueWidgetId: string;

  constructor(uniqueWidgetId: string) {
    console.log('***********************');
    console.log('WIDGET SDK IN MOCK MODE');
    console.log('***********************');

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
    await getAnalyticsGlobal();

    return new mockedWidgetApi(uniqueWidgetId);
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
  getCurrentUser = async () => user;

  // Widget api
  reportError = (error: Error | string) =>
    console.log('_MOCK reportError called', error);
  getContext = async () => context;
  getJWT = async () => 'JWT';
  getContent = async () => getContent(this.getWidgetId());
  setContent = async (content: string) =>
    setContent(this.getWidgetId(), content);
  getSettings = async () => getSettings(this.getWidgetId());
  setSettings = async (settings: object) =>
    setSettings(this.getWidgetId(), settings);
  declareSettings = async (_: object, callback: Function) => {
    callback({});
  };

  // Image upload api
  uploadImage = (input: UploadInput) =>
    console.log('_MOCK uploadImage called', this.getWidgetId(), input);
}
