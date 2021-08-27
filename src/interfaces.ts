declare global {
  interface Window {
    __ngrcttracks: any;
    __customWidget: any;
  }
}

export enum ANALYTICS_EVENTS {
  WIDGET_INIT = 'Custom widget: initialise',
  WIDGET_REQUEST = 'Custom widget: use sdk',
  WIDGET_ERROR = 'Custom widget: error',
}

export interface AnalyticsEvent {
  name: ANALYTICS_EVENTS;
  properties: any;
  timestamp: number;
}

export interface WidgetContext {
  userId: string;
  organisationId: string;
  token?: string;
  pageGroupId?: string;
  pageId?: string;
  localWidgetId?: string;
}

export interface WidgetContent {
  content: string;
  properties: any;
}

export interface Organisation {
  id: string;
}

export interface User {
  id: string;
  name: any;
  thumbnailPhotoUrl: string;
  primaryEmail: string;
  organisation: Organisation;
}
