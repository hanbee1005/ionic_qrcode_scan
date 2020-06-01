import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrCodeScanPageRoutingModule } from './qr-code-scan-routing.module';

import { QrCodeScanPage } from './qr-code-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrCodeScanPageRoutingModule
  ],
  declarations: [QrCodeScanPage]
})
export class QrCodeScanPageModule {}
