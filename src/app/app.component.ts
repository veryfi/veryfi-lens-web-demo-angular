import { Component } from '@angular/core';
import axios from 'axios';
import { NgIf } from '@angular/common';
//@ts-ignore
import VeryfiLens from 'veryfi-lens-wasm';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [NgIf],
})
export class AppComponent {
  constructor() {}

  title = 'lens-angular';
  image: string = '';
  imageFile: any = '';
  base64Image: string = '';
  imageData: string = '';
  croppedImage: string = '';
  session: string = '';
  showLens: boolean = false;
  isSocket: boolean = false;
  isWasm: boolean = false;
  isEditing: boolean = false;
  isLong: boolean = false;
  isStitching: boolean = false;
  isUpload: boolean = false;
  deviceData: object = {};

  VALIDATE_URL = 'https://lens.veryfi.com/rest/validate_partner';
  PROCESS_DOCUMENT_URL = 'https://lens-dev.veryfi.com/rest/process';
  CLIENT_ID = 'YOUR_CLIENT_ID';
  API_KEY = 'YOUR_API_KEY';
  USERNAME = 'YOUR_USERNAME';

  async ngOnInit() {
    this.getVeryfiSession(this.CLIENT_ID);
    this.deviceData = await VeryfiLens.getDeviceData();
  }

  async getVeryfiSession(CLIENT_ID: string) {
    return await axios
      .post(
        this.VALIDATE_URL,
        {},
        {
          headers: {
            'CLIENT-ID': CLIENT_ID,
          },
        }
      )
      .then((response) => {
        console.log(response.data.session);
        this.session = response.data.session;
      })
      .catch((error) => error);
  }

  async initLens(): Promise<void> {
    this.isSocket = true;
    console.log(this.session);
    if (!VeryfiLens.getHasInit()) {
      console.log('this.session', this.session);
      await VeryfiLens.setLensSessionKey(this.session);
    }
    this.showLens = true;
    setTimeout(() => {
      VeryfiLens.init(this.session, this.CLIENT_ID);
    }, 1000);
  }

  async initWasm(): Promise<void> {
    console.log(this.session);
    this.showLens = true;
    this.isWasm = true;
    if (!VeryfiLens.getHasInit()) {
      console.log('this.session', this.session);
      await VeryfiLens.setLensSessionKey(this.session);
    }
    setTimeout(() => {
      VeryfiLens.initWasm(this.session, this.CLIENT_ID);
    }, 1000);
  }

  initWasmLong(): void {
    console.log(this.session);
    this.showLens = true;
    this.isLong = true;
    if (!VeryfiLens.getHasInit()) {
      console.log('this.session', this.session);
      VeryfiLens.setLensSessionKey(this.session);
    }
    setTimeout(() => {
      VeryfiLens.initWasmLong(this.session, this.CLIENT_ID);
    }, 1000);
  }

  initDragAndDrop(): void {
    console.log(this.session);
    this.isUpload = true;
    if (!VeryfiLens.getHasInit()) {
      console.log('this.session', this.session);
      VeryfiLens.setLensSessionKey(this.session);
    }
    setTimeout(() => {
      VeryfiLens.initUploadWasm(this.session, this.CLIENT_ID);
    }, 1000);
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

  async startStitching() {
    await VeryfiLens.startStitching();
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
      VeryfiLens.stopCameraWasm();
    } catch (e) {
      console.warn(e);
    }
  }

  goBack(): void {
    this.setIsEditing(false);
    this.setImage('');
    this.showLens = false;

    console.log(
      'isSocket',
      this.isSocket,
      'isWasm',
      this.isWasm,
      'isLong',
      this.isLong,
      'isUpload',
      this.isUpload
    );
    if (this.isSocket) {
      this.stopCamera();
    }
    if (this.isWasm || this.isLong) {
      this.stopWasm();
    }

    this.isWasm = false;
    this.isLong = false;
    this.isUpload = false;
    this.base64Image = '';
    this.isSocket = false;
    this.isStitching = false;
    this.imageFile = '';
    this.image = '';
  }

  setImage(image: any): void {
    this.image = image;
  }
  setIsEditing(isEditing: boolean): void {
    this.isEditing = isEditing;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  triggerInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  handleFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.base64Image = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  processFile = (file: any) => {
    this.imageFile = file;
    const reader = new FileReader();
    reader.onload = async (e) => {
      let imgData = e.target?.result as string;
      this.imageData = imgData;
      const finalImage = this.imageData.split(',')[1];
      this.base64Image = finalImage;
    };
    reader.readAsDataURL(file);
  };

  handleImageChange = (e: any) => {
    console.log('Handling');
    const file = e.target.files && e.target.files[0];
    console.log(file, 'file');
    if (file) {
      this.processFile(file);
    }
  };

  handleUploadCrop = async () => {
    const data = await VeryfiLens.captureUploaded(
      this.imageFile as unknown as Blob
    );
    this.setImage(data);
    this.setIsEditing(true);
    this.croppedImage = data;
  };

  async processImage(
    image: string,
    clientId: string,
    username: string,
    apiKey: string,
    deviceData: object
  ) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: image,
          username: username,
          api_key: apiKey,
          client_id: clientId,
          device_data: deviceData,
        }),
      };
      const response = await fetch(this.PROCESS_DOCUMENT_URL, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error processing the image:', error);
      throw error; // Re-throw the error for further handling if needed
    }
  }

  handleSubmit = async () => {
    const data = await this.processImage(
      this.image,
      this.CLIENT_ID,
      this.USERNAME,
      this.API_KEY,
      this.deviceData
    );
    console.log(data);
  };
}
