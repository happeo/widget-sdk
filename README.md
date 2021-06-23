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

import happeo from "@happeo/widget-sdk";

await happeo.init("my-widget-id");
// Start using SDK

```

## SDK requests

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
