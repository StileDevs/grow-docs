import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Packet","description":"","frontmatter":{},"headers":[],"relativePath":"packets/packet.md","filePath":"packets/packet.md"}');
const _sfc_main = { name: "packets/packet.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="packet" tabindex="-1">Packet <a class="header-anchor" href="#packet" aria-label="Permalink to “Packet”">​</a></h1><p>List</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("packets/packet.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const packet = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  packet as default
};
