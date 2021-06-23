import { init } from './initialise';
import { UserApi } from './user';
import { WidgetApi } from './widget';

export default {
  init,
  user: UserApi,
  widget: WidgetApi,
};
