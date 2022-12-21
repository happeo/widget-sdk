declare global {
  interface Window {
    __ngrcttracks: any;
    __customWidget: any;
  }
}

enum SETTINGS_ITEM_TYPE {
  CHECKBOX = 'checkbox',
  COLOR = 'color',
  DROPDOWN = 'dropdown',
  LINK = 'help-link',
  NUMBER = 'number',
  PARAGRAPH = 'paragraph',
  TEXT = 'text',
  TOGGLE = 'toggle',
  UPLOAD = 'upload',
  URL = 'url',
}

interface OPTIONS_ITEM {
  label: string;
  value: string | number;
}

interface CROPPING_CONFIG {
  width: number;
  height: number;
}

export interface SETTING {
  placeholder: string;
  key: string;
  value: string;
  type: SETTINGS_ITEM_TYPE;
  options?: OPTIONS_ITEM;
  minValue?: number;
  maxValue?: number;
  enableCropping?: boolean;
  croppingConfig?: CROPPING_CONFIG;
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
  name: string;
  primaryDomain: string;
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
}

interface UserName {
  givenName: string;
  familyName: string;
  fullName: string;
}

interface OrgInfo {
  primary: boolean;
  department: string | null;
  costCenter: string | null;
  title: string | null;
}

interface AddressInfo {
  formatted: string | null;
  type: string | null;
}

interface PhonesInfo {
  value: string | null;
  type: string | null;
}

interface DateObject {
  millis: number | null;
  isoString: string | null;
}

export interface User {
  id: string;
  name: UserName;
  thumbnailPhotoUrl: string;
  primaryEmail: string;
  organizations: OrgInfo[];
  addresses: AddressInfo[];
  phones: PhonesInfo[];
  birthday: DateObject;
  organisation: Organisation;
  additionalInfo: UserAdditionalInfo;
}

interface UserAdditionalInfo {
  items: UserAdditionalInfoItem[];
}
interface UserAdditionalInfoItem {
  value: string;
  key: string;
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
