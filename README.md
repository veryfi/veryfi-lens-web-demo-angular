<img src="https://user-images.githubusercontent.com/30125790/212157461-58bdc714-2f89-44c2-8e4d-d42bee74854e.png#gh-dark-mode-only" width="200">
<img src="https://user-images.githubusercontent.com/30125790/212157486-bfd08c5d-9337-4b78-be6f-230dc63838ba.png#gh-light-mode-only" width="200">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

# Veryfi Lens for Web Angular Demo App

Veryfi Lens for Web SDK is a framework for your web app to give it document capture superpowers in minutes.

This project is a demo to showcase how you can integrate Lens into your web app. It follows a client-server architecture where the server is for validating your client and getting session key and the client side is for displaying and showing Lens components for capturing documents.

<img src="https://github.com/veryfi/veryfi-lens-web-demo-react/blob/main/flow.png">

App includes two ways of using lens sdk:

Implementation using npm package (suggested)
 
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

Implementation using `<script>` tag (optional)

Add this to your *index.html*
`<script  src="https://lens.veryfi.com/static/js/lens-v1.1.2.min.js"></script>`

The only difference in usage is in `capture()` function, functions for both methods of integration are included in *app.component.ts*

Add `<script  src="https://cdn.tailwindcss.com"></script>` to your *index.html* or install tailwind package

Put your CLIENT_ID in src/app/app.components.ts (make sure to keep it secret)
