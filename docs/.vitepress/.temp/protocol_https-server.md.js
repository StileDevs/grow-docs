import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"HTTPS server","description":"","frontmatter":{},"headers":[],"relativePath":"protocol/https-server.md","filePath":"protocol/https-server.md"}');
const _sfc_main = { name: "protocol/https-server.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="https-server" tabindex="-1">HTTPS server <a class="header-anchor" href="#https-server" aria-label="Permalink to “HTTPS server”">​</a></h1><p>You will need to have setup mostly any HTTPS server on port 443, which accepts POST request.</p><p>This server will be really simple as it needs to respond with single page. The request URL is <code>https://www.growtopia1.com/growtopia/server_data.php</code> or when alternative URL is requested, then <code>https://www.growtopia2.com/growtopia/server_data.php</code>.</p><p>You might of course notice that you don&#39;t own domain <code>www.growtopia1.com</code> nor <code>www.growtopia2.com</code>, so you will have to use clever trick. There are few possibilities, but most common is modifying system file called <code>/etc/hosts/</code> to route all requests from those domains to our own IP address. But you also have variety of others, like using your own DNS server or modifying growtopia executable.</p><h2 id="ssl-certificate" tabindex="-1">SSL Certificate <a class="header-anchor" href="#ssl-certificate" aria-label="Permalink to “SSL Certificate”">​</a></h2><p>When setting up your HTTPS server, you need to generate an SSL certificate with a <strong>Common Name (CN)</strong> that matches one of the Growtopia domains: <code>www.growtopia1.com</code> or <code>www.growtopia2.com</code>.</p><p>The Growtopia client will only accept HTTPS connections that are signed with a certificate using these specific common names. Any certificate with a different common name will be rejected by the client.</p><p>This means when generating your self-signed certificate or certificate signing request (CSR), you must specify the common name as either:</p><ul><li><code>www.growtopia1.com</code></li><li><code>www.growtopia2.com</code></li></ul><h2 id="server-data-response" tabindex="-1">Server Data Response <a class="header-anchor" href="#server-data-response" aria-label="Permalink to “Server Data Response”">​</a></h2><p>But now let&#39;s look what should be the content of this file:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({ "--shiki-light": "#24292e", "--shiki-dark": "#e1e4e8", "--shiki-light-bg": "#fff", "--shiki-dark-bg": "#24292e" })}" tabindex="0" dir="ltr"><code><span class="line"><span>server|127.0.0.1</span></span>
<span class="line"><span>port|17091</span></span>
<span class="line"><span>loginurl|login.growtopiagame.com</span></span>
<span class="line"><span>type|1</span></span>
<span class="line"><span>type2|1</span></span>
<span class="line"><span>#maint|Maintenance message</span></span>
<span class="line"><span></span></span>
<span class="line"><span>beta_server|127.0.0.1</span></span>
<span class="line"><span>beta_port|17091</span></span>
<span class="line"><span></span></span>
<span class="line"><span>beta_type|1</span></span>
<span class="line"><span>meta|localhost</span></span>
<span class="line"><span>RTENDMARKERBS1001</span></span></code></pre></div><p>And now explain all of the stuff one by one.</p><ul><li><code>server</code> - IP address to which should client connect.</li><li><code>port</code> - Port to which should client connect.</li><li><code>loginurl|</code> - The new login url <code>login.growtopiagame.com</code> (Details about <a href="/protocol/login-server.html">Login Server</a>).</li><li><code>type</code> - Unknown.</li><li><code>type2</code> - To use with new packet.</li><li><code>maint</code> - This is maintenance message, if you remove <code>#</code> in front of it, then it will show this text. It is usually used when your ENet server is down.</li><li><code>beta_sever</code> - Same as <code>server</code>, but used when client is in beta mode.</li><li><code>beta_port</code> - Same as <code>port</code>, but used when client is in beta mode.</li><li><code>beta_type</code> - Same as <code>type</code>, but used when client is in beta mode.</li><li><code>meta</code> - This is string which is put into logging packet, no idea what is it&#39;s real use.</li><li><code>RTENDMARKERBS1001</code> - This is marker for end of data (it is from ProtonSDK).</li></ul><p>Also there is somewhat important note. You should be using just <code>\\n</code> character to separate those lines and not <code>\\r\\n</code>.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("protocol/https-server.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const httpsServer = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  httpsServer as default
};
