import { Component, OnInit } from '@angular/core';

import { Platform, AlertController, NavController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-qr-code-scan',
  templateUrl: './qr-code-scan.page.html',
  styleUrls: ['./qr-code-scan.page.scss'],
})
export class QrCodeScanPage implements OnInit {

  scanSub;

  private contentClass = '';

  constructor(private platform: Platform,
              private alertController: AlertController,
              private navController: NavController,
              private qrScanner: QRScanner) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.openScanner();
    });
  }

  ionViewDidEnter() {
    this.showCamera();
  }

  ionViewWillLeave() {
    this.closeScanner();
  }


  showCamera() { // 배경 투명하게 전환
    this.contentClass = 'background-color-transparent';
  }

  hideCamera() {
    this.contentClass = '';
  }

  openScanner() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);

          this.scanned(text);
        });

        this.qrScanner.resumePreview();
        this.showCamera();
        this.qrScanner.show();

      } else if (status.denied) {
            // camera permission was permanently denied
            // you must use QRScanner.openSettings() method to guide the user to the settings page
            // then they can grant the permission from there
      } else {
            // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    }).catch(async (e: any) => {
      console.log('Error is', e);

      if (e.code === 1) {
        const alert = await this.alertController.create({
          header: 'Camera Permission',
          message: 'QR 스캔을 위한 카메라 권한이 거부되었습니다. 설정에서 허용해 주세요.',
          buttons: [{
            text: '확인',
            handler: () => {
              this.navController.navigateBack('home');
              this.qrScanner.openSettings();
            }
          }]
        });

        await alert.present();
      }
    });
  }

  closeScanner() {
    if (this.scanSub) {
      this.scanSub.unsubscribe(); // stop scanning
    }
    this.scanSub = null;
    this.hideCamera();

    this.qrScanner.hide(); // hide camera preview
    this.qrScanner.destroy();
  }

  async scanned(data: any) {
    const alert = await this.alertController.create({
      header: 'Scan Result',
      message: data,
      buttons: [{
        text: '확인',
        handler: () => {
          this.navController.navigateBack('home');
        }
      }]
    });

    await alert.present();
  }
}
