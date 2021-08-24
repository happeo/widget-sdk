import sdk from '../src/index';

const mockedtracks = jest.fn();

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
    const api = await sdk.api.init('123');
    expect(api.getWidgetId()).toBe('123');
    expect(mockedtracks).toBeCalledWith(
      'trackClient',
      expect.objectContaining({
        name: 'Custom widget: initialise',
        properties: { widgetId: '123' },
      })
    );
  });
});
