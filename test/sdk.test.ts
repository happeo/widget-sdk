import sdk from '../src/index';
import { setWidgetId } from '../src/initialise';

const mockedtracks = jest.fn();
const INIT_ERROR_MSG =
  'Widget SDK not initialised. Please call init -function first.';

beforeEach(() => {
  const originalWindow = { ...window };
  const windowSpy = jest.spyOn(global, 'window', 'get');
  windowSpy.mockImplementation(
    () =>
      ({
        ...originalWindow,
        __customWidget: {},
        __ngrcttracks: mockedtracks,
      } as any)
  );
  setWidgetId('');
});

describe('Init', () => {
  test('Should init properly and send an analytics event', async () => {
    await sdk.happeo.init('123');
    expect(async () => await sdk.happeo.init('123')).not.toThrow();
    expect(mockedtracks).toBeCalledWith(
      'trackClient',
      expect.objectContaining({
        name: 'Custom widget: initialise',
        properties: { widgetId: '123' },
      })
    );
  });
});

describe('Not initialised state', () => {
  test('user.getCurrentUser()', async () => {
    expect(sdk.happeo.user.getCurrentUser()).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('user.oAuthBegin()', async () => {
    expect(sdk.happeo.user.oAuthBegin()).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('widget.getContext()', async () => {
    expect(sdk.happeo.widget.getContext()).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('user.getJWT()', async () => {
    expect(sdk.happeo.widget.getJWT()).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('user.getContent()', async () => {
    expect(sdk.happeo.widget.getContent()).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('user.setContent()', async () => {
    expect(sdk.happeo.widget.setContent('test')).rejects.toThrow(
      INIT_ERROR_MSG
    );
  });
  test('user.getSettings()', async () => {
    expect(sdk.happeo.widget.getSettings()).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('user.setSettings()', async () => {
    expect(sdk.happeo.widget.setSettings({})).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('user.declareSettings()', async () => {
    expect(sdk.happeo.widget.declareSettings({}, () => {})).rejects.toThrow(
      INIT_ERROR_MSG
    );
  });
});
