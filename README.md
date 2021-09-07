# Happeo widget SDK

Start building your own widget in Happeo!

The widget SDK allows you to tap directly to Happeo apis and content in order to create fully customisable widgets.

## Important

We are moving to open Beta with custom widget components, which includes this widgetSDK. That means we are still gathering feedback from developers on how to improve the SDK. There should not be any breaking changes to the SDK, however please do keep in mind the current alpha/beta -state.

## How to use

Install the widget SDK to your Happeo Widget project. See examples from [Custom Widget Templates](https://github.com/happeo/custom-widget-templates).

```
npm install @happeo/widget-sdk
```

In your app, import the SDK and run `const widgetApi = await widgetSDK.api.init(uniqueWidgetId)` in order to start using it:

```
import widgetSDK from "@happeo/widget-sdk";

const { api, uikit } = widgetSDK;

const myAwesomeWidget = ({uniqueId}) => {
    const [user, setUser] = useState();
    const [widgetApi, setWidgetApi] = useState();

    useEffect(() => {
        const init = async () => {
            const api = await api.init(uniqueId);
            setUser(await api.getCurrentUser());
            setWidgetApi(api)
        }
        init();
    },[uniqueId]);

    return (
        <p>Hello world, {user?.name?.fullName}!</p>
    )
};
```

## More information

For detailed documentation, please visit the wiki:
https://github.com/happeo/widgets-sdk/wiki
