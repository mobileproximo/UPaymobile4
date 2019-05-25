import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MonnaiePage } from './monnaie.page';
import { OrangeMoneyPage } from './orange-money/orange-money.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { WizallPage } from './wizall/wizall.page';
import { EmoneyPage } from './emoney/emoney.page';
import { PostcashPage } from './postcash/postcash.page';
import { TigocashPage } from './tigocash/tigocash.page';
import { RechargeComponent } from 'src/app/components/recharge/recharge.component';

const routes: Routes = [
  {
    path: '',
    component: MonnaiePage
  },
  {
    path: 'orange-money',
    component: OrangeMoneyPage
  },
  {
    path: 'wizall',
    component: WizallPage
  }
  ,
  {
    path: 'emoney',
    component: EmoneyPage
  },
  {
    path: 'postcash',
    component: PostcashPage
  },
  {
    path: 'tigocash',
    component: TigocashPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonnaiePage, OrangeMoneyPage, EmoneyPage, PostcashPage, WizallPage, TigocashPage]
})
export class MonnaiePageModule {}
