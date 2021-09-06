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

## SDK requests - happeo

`const api = await widgetSDK.api.init("uniqueId");`

Initialises the SDK. Requires string `uniqueId` as the parameter.

`api.getCurrentUser();`

Returns the full current user who is viewing this widget. This includes all user data and organisation data.

`api.reportError();`

Reports an error to the widget. This is used by automated error reporting by Happeo. We strongly recommend using this in order to know if your widget is misbehaving.

`api.getContext();`

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

`api.getJWT();`

Gets the JWT for the widget if the widget has attached scopes refreshes the JWT automatically if needed. Call this always before utilising the JWT because the JWT will expire and the user may idle on the page before interacting with your widget.

`api.getContent();`

Gets the content for the widget. Content is not specific to the widget, but to the context. As an example, if this widget is added to a page in 2 places, widget will have own content for both places.

Important note:
Everything in the content is indexed in the Happeo search. So when you set this content (see below), note that you should consider this when making decisions on the data structure.

`api.setContent();`

Sets string content to widget. This is the primary way of storing data in this widget. Data is stored in Happeo's servers.

Important note:
Everything in the content is indexed in the Happeo search. So when you set this content, note that you should consider this when making decisions on the data structure.

`api.getSettings();`

Gets the settings for this widget. These may include things like background color, font sizes or other things you want the user to configure.

The settings object is always a simple key - value object with no nested structures. If you want nested structures, then you need to stringify the value.

`api.setSettings();`

Sets settings for this widget. This can be useful if you want to save some properties in the settings object and not in the content.

`api.declareSettings();`

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

`api.uploadImage(input: UploadInput);`

Upload images to Happeo CDN with current user's credentials.

```
interface UploadInput {
  files: FileList;
  channelId: string;
  startUpload: (entry: UploadEntry) => void;
  updateUploadProgress: (entry: UploadEntry) => void;
  onUploadError: (id: string, error: Error) => void;
  chooseDestinationDirectory: () => Promise<{ file: File }>;
}
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
