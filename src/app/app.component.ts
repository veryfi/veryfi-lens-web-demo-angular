declare const VeryfiLens: any

import {Component} from '@angular/core';
// import VeryfiLens from 'veryfi-lens-sdk'
import axios from 'axios';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
  }

  title = 'lens-angular';
  image: string = ''
  base64Image: string = ''
  session: string = ''
  showLens: boolean = false
  isEditing: boolean = false
  clientId: string = "YOUR_CLIENT_ID"
  VALIDATE_URL = 'https://lens.veryfi.com/rest/validate_partner';

  ngOnInit() {
    this.getVeryfiSession(this.clientId)
  }

  async getVeryfiSession(clientId: string)  {
  return await axios.post(
    this.VALIDATE_URL,
    {},
    {
      headers: {
        'CLIENT-ID': clientId,
      },
    }).then((response) => {
      console.log(response.data.session)
      this.session = response.data.session
    }).catch((error) => error);
}

  initLens(): void {
    console.log(this.session)
    if (!VeryfiLens.getHasInit()) {
      console.log('this.session', this.session)
      VeryfiLens.setLensSessionKey(this.session)
    }

    VeryfiLens.init()
    this.startCamera()
    this.showLens = true
  }
// NPM VERSION CAPTURE
  // async capture() {
  //  await VeryfiLens.capture(
  //     this.setImage.bind(this),
  //     this.setIsEditing.bind(this)  
  //   );
  //   this.base64Image = this.image;
  //   this.showLens = false
  // }

  // <Script> VERSION CAPTURE
 async capture() {
   this.setImage(await VeryfiLens.capture())
    this.base64Image = this.image
    this.showLens = false
  }
  startCamera(): void {
    VeryfiLens.startCamera()
    document.body.style.overflow = 'hidden'
  }

  stopCamera(): void {
    this.showLens = false
    this.image = ''
    try {
      VeryfiLens.stopCamera()
    } catch (e) {
      console.warn(e)
    }
  }

  goBack(): void {
    this.setIsEditing(false)
    this.setImage('')
    this.showLens = false

  }

  setImage(image: any): void {
    this.image = image
  }
  setIsEditing(isEditing: boolean): void {
    this.isEditing = isEditing
  }
}
