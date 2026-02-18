import {
  parse
} from "./chunk-CIKY4GOH.js";
import "./chunk-RVIUCKVQ.js";
import "./chunk-3FZZURVM.js";
import "./chunk-OKDNMYAF.js";
import "./chunk-BKXKFBTF.js";
import "./chunk-MVQFIUBE.js";
import "./chunk-ZMNUG2C4.js";
import "./chunk-5UL22KB5.js";
import "./chunk-2NOVMAJX.js";
import {
  package_default
} from "./chunk-WMYMD4ZF.js";
import {
  selectSvgElement
} from "./chunk-WXCJLDQV.js";
import "./chunk-OSY2QHCY.js";
import {
  configureSvgSize
} from "./chunk-OCPXUHLS.js";
import "./chunk-LCG2FUXM.js";
import "./chunk-N7ZJBNO2.js";
import {
  __name,
  log
} from "./chunk-GHDKWO5C.js";
import "./chunk-IKZWERSR.js";

// node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-WHAUD3N6.mjs
var parser = {
  parse: __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = {
  version: package_default.version + (true ? "" : "-tiny")
};
var getVersion = __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
//# sourceMappingURL=infoDiagram-WHAUD3N6-C3DXJVIA.js.map
