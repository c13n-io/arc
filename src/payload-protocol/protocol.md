```js
{
    # Name of protocol
    n: "c13n-cp"
    # Version of protocol
    v: "0.0.1c",
    # Type of payload
    t: "message" | "payreq" | "payreq_pay",
    # Content related to payload type
    # message: the message text
    # payreq: description of payment request
    # payreq_pay: description of payment request fulfillment
    c: "",
    # (optional -- only for payreq) The invoice of the payment request
    invoice: "",
    # (optional -- only for message) File / Media attachments
    att: [{
        # Type of attachment
        t: "image | file",
        # Location / URL
        u: "",
        # Metadata
        tags: "lsat",
        # Visibility flag for chat
        show: "true | false"
    }],
}
```