import api from './api';
import { EventService } from './services/EventService';
import mockedApi from './_mocked/api';
export * from './interfaces';

export default {
  api: process.env.MOCK_WIDGET_SDK ? mockedApi : api,
  uikit: window.__customWidget?.uikit,
  events: EventService.getInstance()
};
