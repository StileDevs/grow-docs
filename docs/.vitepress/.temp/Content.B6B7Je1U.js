import { usePreferredDark, useDark, tryOnUnmounted } from "@vueuse/core";
import { shallowRef, readonly, inject, computed, ref, watch, reactive, markRaw, nextTick, defineComponent, h } from "vue";
function deserializeFunctions(r) {
  return Array.isArray(r) ? r.map(deserializeFunctions) : typeof r == "object" && r !== null ? Object.keys(r).reduce((t, n) => (t[n] = deserializeFunctions(r[n]), t), {}) : typeof r == "string" && r.startsWith("_vp-fn_") ? new Function(`return ${r.slice(7)}`)() : r;
}
const siteData = deserializeFunctions(JSON.parse('{"lang":"en-US","dir":"ltr","title":"grow-docs","description":"Growtopia documentation","base":"/","head":[],"router":{"prefetchLinks":true},"appearance":true,"themeConfig":{"nav":[{"text":"Home","link":"/"}],"sidebar":[{"text":"Protocol","items":[{"text":"Introduction","link":"/protocol/introduction"},{"text":"HTTPS Server","link":"/protocol/https-server"},{"text":"Login Server","link":"/protocol/login-server"},{"text":"ENet","link":"/protocol/enet"}]},{"text":"Packets","items":[{"text":"List Packets","link":"/packets/packet","items":[{"text":"Hello Packet","link":"/packets/hello-packet"},{"text":"Text Packet","link":"/packets/text-packet/text"},{"text":"Action Packet","link":"/packets/action-packet/action"},{"text":"Tank Packet","link":"/packets/tank-packet/tank"}]}]},{"text":"Reference","items":[{"text":"Documentation","link":"/reference/docs"}]}],"socialLinks":[{"icon":"github","link":"https://github.com/StileDevs/grow-docs"}]},"locales":{},"scrollOffset":134,"cleanUrls":false,"additionalConfig":{}}'));
const __vite_import_meta_env__ = {};
const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i;
const APPEARANCE_KEY = "vitepress-theme-appearance";
const UnpackStackView = /* @__PURE__ */ Symbol("stack-view:unpack");
const HASH_RE = /#.*$/;
const HASH_OR_QUERY_RE = /[?#].*$/;
const INDEX_OR_EXT_RE = /(?:(^|\/)index)?\.(?:md|html)$/;
const inBrowser = typeof document !== "undefined";
const notFoundPageData = {
  relativePath: "404.md",
  filePath: "",
  title: "404",
  description: "Not Found",
  headers: [],
  frontmatter: { sidebar: false, layout: "page" },
  lastUpdated: 0,
  isNotFound: true
};
function isActive(currentPath, matchPath, asRegex = false) {
  if (matchPath === void 0) {
    return false;
  }
  currentPath = normalize(`/${currentPath}`);
  if (asRegex) {
    return new RegExp(matchPath).test(currentPath);
  }
  if (normalize(matchPath) !== currentPath) {
    return false;
  }
  const hashMatch = matchPath.match(HASH_RE);
  if (hashMatch) {
    return (inBrowser ? location.hash : "") === hashMatch[0];
  }
  return true;
}
function normalize(path) {
  return decodeURI(path).replace(HASH_OR_QUERY_RE, "").replace(INDEX_OR_EXT_RE, "$1");
}
function isExternal(path) {
  return EXTERNAL_URL_RE.test(path);
}
function getLocaleForPath(siteData2, relativePath) {
  return Object.keys(siteData2?.locales || {}).find((key) => key !== "root" && !isExternal(key) && isActive(relativePath, `^/${key}/`, true)) || "root";
}
function resolveSiteDataByRoute(siteData2, relativePath) {
  const localeIndex = getLocaleForPath(siteData2, relativePath);
  const { label, link, ...localeConfig } = siteData2.locales[localeIndex] ?? {};
  Object.assign(localeConfig, { localeIndex });
  const additionalConfigs = resolveAdditionalConfig(siteData2, relativePath);
  const topLayer = {
    head: mergeHead(siteData2.head ?? [], localeConfig.head ?? [], ...additionalConfigs.map((data) => data.head ?? []).reverse())
  };
  return stackView(topLayer, ...additionalConfigs, localeConfig, siteData2);
}
function createTitle(siteData2, pageData) {
  const title = pageData.title || siteData2.title;
  const template = pageData.titleTemplate ?? siteData2.titleTemplate;
  if (typeof template === "string" && template.includes(":title")) {
    return template.replace(/:title/g, title);
  }
  const templateString = createTitleTemplate(siteData2.title, template);
  if (title === templateString.slice(3)) {
    return title;
  }
  return `${title}${templateString}`;
}
function createTitleTemplate(siteTitle, template) {
  if (template === false) {
    return "";
  }
  if (template === true || template === void 0) {
    return ` | ${siteTitle}`;
  }
  if (siteTitle === template) {
    return "";
  }
  return ` | ${template}`;
}
function mergeHead(...headArrays) {
  const merged = [];
  const metaKeyMap = /* @__PURE__ */ new Map();
  for (const current of headArrays) {
    for (const tag of current) {
      const [type, attrs] = tag;
      const keyAttr = Object.entries(attrs)[0];
      if (type !== "meta" || !keyAttr) {
        merged.push(tag);
        continue;
      }
      const key = `${keyAttr[0]}=${keyAttr[1]}`;
      const existingIndex = metaKeyMap.get(key);
      if (existingIndex != null) {
        merged[existingIndex] = tag;
      } else {
        metaKeyMap.set(key, merged.length);
        merged.push(tag);
      }
    }
  }
  return merged;
}
const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;
function sanitizeFileName(name) {
  const match = DRIVE_LETTER_REGEX.exec(name);
  const driveLetter = match ? match[0] : "";
  return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "_").replace(/(^|\/)_+(?=[^/]*$)/, "$1");
}
const KNOWN_EXTENSIONS = /* @__PURE__ */ new Set();
function treatAsHtml(filename) {
  if (KNOWN_EXTENSIONS.size === 0) {
    const extraExts = typeof process === "object" && process.env?.VITE_EXTRA_EXTENSIONS || __vite_import_meta_env__?.VITE_EXTRA_EXTENSIONS || "";
    ("3g2,3gp,aac,ai,apng,au,avif,bin,bmp,cer,class,conf,crl,css,csv,dll,doc,eps,epub,exe,gif,gz,ics,ief,jar,jpe,jpeg,jpg,js,json,jsonld,m4a,man,mid,midi,mjs,mov,mp2,mp3,mp4,mpe,mpeg,mpg,mpp,oga,ogg,ogv,ogx,opus,otf,p10,p7c,p7m,p7s,pdf,png,ps,qt,roff,rtf,rtx,ser,svg,t,tif,tiff,tr,ts,tsv,ttf,txt,vtt,wav,weba,webm,webp,woff,woff2,xhtml,xml,yaml,yml,zip" + (extraExts && typeof extraExts === "string" ? "," + extraExts : "")).split(",").forEach((ext2) => KNOWN_EXTENSIONS.add(ext2));
  }
  const ext = filename.split(".").pop();
  return ext == null || !KNOWN_EXTENSIONS.has(ext.toLowerCase());
}
function resolveAdditionalConfig({ additionalConfig }, path) {
  if (additionalConfig === void 0)
    return [];
  if (typeof additionalConfig === "function")
    return additionalConfig(path) ?? [];
  const configs = [];
  const segments = path.split("/").slice(0, -1);
  while (segments.length) {
    const key = `/${segments.join("/")}/`;
    configs.push(additionalConfig[key]);
    segments.pop();
  }
  configs.push(additionalConfig["/"]);
  return configs.filter((config) => config !== void 0);
}
function stackView(..._layers) {
  const layers = _layers.filter((layer) => isObject(layer));
  if (layers.length <= 1)
    return _layers[0];
  const allKeys = new Set(layers.flatMap((layer) => Reflect.ownKeys(layer)));
  const allKeysArray = [...allKeys];
  return new Proxy({}, {
    // TODO: optimize for performance, this is a hot path
    get(_, prop) {
      if (prop === UnpackStackView)
        return layers;
      return stackView(...layers.map((layer) => layer[prop]).filter((v) => v !== void 0));
    },
    set() {
      throw new Error("StackView is read-only and cannot be mutated.");
    },
    has(_, prop) {
      return allKeys.has(prop);
    },
    ownKeys() {
      return allKeysArray;
    },
    getOwnPropertyDescriptor(_, prop) {
      for (const layer of layers) {
        const descriptor = Object.getOwnPropertyDescriptor(layer, prop);
        if (descriptor)
          return descriptor;
      }
    }
  });
}
stackView.unpack = function(obj) {
  return obj?.[UnpackStackView];
};
function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
const shellLangs = ["shellscript", "shell", "bash", "sh", "zsh"];
function isShell(lang) {
  return shellLangs.includes(lang);
}
const dataSymbol = /* @__PURE__ */ Symbol();
const siteDataRef = shallowRef(readonly(siteData));
function initData(route) {
  const site = computed(() => resolveSiteDataByRoute(siteDataRef.value, route.data.relativePath));
  const appearance = site.value.appearance;
  const isDark = appearance === "force-dark" ? ref(true) : appearance === "force-auto" ? usePreferredDark() : appearance ? useDark({
    storageKey: APPEARANCE_KEY,
    initialValue: () => appearance === "dark" ? "dark" : "auto",
    ...typeof appearance === "object" ? appearance : {}
  }) : ref(false);
  const hashRef = ref(inBrowser ? location.hash : "");
  if (inBrowser) {
    window.addEventListener("hashchange", () => {
      hashRef.value = location.hash;
    });
  }
  watch(() => route.data, () => {
    hashRef.value = inBrowser ? location.hash : "";
  });
  return {
    site,
    theme: computed(() => site.value.themeConfig),
    page: computed(() => route.data),
    frontmatter: computed(() => route.data.frontmatter),
    params: computed(() => route.data.params),
    lang: computed(() => site.value.lang),
    dir: computed(() => route.data.frontmatter.dir || site.value.dir),
    localeIndex: computed(() => site.value.localeIndex || "root"),
    title: computed(() => createTitle(site.value, route.data)),
    description: computed(() => route.data.description || site.value.description),
    isDark,
    hash: computed(() => hashRef.value)
  };
}
function useData() {
  const data = inject(dataSymbol);
  if (!data) {
    throw new Error("vitepress data not properly injected in app");
  }
  return data;
}
function joinPath(base, path) {
  return `${base}${path}`.replace(/\/+/g, "/");
}
function withBase(path) {
  return EXTERNAL_URL_RE.test(path) || !path.startsWith("/") ? path : joinPath(siteDataRef.value.base, path);
}
function pathToFile(path) {
  let pagePath = path.replace(/\.html$/, "");
  pagePath = decodeURIComponent(pagePath);
  pagePath = pagePath.replace(/\/$/, "/index");
  {
    if (inBrowser) {
      const base = "/";
      pagePath = sanitizeFileName(pagePath.slice(base.length).replace(/\//g, "_") || "index") + ".md";
      let pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()];
      if (!pageHash) {
        pagePath = pagePath.endsWith("_index.md") ? pagePath.slice(0, -9) + ".md" : pagePath.slice(0, -3) + "_index.md";
        pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()];
      }
      if (!pageHash)
        return null;
      pagePath = `${base}${"assets"}/${pagePath}.${pageHash}.js`;
    } else {
      pagePath = `./${sanitizeFileName(pagePath.slice(1).replace(/\//g, "_"))}.md.js`;
    }
  }
  return pagePath;
}
let contentUpdatedCallbacks = [];
function onContentUpdated(fn) {
  contentUpdatedCallbacks.push(fn);
  tryOnUnmounted(() => {
    contentUpdatedCallbacks = contentUpdatedCallbacks.filter((f) => f !== fn);
  });
}
function getScrollOffset() {
  let scrollOffset = siteDataRef.value.scrollOffset;
  let offset = 0;
  let padding = 24;
  if (typeof scrollOffset === "object" && "padding" in scrollOffset) {
    padding = scrollOffset.padding;
    scrollOffset = scrollOffset.selector;
  }
  if (typeof scrollOffset === "number") {
    offset = scrollOffset;
  } else if (typeof scrollOffset === "string") {
    offset = tryOffsetSelector(scrollOffset, padding);
  } else if (Array.isArray(scrollOffset)) {
    for (const selector of scrollOffset) {
      const res = tryOffsetSelector(selector, padding);
      if (res) {
        offset = res;
        break;
      }
    }
  }
  return offset;
}
function tryOffsetSelector(selector, padding) {
  const el = document.querySelector(selector);
  if (!el)
    return 0;
  const bot = el.getBoundingClientRect().bottom;
  if (bot < 0)
    return 0;
  return bot + padding;
}
const RouterSymbol = /* @__PURE__ */ Symbol();
const fakeHost = "http://a.com";
const getDefaultRoute = () => ({
  path: "/",
  hash: "",
  query: "",
  component: null,
  data: notFoundPageData
});
function createRouter(loadPageModule, fallbackComponent) {
  const route = reactive(getDefaultRoute());
  const router = {
    route,
    async go(href, options) {
      href = normalizeHref(href);
      if (await router.onBeforeRouteChange?.(href) === false)
        return;
      if (!inBrowser || await changeRoute(href, options))
        await loadPage(href);
      syncRouteQueryAndHash();
      await router.onAfterRouteChange?.(href);
    }
  };
  let latestPendingPath = null;
  async function loadPage(href, scrollPosition = 0, isRetry = false) {
    if (await router.onBeforePageLoad?.(href) === false)
      return;
    const targetLoc = new URL(href, fakeHost);
    const pendingPath = latestPendingPath = targetLoc.pathname;
    try {
      let page = await loadPageModule(pendingPath);
      if (!page)
        throw new Error(`Page not found: ${pendingPath}`);
      if (latestPendingPath === pendingPath) {
        latestPendingPath = null;
        const { default: comp, __pageData } = page;
        if (!comp)
          throw new Error(`Invalid route component: ${comp}`);
        await router.onAfterPageLoad?.(href);
        route.path = inBrowser ? pendingPath : withBase(pendingPath);
        route.component = markRaw(comp);
        route.data = true ? markRaw(__pageData) : readonly(__pageData);
        syncRouteQueryAndHash(targetLoc);
        if (inBrowser) {
          nextTick(() => {
            let actualPathname = siteDataRef.value.base + __pageData.relativePath.replace(/(?:(^|\/)index)?\.md$/, "$1");
            if (!siteDataRef.value.cleanUrls && !actualPathname.endsWith("/")) {
              actualPathname += ".html";
            }
            if (actualPathname !== targetLoc.pathname) {
              targetLoc.pathname = actualPathname;
              href = actualPathname + targetLoc.search + targetLoc.hash;
              history.replaceState({}, "", href);
            }
            return scrollTo(targetLoc.hash, false, scrollPosition);
          });
        }
      }
    } catch (err) {
      if (!/fetch|Page not found/.test(err.message) && !/^\/404(\.html|\/)?$/.test(href)) {
        console.error(err);
      }
      if (!isRetry) {
        try {
          const res = await fetch(siteDataRef.value.base + "hashmap.json");
          window.__VP_HASH_MAP__ = await res.json();
          await loadPage(href, scrollPosition, true);
          return;
        } catch (e) {
        }
      }
      if (latestPendingPath === pendingPath) {
        latestPendingPath = null;
        route.path = inBrowser ? pendingPath : withBase(pendingPath);
        route.component = fallbackComponent ? markRaw(fallbackComponent) : null;
        const relativePath = inBrowser ? route.path.replace(/(^|\/)$/, "$1index").replace(/(\.html)?$/, ".md").slice(siteDataRef.value.base.length) : "404.md";
        route.data = { ...notFoundPageData, relativePath };
        syncRouteQueryAndHash(targetLoc);
      }
    }
  }
  function syncRouteQueryAndHash(loc = inBrowser ? location : { search: "", hash: "" }) {
    route.query = loc.search;
    route.hash = decodeURIComponent(loc.hash);
  }
  if (inBrowser) {
    if (history.state === null)
      history.replaceState({}, "");
    window.addEventListener("click", (e) => {
      if (e.defaultPrevented || !(e.target instanceof Element) || e.target.closest("button") || // temporary fix for docsearch action buttons
      e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
        return;
      }
      const link = e.target.closest("a");
      if (!link || link.closest(".vp-raw") || link.hasAttribute("download") || link.hasAttribute("target")) {
        return;
      }
      const linkHref = link.getAttribute("href") ?? (link instanceof SVGAElement ? link.getAttribute("xlink:href") : null);
      if (linkHref == null)
        return;
      const { href, origin, pathname } = new URL(linkHref, link.baseURI);
      const currentLoc = new URL(location.href);
      if (origin === currentLoc.origin && treatAsHtml(pathname)) {
        e.preventDefault();
        router.go(href, {
          // use smooth scroll when clicking on header anchor links
          smoothScroll: link.classList.contains("header-anchor")
        });
      }
    }, { capture: true });
    window.addEventListener("popstate", async (e) => {
      if (e.state === null)
        return;
      const href = normalizeHref(location.href);
      await loadPage(href, e.state && e.state.scrollPosition || 0);
      syncRouteQueryAndHash();
      await router.onAfterRouteChange?.(href);
    });
    window.addEventListener("hashchange", (e) => {
      e.preventDefault();
      syncRouteQueryAndHash();
    });
  }
  return router;
}
function useRouter() {
  const router = inject(RouterSymbol);
  if (!router)
    throw new Error("useRouter() is called without provider.");
  return router;
}
function useRoute() {
  return useRouter().route;
}
function scrollTo(hash, smooth = false, scrollPosition = 0) {
  if (!hash || scrollPosition) {
    window.scrollTo(0, scrollPosition);
    return;
  }
  let target = null;
  try {
    target = document.getElementById(decodeURIComponent(hash).slice(1));
  } catch (e) {
    console.warn(e);
  }
  if (!target)
    return;
  const targetTop = window.scrollY + target.getBoundingClientRect().top - getScrollOffset() + Number.parseInt(window.getComputedStyle(target).paddingTop, 10) || 0;
  const behavior = window.matchMedia("(prefers-reduced-motion)").matches ? "instant" : (
    // only smooth scroll if distance is smaller than screen height
    smooth && Math.abs(targetTop - window.scrollY) <= window.innerHeight ? "smooth" : "auto"
  );
  const scrollToTarget = () => {
    window.scrollTo({ left: 0, top: targetTop, behavior });
    target.focus({ preventScroll: true });
    if (document.activeElement === target)
      return;
    if (target.hasAttribute("tabindex"))
      return;
    const restoreTabindex = () => {
      target.removeAttribute("tabindex");
      target.removeEventListener("blur", restoreTabindex);
    };
    target.setAttribute("tabindex", "-1");
    target.addEventListener("blur", restoreTabindex);
    target.focus({ preventScroll: true });
    if (document.activeElement !== target)
      restoreTabindex();
  };
  requestAnimationFrame(scrollToTarget);
}
function normalizeHref(href) {
  const url = new URL(href, fakeHost);
  url.pathname = url.pathname.replace(/(^|\/)index(\.html)?$/, "$1");
  if (siteDataRef.value.cleanUrls) {
    url.pathname = url.pathname.replace(/\.html$/, "");
  } else if (!url.pathname.endsWith("/") && !url.pathname.endsWith(".html")) {
    url.pathname += ".html";
  }
  return url.pathname + url.search + url.hash;
}
async function changeRoute(href, { smoothScroll = false, initialLoad = false, replace = false } = {}) {
  const loc = normalizeHref(location.href);
  const nextUrl = new URL(href, location.origin);
  const currentUrl = new URL(loc, location.origin);
  if (href === loc) {
    if (!initialLoad) {
      scrollTo(nextUrl.hash, smoothScroll);
      return false;
    }
  } else {
    if (replace) {
      history.replaceState({}, "", href);
    } else {
      history.replaceState({ scrollPosition: window.scrollY }, "");
      history.pushState({}, "", href);
    }
    if (nextUrl.pathname === currentUrl.pathname) {
      if (nextUrl.hash !== currentUrl.hash) {
        window.dispatchEvent(new HashChangeEvent("hashchange", {
          oldURL: currentUrl.href,
          newURL: nextUrl.href
        }));
        scrollTo(nextUrl.hash, smoothScroll);
      }
      return false;
    }
  }
  return true;
}
const runCbs = () => contentUpdatedCallbacks.forEach((fn) => fn());
const Content = defineComponent({
  name: "VitePressContent",
  props: {
    as: { type: [Object, String], default: "div" }
  },
  setup(props) {
    const route = useRoute();
    const { frontmatter, site } = useData();
    watch(frontmatter, runCbs, { deep: true, flush: "post" });
    return () => h(props.as, site.value.contentProps ?? { style: { position: "relative" } }, [
      route.component ? h(route.component, {
        onVnodeMounted: runCbs,
        onVnodeUpdated: runCbs,
        onVnodeUnmounted: runCbs
      }) : "404 Page Not Found"
    ]);
  }
});
export {
  Content as C,
  EXTERNAL_URL_RE as E,
  RouterSymbol as R,
  isActive as a,
  inBrowser as b,
  useRoute as c,
  isObject as d,
  isShell as e,
  createTitle as f,
  getScrollOffset as g,
  initData as h,
  isExternal as i,
  dataSymbol as j,
  createRouter as k,
  mergeHead as m,
  onContentUpdated as o,
  pathToFile as p,
  siteDataRef as s,
  treatAsHtml as t,
  useData as u,
  withBase as w
};
