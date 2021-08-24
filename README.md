# Happeo widget SDK

Start building your own widget in Happeo!

The widget SDK allows you to tap directly to Happeo apis and content in order to create fully customisable widgets.

## How to use

Install the widget SDK to your Happeo Widget project. See examples from [Custom Widget Templates](https://github.com/happeo/custom-widget-templates).

```
npm install @happeo/widget-sdk
```

In your app, import the SDK and run `const widgetApi = new Happeo.init(widgetId)` in order to start using it:

```
import widgetSDK from "@happeo/widget-sdk";

const { Happeo, uikit } = widgetSDK;
const widgetApi = new Happeo();

const myAwesomeWidget = ({widgetId}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const init = async () => {
            await widgetApi.init(widgetId);
            setUser(await widgetApi.getCurrentUser());
        }
        init();
    },[widgetId]);

    return (
        <p>Hello world, {user?.name?.fullName}!</p>
    )
};
```

## SDK requests - happeo

`sdk.happeo.init("my-widget-id");`

Initialises the SDK. Requires string widget id as the parameter. If this widget receives prop `uniqueId`, use that to initialise the widget.

`sdk.happeo.getCurrentUser();`

Returns the full current user who is viewing this widget. This includes all user data and organisation data.

`sdk.happeo.oAuthBegin();`

Starts oAuth flow, which can be specified to the widget from the widget setup. If this field is not specified in the widget settings (admin panel or marketplace), this function will throw an error. NOTE: This also requires userId and organisationId scopes to be added to the widget permissions.

The oAuth flow should be used when your custom widget requires an external oauth that stores authentication keys to your own servers. This flow is protected by the generated JWT key, which is used to verify the oAuth flow callback in Happeo servers.

The function communicates back with a promise if the flow was successful.

`sdk.happeo.getContext();`

Gets the full context of the widget:

```

{
    userId: "123",
    organisationId: "223",
    editMode: true,
    token: "adadadad",
    scopedData: {
        user: {
            id: "123",
            primaryEmail: "example@example.com"
        },
        organisation: {
            id: "223"
        }
    },
    context: {
        hostname: "app.happeo.com",
        href: "https://app.happeo.com/...",
        pathname: "/pages/..."
    },
    location: {
        channelId: "333",
        pageId: "111",
        pageGroupId: "223",
        localWidgetId: "3443"
    }
}
```

`sdk.happeo.getJWT();`

Gets the JWT for the widget if the widget has attached scopes. JWT contains the scoped data. Also returned in the `sdk.happeo.getContext();`.

`sdk.happeo.getContent();`

Gets the content for the widget. Content is not specific to the widget, but to the context. As an example, if this widget is added to a page in 2 places, widget will have own content for both places.

Important note:
Everything in the content is indexed in the Happeo search. So when you set this content (see below), note that you should consider this when making decisions on the data structure.

`sdk.happeo.setContent();`

Sets string content to widget. This is the primary way of storing data in this widget. Data is stored in Happeo's servers.

Important note:
Everything in the content is indexed in the Happeo search. So when you set this content, note that you should consider this when making decisions on the data structure.

`sdk.happeo.getSettings();`

Gets the settings for this widget. These may include things like background color, font sizes or other things you want the user to configure.

The settings object is always a simple key - value object with no nested structures. If you want nested structures, then you need to stringify the value.

`sdk.happeo.setSettings();`

Sets settings for this widget. This can be useful if you want to save some properties in the settings object and not in the content.

`sdk.happeo.declareSettings();`

Creates new settings that are shown to the user in the Happeo UI. This allowes a seamless experience for the user where they can fill in overall configrutations for this widget.

The function takes in the settings object and a callback. The callback is returned on init, with the existing settings and on every settings change.

Settings object structure and example:

```
[
  {
    placeholder: "Text placeholder",
    key: "uniqueStringKey",
    value: "defaultValue",
    type: "color",
  },
  {
    placeholder: "Another setting",
    key: "anotherUniqueKey",
    value: "this is text",
    type: "text",
  },
]
```

### Widget setting types

Possible setting types are:
"checkbox", "color", "dropdown", "help-link", "number", "paragraph", "text", "toggle", "upload", "url".

**checkbox**

Presents a checkbox to the user. Checkbox requires either string "TRUE" or string "FALSE" and not proper booleans.

**color**

Presents a color picker for the user.

**dropdown**

Presents a dropdown to the user. Requires key `options` with `label` and `value`.
Example:

```
{
    placeholder: "Dropdown",
    key: "myDropdown",
    options: [
        {
            label: "Select 123",
            value: 123
        }
    ],
    type: "dropdown",
  }
```

**help-link**

Displays a help link to the user. Link opens in a new tab.

**number**

Displays a number selector to the user. Can include `minValue` and `maxValue`.

**paragraph**

Displays a paragraph type picker to the user. Note this is not a text field, but a selector to select either "h1", "h2", "h3", "p".

**text**

Displays a simple text field to the user.

**toggle**

Displays radio buttons to the user. Requires key `options` with `label` and `value`.
Example:

```
{
    placeholder: "Dropdown",
    key: "myDropdown",
    options: [
        {
            label: "Select 123",
            value: 123
        }
    ],
    type: "dropdown",
  }
```

**upload**

Displays an image upload for the user. Can be used with prop `enableCropping` -boolean and `croppingConfig` -object.

```
{
    ...configItem,
    enableCropping: true,
    croppingConfig: {
        width: 1234,
        height: 234
    }
  }
```

**url**

Displays a url field to the user.

## SDK uikit

The Happeo UI Kit can be accessed through the `sdk.uikit` object. The reason why we exposed components through this object, is so that we can give you the possibility to use some non-public-uikit components.

### Currenlty we support the following

`<sdk.uikit.ProviderWrapper />` = Wrapper for language and redux provider

This component is used in parallell with the `<sdk.uikit.RichTextEditor />`. It provides translations and storage for the child components.

`<sdk.uikit.RichTextEditor />` = Rich text editor

**Requires `<sdk.uikit.ProviderWrapper />` as a parent component**

Note that the editor is a very complex component that requires some knowledge on how it works. But here are the most important things to know:

- When adding callback functions, the editor will provide `this`, but you need to use a named function. So no `const dada = () => {}`, but `function onContentChanged() {}`.
- The callback function may, in some cases, create a re-rendering of the component. So be mindful of this when developing. Re-rendering will cause annoying caret jumping and clear the undo history.
- When you want the content of the editor, call `this.el.getContent();`.
- If you want to clear the editor, call `this.el.clearContent();`.
- If you need to access the editor before you get it through a callback. Attach a ref to the parent node and find it via `editorParent.current.querySelector(".fr-element")`.
- Focusing on editor can be done with `editor.setFocus()`. Note that the init takes a couple of milliseconds.
- Full list of methods can be found at [Froala editor's website](https://froala.com/wysiwyg-editor/docs/methods/).

**Props:**

| Props                       | Type     | Description                                                                                                                                                   |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content                     | string   | Content of the widget.                                                                                                                                        |
| type                        | string   | Editor type, creates different user experience for the editor. Supported values are "inline", "comment", "post", "article", "bare", "banner", "full", "hero". |
| showMentionPicker           | bool     | Shows mention picker                                                                                                                                          |
| showEmojiPicker             | bool     | Shows emoji picker                                                                                                                                            |
| showHashtagPicker           | bool     | Shows hashtag picker                                                                                                                                          |
| channelId                   | string   | If given, the mention picker will be targeted to this channel's members                                                                                       |
| maxNumberOfHashtags         | number   | Maximum allowed number of hashtags                                                                                                                            |
| opts                        | object   | Froala editor configurations. See Froala WYSIWYG editor v3 configurations.                                                                                    |
| hashtagAddedCallback        | function | Callback on hashtag added                                                                                                                                     |
| onFocused                   | function | Callback on focus event                                                                                                                                       |
| onBlurred                   | function | Callback on blur event                                                                                                                                        |
| onContentChanged            | function | Callback on content change event                                                                                                                              |
| onVideoInserted             | function | Callback on video inserted event                                                                                                                              |
| onImageUploaded             | function | Callback on image uploaded event                                                                                                                              |
| onImageInserted             | function | Callback on image inserted event                                                                                                                              |
| onImageRemoved              | function | Callback on image removed event                                                                                                                               |
| onCmdEnterShortcutTriggered | function | Callback on pressing cmd/ctrl+enter                                                                                                                           |
