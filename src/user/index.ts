import { getCustomWidgetGlobal } from '../globals';
import { User } from '../interfaces';

export const getCurrentUser = async (): Promise<User> => {
  try {
    const api = await getCustomWidgetGlobal();
    return api.widget.getCurrentUser();
  } catch (error) {
    throw error;
  }
};
