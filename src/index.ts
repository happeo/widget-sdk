import { init } from './initialise';
import * as user from './user';
import * as widget from './widget';

export default {
  happeo: {
    init,
    user,
    widget,
  },
  uikit: window.__customWidget?.uikit,
};
