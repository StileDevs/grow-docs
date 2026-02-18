# HTTPS server

You will need to have setup mostly any HTTPS server on port 443, which accepts POST request.

This server will be really simple as it needs to respond with single page. The request URL is `https://www.growtopia1.com/growtopia/server_data.php` or when alternative URL is requested, then `https://www.growtopia2.com/growtopia/server_data.php`.




You might of course notice that you don't own domain `www.growtopia1.com` nor `www.growtopia2.com`, so you will have to use clever trick. There are few possibilities, but most common is modifying system file called `/etc/hosts/` to route all requests from those domains to our own IP address. But you also have variety of others, like using your own DNS server or modifying growtopia executable.

## SSL Certificate

When setting up your HTTPS server, you need to generate an SSL certificate with a **Common Name (CN)** that matches one of the Growtopia domains: `www.growtopia1.com` or `www.growtopia2.com`.

The Growtopia client will only accept HTTPS connections that are signed with a certificate using these specific common names. Any certificate with a different common name will be rejected by the client.

This means when generating your self-signed certificate or certificate signing request (CSR), you must specify the common name as either:
- `www.growtopia1.com`
- `www.growtopia2.com`

## Server Data Response

But now let's look what should be the content of this file:

```
server|127.0.0.1
port|17091
loginurl|login.growtopiagame.com
type|1
type2|1
#maint|Maintenance message

beta_server|127.0.0.1
beta_port|17091

beta_type|1
meta|localhost
RTENDMARKERBS1001
```

And now explain all of the stuff one by one.

- `server` - IP address to which should client connect.
- `port` - Port to which should client connect.
- `loginurl|` - The new login url `login.growtopiagame.com` (Details about [Login Server](/protocol/login-server)).
- `type` - Unknown.
- `type2` - To use with new packet.
- `maint` - This is maintenance message, if you remove `#` in front of it, then it will show this text. It is usually used when your ENet server is down.
- `beta_sever` - Same as `server`, but used when client is in beta mode.
- `beta_port` - Same as `port`, but used when client is in beta mode.
- `beta_type` - Same as `type`, but used when client is in beta mode.
- `meta` - This is string which is put into logging packet, no idea what is it's real use.
- `RTENDMARKERBS1001` - This is marker for end of data (it is from ProtonSDK).

Also there is somewhat important note. You should be using just `\n` character to separate those lines and not `\r\n`.