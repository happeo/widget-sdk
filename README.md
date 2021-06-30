# Happeo widget SDK

Start building your own widget in Happeo!

The widget SDK allows you to tap directly to Happeo apis and content in order to create fully customisable widgets.

## How to use

Install the widget SDK to your Happeo Widget project. See examples from [Custom Widget Templates](https://github.com/happeo/custom-widget-templates).

```
npm install @happeo/widget-sdk
```

In your app, import the SDK and run `happeo.init(widgetId)` in order to start using it:

```
import widgetSDK from "@happeo/widget-sdk";

const { happeo, uikit } = widgetSDK

const myAwesomeWidget = ({widgetId}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const init = async () => {
            await happeo.init(widgetId);
            setUser(await happeo.user.getCurrentUser());
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

Initialises the SDK. Requires string widget id as the parameter. Returns Promise.

`sdk.happeo.user.getCurrentUser();`

Returns the full current user who is viewing this widget. Returns Promise.

`sdk.happeo.user.oAuthBegin();`

Starts oAuth flow, which can be specified to the widget from the widget setup. Returns Promise.

`sdk.happeo.widget.getContext();`

Gets the context of the widget. Who is viewing the widget and where is this widget being displayed. Returns Promise.

`sdk.happeo.widget.getJWT();`

Gets the JWT for the widget. JWT includes signed data from the user & organisation. Returns Promise.

`sdk.happeo.widget.getContent();`

Gets the content for the widget. Depending on where widget is shown, different content will be delivered. Returns Promise.

`sdk.happeo.widget.setContent();`

Sets string content to widget. This is the primary way of storing data in this widget. Note that this content is also indexed and can be found in search. So if you store object keys or metadata here, those all will be searchable.

`sdk.happeo.widget.getSettings();`

Gets the settings for this widget. These may include things like background color, font sizes or other things you want the user to configure.

`sdk.happeo.widget.setSettings();`

Sets settings for this widget. This can be useful if you want to save some properties in the settings object and not in the content.

`sdk.happeo.widget.declareSettings();`

Creates new settings that are shown to the user in the Happeo UI. Creates a seamless experience for the user where they can fill in overall configrutations for this widget.

## SDK uikit

The Happeo UI Kit can be accessed through the `sdk.uikit` object. The reason why we exposed components through this object, is so that we can give you the possibility to use some non-public-uikit components.

### Currenlty we support the following

`<sdk.uikit.RichTextEditor />` = Rich text editor

Note that the editor is a very complex component that requires some knowledge on how it works. But here are the most important things to know:

- When adding callback functions, the editor will provide `this`, but you need to use a named function. So no `const dada = () => {}`, but `function onContentChanged() {}`.
- When you want the content of the editor, call `this.el.getContent();`.
- If you want to clear the editor, call `this.el.clearContent();`.
- If you need to access the editor before you get it through a callback. Attach a ref to the parent node and find it via `editorParent.current.querySelector(".fr-element")`.
- Focusing on editor can be done with `editor.setFocus()`. Note that the init takes a couple of milliseconds.
- Full list of methods can be found at [Froala editor's website](https://froala.com/wysiwyg-editor/docs/methods/).

**Props:**

- content `<string>` content
- type `<string>` We support different out-of-the-box editor configurations. We recommend using "full" for full experience and "comment" for inline experience. See prop-types.
- showMentionPicker `<bool>`
- showEmojiPicker `<bool>`
- showHashtagPicker `<bool>`
- channelId `<string>` if provided, the mentioning will target the given channel
- opts `<object>` Additional froala editor configurations
- hashtagAddedCallback `<function>`
- onFocused `<function>`
- onBlurred `<function>`
- onContentChanged `<function>`
- onVideoInserted `<function>`
- onCmdEnterShortcutTriggered `<function>`
- maxNumberOfHashtags `<number>`
- onImageUploaded `<function>`
- onImageInserted `<function>`
- onImageRemoved `<function>`
