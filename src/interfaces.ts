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

interface UploadEntry {
  file: File;
  type: string;
  id: string;
  title: string;
  displayAs: string;
  params: {
    now: string;
    later: string;
  };
  uri: string;
  url: string;
  uuid: string;
  uploading: boolean;
  uploadProgress: number;
}

export interface UploadInput {
  files: File[];
  startUpload?: (entry: UploadEntry) => void;
  updateUploadProgress?: (entry: UploadEntry) => void;
  onUploadError?: (id: string, error: Error) => void;
  chooseDestinationDirectory?: () => Promise<{ file: File }>;
}
