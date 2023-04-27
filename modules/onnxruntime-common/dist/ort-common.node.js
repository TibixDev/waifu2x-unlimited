/*!
 * ONNX Runtime Common v1.14.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{InferenceSession:()=>c,Tensor:()=>g,env:()=>i,registerBackend:()=>o});const r={},n=[],o=(e,t,o)=>{if(!t||"function"!=typeof t.init||"function"!=typeof t.createSessionHandler)throw new TypeError("not a valid backend");{const i=r[e];if(void 0===i)r[e]={backend:t,priority:o};else{if(i.priority>o)return;if(i.priority===o&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${o}`)}if(o>=0){const t=n.indexOf(e);-1!==t&&n.splice(t,1);for(let t=0;t<n.length;t++)if(r[n[t]].priority<=o)return void n.splice(t,0,e);n.push(e)}}},i=new class{constructor(){this.wasm={},this.webgl={},this.logLevelInternal="warning"}set logLevel(e){if(void 0!==e){if("string"!=typeof e||-1===["verbose","info","warning","error","fatal"].indexOf(e))throw new Error(`Unsupported logging level: ${e}`);this.logLevelInternal=e}}get logLevel(){return this.logLevelInternal}},a="undefined"!=typeof BigInt64Array&&"function"==typeof BigInt64Array.from,s="undefined"!=typeof BigUint64Array&&"function"==typeof BigUint64Array.from,d=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array]]),f=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]);a&&(d.set("int64",BigInt64Array),f.set(BigInt64Array,"int64")),s&&(d.set("uint64",BigUint64Array),f.set(BigUint64Array,"uint64"));class h{constructor(e,t,r){let n,o,i;if("string"==typeof e)if(n=e,i=r,"string"===e){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");o=t}else{const r=d.get(e);if(void 0===r)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t))o=r.from(t);else{if(!(t instanceof r))throw new TypeError(`A ${n} tensor's data must be type of ${r}`);o=t}}else if(i=t,Array.isArray(e)){if(0===e.length)throw new TypeError("Tensor type cannot be inferred from an empty array.");const t=typeof e[0];if("string"===t)n="string",o=e;else{if("boolean"!==t)throw new TypeError(`Invalid element type of data array: ${t}.`);n="bool",o=Uint8Array.from(e)}}else{const t=f.get(e.constructor);if(void 0===t)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);n=t,o=e}if(void 0===i)i=[o.length];else if(!Array.isArray(i))throw new TypeError("A tensor's dims must be a number array");const a=(e=>{let t=1;for(let r=0;r<e.length;r++){const n=e[r];if("number"!=typeof n||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t})(i);if(a!==o.length)throw new Error(`Tensor's size(${a}) does not match data length(${o.length}).`);this.dims=i,this.type=n,this.data=o,this.size=a}static bufferToTensor(e,t){if(void 0===e)throw new Error("Image buffer must be defined");if(void 0===t.height||void 0===t.width)throw new Error("Image height and width must be defined");const{height:r,width:n}=t,o=t.norm;let i,a;i=void 0===o||void 0===o.mean?255:o.mean,a=void 0===o||void 0===o.bias?0:o.bias;const s=void 0!==t.bitmapFormat?t.bitmapFormat:"RGBA",d=void 0!==t.tensorFormat&&void 0!==t.tensorFormat?t.tensorFormat:"RGB",f=r*n,g="RGBA"===d?new Float32Array(4*f):new Float32Array(3*f);let m=4,c=0,l=1,w=2,u=3,p=0,y=f,b=2*f,v=-1;"RGB"===s&&(m=3,c=0,l=1,w=2,u=-1),"RGBA"===d?v=3*f:"RBG"===d?(p=0,b=f,y=2*f):"BGR"===d&&(b=0,y=f,p=2*f);for(let t=0;t<f;t++,c+=m,w+=m,l+=m,u+=m)g[p++]=(e[c]+a)/i,g[y++]=(e[l]+a)/i,g[b++]=(e[w]+a)/i,-1!==v&&-1!==u&&(g[v++]=(e[u]+a)/i);return new h("float32",g,"RGBA"===d?[1,4,r,n]:[1,3,r,n])}static async fromImage(e,t){const r="undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement,n="undefined"!=typeof ImageData&&e instanceof ImageData,o="undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap,i="undefined"!=typeof String&&(e instanceof String||"string"==typeof e);let a,s={};if(r){const r=document.createElement("canvas"),n=r.getContext("2d");if(null==n)throw new Error("Can not access image data");{let o=e.naturalHeight,i=e.naturalWidth;if(void 0!==t&&void 0!==t.resizedHeight&&void 0!==t.resizedWidth&&(o=t.resizedHeight,i=t.resizedWidth),void 0!==t){if(s=t,void 0!==t.tensorFormat)throw new Error("Image input config format must be RGBA for HTMLImageElement");if(s.tensorFormat="RGBA",void 0!==t.height&&t.height!==o)throw new Error("Image input config height doesn't match HTMLImageElement height");if(s.height=o,void 0!==t.width&&t.width!==i)throw new Error("Image input config width doesn't match HTMLImageElement width");s.width=i}else s.tensorFormat="RGBA",s.height=o,s.width=i;r.width=i,r.height=o,n.drawImage(e,0,0,i,o),a=n.getImageData(0,0,i,o).data}}else{if(!n){if(o){if(void 0===t)throw new Error("Please provide image config with format for Imagebitmap");if(void 0!==t.bitmapFormat)throw new Error("Image input config format must be defined for ImageBitmap");const r=document.createElement("canvas").getContext("2d");if(null!=r){const n=e.height,o=e.width;if(r.drawImage(e,0,0,o,n),a=r.getImageData(0,0,o,n).data,void 0!==t){if(void 0!==t.height&&t.height!==n)throw new Error("Image input config height doesn't match ImageBitmap height");if(s.height=n,void 0!==t.width&&t.width!==o)throw new Error("Image input config width doesn't match ImageBitmap width");s.width=o}else s.height=n,s.width=o;return h.bufferToTensor(a,s)}throw new Error("Can not access image data")}if(i)return new Promise(((r,n)=>{const o=document.createElement("canvas"),i=o.getContext("2d");if(!e||!i)return n();const a=new Image;a.crossOrigin="Anonymous",a.src=e,a.onload=()=>{o.width=a.width,o.height=a.height,i.drawImage(a,0,0,o.width,o.height);const e=i.getImageData(0,0,o.width,o.height);if(void 0!==t){if(void 0!==t.height&&t.height!==o.height)throw new Error("Image input config height doesn't match ImageBitmap height");if(s.height=o.height,void 0!==t.width&&t.width!==o.width)throw new Error("Image input config width doesn't match ImageBitmap width");s.width=o.width}else s.height=o.height,s.width=o.width;r(h.bufferToTensor(e.data,s))}}));throw new Error("Input data provided is not supported - aborted tensor creation")}{const r="RGBA";let n,o;if(void 0!==t&&void 0!==t.resizedWidth&&void 0!==t.resizedHeight?(n=t.resizedHeight,o=t.resizedWidth):(n=e.height,o=e.width),void 0!==t){if(s=t,void 0!==t.bitmapFormat&&t.bitmapFormat!==r)throw new Error("Image input config format must be RGBA for ImageData");s.bitmapFormat="RGBA"}else s.bitmapFormat="RGBA";if(s.height=n,s.width=o,void 0!==t){const t=document.createElement("canvas");t.width=o,t.height=n;const r=t.getContext("2d");if(null==r)throw new Error("Can not access image data");r.putImageData(e,0,0),a=r.getImageData(0,0,o,n).data}else a=e.data}}if(void 0!==a)return h.bufferToTensor(a,s);throw new Error("Input data provided is not supported - aborted tensor creation")}toImageData(e){var t,r;const n=document.createElement("canvas").getContext("2d");let o;if(null==n)throw new Error("Can not access image data");{const i=this.dims[3],a=this.dims[2],s=this.dims[1],d=void 0!==e&&void 0!==e.format?e.format:"RGB",f=void 0!==e&&void 0!==(null===(t=e.norm)||void 0===t?void 0:t.mean)?e.norm.mean:255,h=void 0!==e&&void 0!==(null===(r=e.norm)||void 0===r?void 0:r.bias)?e.norm.bias:0,g=a*i;if(void 0!==e){if(void 0!==e.height&&e.height!==a)throw new Error("Image output config height doesn't match tensor height");if(void 0!==e.width&&e.width!==i)throw new Error("Image output config width doesn't match tensor width");if(void 0!==e.format&&4===s&&"RGBA"!==e.format||3===s&&"RGB"!==e.format&&"BGR"!==e.format)throw new Error("Tensor format doesn't match input tensor dims")}const m=4;let c=0,l=1,w=2,u=3,p=0,y=g,b=2*g,v=-1;"RGBA"===d?(p=0,y=g,b=2*g,v=3*g):"RGB"===d?(p=0,y=g,b=2*g):"RBG"===d&&(p=0,b=g,y=2*g),o=n.createImageData(i,a);for(let e=0;e<a*i;c+=m,l+=m,w+=m,u+=m,e++)o.data[c]=(this.data[p++]-h)*f,o.data[l]=(this.data[y++]-h)*f,o.data[w]=(this.data[b++]-h)*f,o.data[u]=-1===v?255:(this.data[v++]-h)*f}return o}reshape(e){return new h(this.type,this.data,e)}}const g=h;class m{constructor(e){this.handler=e}async run(e,t,r){const n={};let o={};if("object"!=typeof e||null===e||e instanceof g||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let i=!0;if("object"==typeof t){if(null===t)throw new TypeError("Unexpected argument[1]: cannot be null.");if(t instanceof g)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(t)){if(0===t.length)throw new TypeError("'fetches' cannot be an empty array.");i=!1;for(const e of t){if("string"!=typeof e)throw new TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(e))throw new RangeError(`'fetches' contains invalid output name: ${e}.`);n[e]=null}if("object"==typeof r&&null!==r)o=r;else if(void 0!==r)throw new TypeError("'options' must be an object.")}else{let e=!1;const a=Object.getOwnPropertyNames(t);for(const r of this.outputNames)if(-1!==a.indexOf(r)){const o=t[r];(null===o||o instanceof g)&&(e=!0,i=!1,n[r]=o)}if(e){if("object"==typeof r&&null!==r)o=r;else if(void 0!==r)throw new TypeError("'options' must be an object.")}else o=t}}else if(void 0!==t)throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(const t of this.inputNames)if(void 0===e[t])throw new Error(`input '${t}' is missing in 'feeds'.`);if(i)for(const e of this.outputNames)n[e]=null;const a=await this.handler.run(e,n,o),s={};for(const e in a)Object.hasOwnProperty.call(a,e)&&(s[e]=new g(a[e].type,a[e].data,a[e].dims));return s}static async create(e,t,o,i){let a,s={};if("string"==typeof e){if(a=e,"object"==typeof t&&null!==t)s=t;else if(void 0!==t)throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(a=e,"object"==typeof t&&null!==t)s=t;else if(void 0!==t)throw new TypeError("'options' must be an object.")}else{if(!(e instanceof ArrayBuffer||"undefined"!=typeof SharedArrayBuffer&&e instanceof SharedArrayBuffer))throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");{const r=e;let n=0,d=e.byteLength;if("object"==typeof t&&null!==t)s=t;else if("number"==typeof t){if(n=t,!Number.isSafeInteger(n))throw new RangeError("'byteOffset' must be an integer.");if(n<0||n>=r.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${r.byteLength}).`);if(d=e.byteLength-n,"number"==typeof o){if(d=o,!Number.isSafeInteger(d))throw new RangeError("'byteLength' must be an integer.");if(d<=0||n+d>r.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${r.byteLength-n}].`);if("object"==typeof i&&null!==i)s=i;else if(void 0!==i)throw new TypeError("'options' must be an object.")}else if(void 0!==o)throw new TypeError("'byteLength' must be a number.")}else if(void 0!==t)throw new TypeError("'options' must be an object.");a=new Uint8Array(r,n,d)}}const d=(s.executionProviders||[]).map((e=>"string"==typeof e?e:e.name)),f=await(async e=>{const t=0===e.length?n:e,o=[];for(const e of t){const t=r[e];if(t){if(t.initialized)return t.backend;if(t.aborted)continue;const r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init()),await t.initPromise,t.initialized=!0,t.backend}catch(n){r||o.push({name:e,err:n}),t.aborted=!0}finally{delete t.initPromise}}}throw new Error(`no available backend found. ERR: ${o.map((e=>`[${e.name}] ${e.err}`)).join(", ")}`)})(d),h=await f.createSessionHandler(a,s);return new m(h)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}const c=m;var l=exports;for(var w in t)l[w]=t[w];t.__esModule&&Object.defineProperty(l,"__esModule",{value:!0})})();
//# sourceMappingURL=ort-common.node.js.map