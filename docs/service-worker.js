if(!self.define){let e,i={};const n=(n,f)=>(n=new URL(n+".js",f).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(f,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let c={};const s=e=>n(e,r),u={module:{uri:r},exports:c,require:s};i[r]=Promise.all(f.map((e=>u[e]||s(e)))).then((e=>(l(...e),c)))}}define(["./workbox-5403aaa3"],(function(e){"use strict";e.setCacheNameDetails({prefix:"webkunin"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"/1057b53379611c31117c09f7b6d37cee.svg",revision:null},{url:"/1957814357a3e3033fa790028420ddf0.mp4",revision:null},{url:"/1d7704672d2d665f51d2c2e6661688b0.svg",revision:null},{url:"/229480ffc4dc8fd8e7d1df1ae319fd3f.svg",revision:null},{url:"/2e7d046f4bf0abc90f44aebc5cf80980.ttf",revision:null},{url:"/324.chunk.js",revision:"e9fdde671e3089cf80fccf8c665ab98e"},{url:"/404.bundle.js",revision:"708621de85aa7e2310070ee907385ba1"},{url:"/404.html",revision:"2955fa75c2afda3b21815c4fd68f3490"},{url:"/597.chunk.js",revision:"6ec7638e043bf2ffd1e049adb6826612"},{url:"/7e8e8e4e8b5ff227425c829e9e5f4603.svg",revision:null},{url:"/8c94a3a004328677b6430e88ee27fc4d.svg",revision:null},{url:"/9047e2504cfbb564574a9ef1e2ea80f9.svg",revision:null},{url:"/956ee64c7ce4c7e339196ade5ebafe98.ttf",revision:null},{url:"/aa256bf5bd44daa0604e1113aed0bb58.svg",revision:null},{url:"/da4dc4ed410c3f2f0d95c63b1e9b9fce.svg",revision:null},{url:"/f8850ec2eec8bea3a6d29c3c41905edd.ttf",revision:null},{url:"/index.bundle.js",revision:"cd0bb5ee13131923c23c037a6cf35f36"},{url:"/index.html",revision:"64abbc772f8e6fba1f769e574766680e"},{url:"/landing.chunk.js",revision:"4f8bba64f695e1e3ff7bf757dd6be870"},{url:"/portfolio.chunk.js",revision:"d5583357cdd08287247600be425eb3a9"},{url:"/talent.chunk.js",revision:"6c2e46ba5ec184cc8bcfc8eae0c75f2e"}],{}),e.registerRoute(/^https:\/\/firebasestorage\.googleapis\.com\//,new e.CacheFirst,"GET")}));
//# sourceMappingURL=service-worker.js.map
