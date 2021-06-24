# Happeo widget SDK

Start building your own widget in Happeo!

The widget SDK allows you to tap directly to Happeo apis and content in order to create fully customisable widgets.

## How to use

Install the widget SDK to your Happeo Widget project. See examples from [Custom Widget Templates](https://github.com/happeo/custom-widget-templates).

```



npm install @happeo/widget-sdk



```

In your app, import the SDK and run `init(widgetId)` in order to start using it:

```



import widgetSDK from "@happeo/widget-sdk";

const { happeo, uikit } = widgetSDK



const myAwesomeWidget = ({widgetId}) => {

const [user, setUser] = useState();



useEffect(() => {

const init = async () => {

await happeo.init(widgetId);

setUser(await happeo.user.getCurrentUser())

}

init();

},[widgetId])



return (

<uikit.typography.BodyUI>Hello world, {user && user.name.fullName}!</uikit.typography.BodyUI>

)

};



```

## SDK requests - happeo

**happeo.init("my-widget-id");**

Initialises the SDK. Requires string widget id as the parameter. Returns Promise.

**happeo.user.getCurrentUser();**

Returns the full current user who is viewing this widget. Returns Promise.

**happeo.user.oAuthBegin();**

Starts oAuth flow, which can be specified to the widget from the widget setup. Returns Promise.

**happeo.widget.getContext();**

Gets the context of the widget. Who is viewing the widget and where is this widget being displayed. Returns Promise.

**happeo.widget.getJWT();**

Gets the JWT for the widget. JWT includes signed data from the user & organisation. Returns Promise.

**happeo.widget.getContent();**

Gets the content for the widget. Depending on where widget is shown, different content will be delivered. Returns Promise.

**happeo.widget.setContent();**

Does not perform remote calls itself, depending where widget is displayed, this may include an automatic remote call. Returns Promise.

## SDK uikit

The Happeo UI Kit can be accessed through the `sdk.uikit` object. The reason why we exposed the uikit this way boils down to 2 points: 1) by doing this, we can keep the custom widget package size very small and 2) we use styled-components, which kind of makes this the only way to expose these components pure react custom widgets. _However, if you do find a way to works some magic that allows us to remove this approach, please make a PR in the [Custom Widget Templates](https://github.com/happeo/custom-widget-templates)._

To access the Happeo UI Kit components, you can do that by doing `sdk.uikit[namespace][componentName]`. An example could be `<sdk.uikit.buttons.ButtonPrimary>`, all props work as described in the public [UI kit documentation](https://uikit.happeo.com/).

Full list of available components can be found here:
https://uikit.happeo.com/
