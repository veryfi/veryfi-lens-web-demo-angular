<img src="https://user-images.githubusercontent.com/30125790/212157461-58bdc714-2f89-44c2-8e4d-d42bee74854e.png#gh-dark-mode-only" width="200">
<img src="https://user-images.githubusercontent.com/30125790/212157486-bfd08c5d-9337-4b78-be6f-230dc63838ba.png#gh-light-mode-only" width="200">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

# Veryfi Lens for Web Angular Demo App

Veryfi Lens for Web SDK is a framework for your web app to give it document capture superpowers in minutes.

This project is a demo to showcase how you can integrate Lens into your web app. It follows a client-server architecture where the server is for validating your client and getting session key and the client side is for displaying and showing Lens components for capturing documents.

<img src="https://github.com/veryfi/veryfi-lens-web-demo-angular/blob/main/flow.png">

 1. npm package
 
 To install or update package - `npm i veryfi-lens-wasm` **(already included)**
 please go to https://github.com/veryfi/veryfi-lens-wasm to check installation guide

1. Put your CLIENT_ID, API_KEY and USERNAME in src/app/app.components.ts (make sure to keep it secret)
2. import VeryfiLens from 'veryfi-lens-wasm'
3. Install tailwind package

4. Build the project `npm run build` (or use `ng serve` to use dev environment)
5. Copy server.js from /src to dist/lens
6. `cd dist/lens` 
7. Run `node server.js`

