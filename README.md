## Veryfi Lens-For-Web Angular demo app

App includes two ways of using lens sdk:

 1. npm package
 
 To install or update package - `npm i veryfi-lens-sdk` **(already included)**
 To use npm package you will have to install following packages **(already installed)**
 

    npm i path-browserify crypto-browserify stream-browserify assert stream-http https-browserify os-browserify browserify-fs

 and add this object to *compilerOptions* inside tsconfig.json: 
 ```
 "paths":{
"path":["node_modules/path-browserify"],
"crypto": ["./node_modules/crypto-browserify"],
"stream": ["./node_modules/stream-browserify"],
"assert": ["./node_modules/assert"],
"http": ["./node_modules/stream-http"],
"https": ["./node_modules/https-browserify"],
"os": ["./node_modules/os-browserify"],
"fs": ["./node_modules/browserify-fs"],
}
```
Add this to your component

    import VeryfiLens from 'veryfi-lens-sdk'

 2. `<script>` tag
 Add this to your *index.html*
`<script  src="https://lens.veryfi.com/static/js/lens-v1.1.2.min.js"></script>`

The only difference in usage is in `capture()` function, functions for both methods of integration are included in *app.component.ts*

Add `<script  src="https://cdn.tailwindcss.com"></script>` to your *index.html* or install tailwind package
