import { Component, ViewChild } from '@angular/core';

import { Platform, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobaleVariableService } from './service/globale-variable.service';
import { ServiceService } from './service/service.service';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private glb: GlobaleVariableService,
    private serv: ServiceService,
    public navCtrl: NavController,
    public router: Router,
    public network: Network,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#639dd5');
      this.platform.pause.subscribe(() => {

        this.glb.DATEPAUSE = new Date();
    });
      /* this.splashScreen.hide(); */

      document.addEventListener('backbutton', () => {
          if (this.router.url === '/home') {
          this.presentAlert();
          }
        });

/*       this.platform.registerBackButtonAction(() => {
        if (this.nav.length() == 1) {
            if (!this.alertShown) {
                this.presentConfirm();
            } else {
                this.alertShown = false;
            }
        }

        this.nav.pop();
    }); */
    });

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'UPay',
     // subHeader: 'Subtitle',
      message: 'Voulez-vous vraiment quitter l\'application?',
      buttons: [        {
        text: 'Non',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'oui',
        handler: () => {
          navigator.app.exitApp();
          console.log('Confirm Okay');
        }
      }]
    });

    await alert.present();
  }
  checkNetwork() {
    this.network.onDisconnect().subscribe(() => {
      this.serv.showToast('Vous n\'avez plus de connexion internet');
      this.glb.ISCONNECTED = false;

    });
    this.network.onConnect().subscribe(() => {
      this.serv.showToast('Vous êtes maintenant en ligne');
      this.glb.ISCONNECTED = true;

    });
  }
}
