import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Documentation","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"reference/docs.md","filePath":"reference/docs.md"}');
const _sfc_main = { name: "reference/docs.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="documentation" tabindex="-1">Documentation <a class="header-anchor" href="#documentation" aria-label="Permalink to “Documentation”">​</a></h1><p>The documentation were based on these source</p><ul><li><a href="https://github.com/GrowtopiaNoobs/GrowDocs" target="_blank" rel="noreferrer">https://github.com/GrowtopiaNoobs/GrowDocs</a></li><li><a href="https://github.com/eikarna/GrowDocs" target="_blank" rel="noreferrer">https://github.com/eikarna/GrowDocs</a></li><li><a href="https://github.com/ZTzTopia/GTPrivateServer-docs" target="_blank" rel="noreferrer">https://github.com/ZTzTopia/GTPrivateServer-docs</a></li><li><a href="https://github.com/badewen/Growtopia-Things" target="_blank" rel="noreferrer">https://github.com/badewen/Growtopia-Things</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("reference/docs.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const docs = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  docs as default
};
