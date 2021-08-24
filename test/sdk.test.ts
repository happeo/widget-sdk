import sdk from '../src/index';

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
});

describe('Init', () => {
  test('Should init properly and send an analytics event', async () => {
    const api = new sdk.Happeo('123');
    expect(api.getWidgetId()).toBe('123');
  });

  test('Should init properly and send an analytics event by using init', async () => {
    const api = new sdk.Happeo();
    await api.init('123');
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
    const api = new sdk.Happeo();
    expect(api.getCurrentUser()).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('user.oAuthBegin()', async () => {
    const api = new sdk.Happeo();
    expect(api.oAuthBegin()).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('widget.getContext()', async () => {
    const api = new sdk.Happeo();
    expect(api.getContext()).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('user.getJWT()', async () => {
    const api = new sdk.Happeo();
    expect(api.getJWT()).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('user.getContent()', async () => {
    const api = new sdk.Happeo();
    expect(api.getContent()).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('user.setContent()', async () => {
    const api = new sdk.Happeo();
    expect(api.setContent('test')).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('user.getSettings()', async () => {
    const api = new sdk.Happeo();
    expect(api.getSettings()).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('user.setSettings()', async () => {
    const api = new sdk.Happeo();
    expect(api.setSettings({})).rejects.toThrow(INIT_ERROR_MSG);
  });
  test('user.declareSettings()', async () => {
    const api = new sdk.Happeo();
    expect(api.declareSettings({}, () => {})).rejects.toThrow(INIT_ERROR_MSG);
  });
});
