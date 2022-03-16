```js
{
    # Name of protocol
    n: "c13n-mp"
    # Version of protocol
    v: "0.0.1c",
    # Type of payload
    t: "message",
    # Content related to payload type
    # message: the message text
    c: "",
    # (Optional) File / Media attachments
    att: [{
        # Type of attachment
        t: "image" | "file",
        # Location / URL
        u: "",
        # Metadata
        tags: "lsat" | "",
        # Visibility flag for chat
        show: "true" | "false"
    }]
}
```

```js
{
    # Name of protocol
    n: "c13n-pp"
    # Version of protocol
    v: "0.0.1a",
    # Type of payload
    t: "payreq",
    # Content related to payload type
    # payreq: the payment request
    c: "",
    # (Optional) Description of payment request
    d: ""
}
```