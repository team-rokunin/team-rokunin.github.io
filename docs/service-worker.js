if(!self.define){let e,n={};const i=(i,f)=>(i=new URL(i+".js",f).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(f,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(n[r])return;let s={};const d=e=>i(e,r),l={module:{uri:r},exports:s,require:d};n[r]=Promise.all(f.map((e=>l[e]||d(e)))).then((e=>(c(...e),s)))}}define(["./workbox-b01ae790"],(function(e){"use strict";e.setCacheNameDetails({prefix:"webkunin"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"/1057b53379611c31117c09f7b6d37cee.svg",revision:null},{url:"/1d7704672d2d665f51d2c2e6661688b0.svg",revision:null},{url:"/229480ffc4dc8fd8e7d1df1ae319fd3f.svg",revision:null},{url:"/2e7d046f4bf0abc90f44aebc5cf80980.ttf",revision:null},{url:"/382.chunk.js",revision:"3c5aa0fff3726c4b2887bb6541629997"},{url:"/404.bundle.js",revision:"708621de85aa7e2310070ee907385ba1"},{url:"/404.html",revision:"2955fa75c2afda3b21815c4fd68f3490"},{url:"/45d72bf860ad6aa22325a8cf7fb0f94e.mp4",revision:null},{url:"/526.chunk.js",revision:"9f532d3d64cfa7b7a123bc00460b3d83"},{url:"/597.chunk.js",revision:"2ffd03b9f9cefcede9dca0d1383edfe7"},{url:"/627.chunk.js",revision:"d3289fc60d54d6e9a224fea01edbcdd0"},{url:"/651.chunk.js",revision:"061f6801a03667fa4678daf5586f0a8d"},{url:"/7e8e8e4e8b5ff227425c829e9e5f4603.svg",revision:null},{url:"/8c94a3a004328677b6430e88ee27fc4d.svg",revision:null},{url:"/9047e2504cfbb564574a9ef1e2ea80f9.svg",revision:null},{url:"/956ee64c7ce4c7e339196ade5ebafe98.ttf",revision:null},{url:"/aa256bf5bd44daa0604e1113aed0bb58.svg",revision:null},{url:"/da4dc4ed410c3f2f0d95c63b1e9b9fce.svg",revision:null},{url:"/f8850ec2eec8bea3a6d29c3c41905edd.ttf",revision:null},{url:"/index.bundle.js",revision:"1490fedcbed0762b171d9d52fd276f53"},{url:"/index.html",revision:"64abbc772f8e6fba1f769e574766680e"},{url:"/landing.chunk.js",revision:"98948bebe7b2a18668968d788390c9d8"},{url:"/portfolio.chunk.js",revision:"0245c6b9598c94cb837c4ca35a037fb7"},{url:"/talent.chunk.js",revision:"d7e3b890d3697f7c021fda8c53293ffb"}],{}),e.registerRoute(/^https:\/\/firebasestorage\.googleapis\.com\//,new e.CacheFirst({cacheName:"precache-v2",matchOptions:{ignoreSearch:!0},plugins:[new e.CacheableResponsePlugin({statuses:[200,206]}),new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxAgeSeconds:86400})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
