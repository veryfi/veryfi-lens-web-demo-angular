// declare const VeryfiLens: any

import { Component } from '@angular/core';
import VeryfiLens from 'veryfi-lens-wasm';
import axios from 'axios';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {}

  title = 'lens-angular';
  image: string = '';
  base64Image: string = '';
  session: string = '';
  showLens: boolean = false;
  isWasm: boolean = false;
  isEditing: boolean = false;
  isLong: boolean = false;
  isStitching: boolean = false;
  clientId: string = 'vrfrscMd4ICwS1fwmSUT18Vgp3cDHc3OAi9K6ZP';
  VALIDATE_URL = 'https://lens.veryfi.com/rest/validate_partner';

  ngOnInit() {
    this.getVeryfiSession(this.clientId);
  }

  async getVeryfiSession(clientId: string) {
    return await axios
      .post(
        this.VALIDATE_URL,
        {},
        {
          headers: {
            'CLIENT-ID': clientId,
          },
        }
      )
      .then((response) => {
        console.log(response.data.session);
        this.session = response.data.session;
      })
      .catch((error) => error);
  }

  initLens(): void {
    console.log(this.session);
    if (!VeryfiLens.getHasInit()) {
      console.log('this.session', this.session);
      VeryfiLens.setLensSessionKey(this.session);
    }

    VeryfiLens.init();
    this.startCamera();
    this.showLens = true;
  }
  initWasm(): void {
    console.log(this.session);
    if (!VeryfiLens.getHasInit()) {
      console.log('this.session', this.session);
      VeryfiLens.setLensSessionKey(this.session);
    }
    VeryfiLens.initWasm();
    this.isWasm = true
    this.showLens = true;
    
  }
  initWasmLong(): void {
    console.log(this.session);
    if (!VeryfiLens.getHasInit()) {
      console.log('this.session', this.session);
      VeryfiLens.setLensSessionKey(this.session);
    }
    VeryfiLens.initWasmLong();
    this.isLong = true;
    this.showLens = true;
  }

  async capture() {
    this.setImage(await VeryfiLens.capture());
    this.base64Image = this.image;
    this.showLens = false;
  }

  async captureWasm() {
    await VeryfiLens.captureWasm(
      this.setImage.bind(this),
      this.setIsEditing.bind(this)
    );
    this.base64Image = this.image;
    this.showLens = false;
    this.isWasm = false;
  }

  async startStitching(){
    await VeryfiLens.startStitching()
    this.isStitching = true;
  }

  async captureLong() {
    await VeryfiLens.captureLong(
      this.setImage.bind(this),
      this.setIsEditing.bind(this)
    );
    this.base64Image = this.image;
    this.isStitching = false;
    this.isLong = false;
    this.showLens = false;
  }

  startCamera(): void {
    VeryfiLens.startCamera();
    document.body.style.overflow = 'hidden';
  }
  startWasm(): void {
    VeryfiLens.startWasm();
    document.body.style.overflow = 'hidden';
  }

  stopCamera(): void {
    this.showLens = false;
    this.image = '';
    try {
      VeryfiLens.stopCamera();
    } catch (e) {
      console.warn(e);
    }
  }
  stopWasm(): void {
    this.showLens = false;
    this.image = '';
    try {
      VeryfiLens.stopWasm();
    } catch (e) {
      console.warn(e);
    }
  }

  goBack(): void {
    this.setIsEditing(false);
    this.setImage('');
    this.showLens = false;
  }

  setImage(image: any): void {
    this.image = image;
  }
  setIsEditing(isEditing: boolean): void {
    this.isEditing = isEditing;
  }
}
