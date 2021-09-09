import { User, WidgetContext } from '../../interfaces';

export const user: User = {
  id: 'u123',
  name: {
    givenName: 'Bob',
    familyName: 'Johnson',
    fullName: 'Bob Johnson',
  },
  thumbnailPhotoUrl: '',
  primaryEmail: 'bob.johnson@mockdata.com',
  organizations: [
    { primary: true, department: 'Sales', costCenter: null, title: 'Manager' },
  ],
  addresses: [
    {
      formatted: 'Street 22',
      type: null,
    },
  ],
  phones: [
    {
      value: '+123456778',
      type: 'mobile',
    },
  ],
  birthday: {
    isoString: '2021-09-09T09:45:21.039Z',
    millis: 1631180721039,
  },
  organisation: {
    id: 'o123',
    name: 'Example org',
    primaryDomain: 'mockdata.com',
    logo: 'null',
    primaryColor: '#fff',
    secondaryColor: '#000',
  },
};

export const context: WidgetContext = {
  userId: 'u123',
  organisationId: 'o123',
};

const _content: { [key: string]: string } = {};

export const setContent = (uniqueId: string, content: string) => {
  _content[uniqueId] = content;
};

export const getContent = (uniqueId: string) => {
  return _content[uniqueId];
};

const _settings: { [key: string]: any } = {};

export const setSettings = (uniqueId: string, settings: any) => {
  _settings[uniqueId] = settings;
};

export const getSettings = (uniqueId: string) => {
  return _settings[uniqueId];
};
