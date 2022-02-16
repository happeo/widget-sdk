import { trackEvent } from '../analytics';
import { getCustomWidgetGlobal } from '../globals';
import { ANALYTICS_EVENTS, User } from '../interfaces';

/**
 * Get the current happeo user who is viewing this widget
 *
 * @returns Happeo user object
 */
export const getCurrentUser = async (uniqueWidgetId: string): Promise<User> => {
  try {
    const api = await getCustomWidgetGlobal();

    trackEvent(uniqueWidgetId, ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'user.getCurrentUser',
    });
    return api.user.getCurrentUser(uniqueWidgetId);
  } catch (error) {
    throw error;
  }
};

/**
 * Get user from Happeo api
 *
 * @returns Happeo user object
 */
export const getUser = async (
  uniqueWidgetId: string,
  userId: string
): Promise<User> => {
  try {
    const api = await getCustomWidgetGlobal();

    trackEvent(uniqueWidgetId, ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'user.getUser',
    });
    return api.user.getUser(userId);
  } catch (error) {
    throw error;
  }
};

/**
 * Get user from Happeo api
 *
 * @param query Search query
 * @param options pagination options
 * @returns Array of Happeo user objects
 */
export const searchUsers = async (
  uniqueWidgetId: string,
  query: string,
  options: { page: number; pageSize: number }
): Promise<{ total: number; hits: User }> => {
  try {
    const api = await getCustomWidgetGlobal();

    trackEvent(uniqueWidgetId, ANALYTICS_EVENTS.WIDGET_REQUEST, {
      functionName: 'user.searchUsers',
    });

    return api.user.searchUsers(query, options);
  } catch (error) {
    throw error;
  }
};
