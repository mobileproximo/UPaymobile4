import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { Storage } from '@ionic/storage';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-code-otp',
  templateUrl: './code-otp.page.html',
  styleUrls: ['./code-otp.page.scss'],
})
export class CodeOTPPage implements OnInit {
  userdata: any;
  codeotp: any;
  constructor(private router: Router,
              private serv: ServiceService,
              private storage: Storage,
              private glb: GlobaleVariableService,
              private navCtrl: NavController) {
    this.userdata = this.router.getCurrentNavigation().extras.state.user;
  }

  ngOnInit() {
  }

  souscription() {

    this.userdata.codeOTP = this.codeotp;
    this.serv.afficheloading();
    this.serv.posts('connexion/checkOTP.php', this.userdata, {}).then(data => {
      const reponse = JSON.parse(data.data);

      if (reponse.returnCode === '0') {
        this.serv.posts('connexion/souscription.php', this.userdata, {}).then(rep => {
          this.serv.dismissloadin();
          const souscription = JSON.parse(rep.data);
          if (souscription.returnCode === '0') {
            this.glb.ShowPin = true;
            this.storage.set('login', this.userdata.login);
            this.serv.showAlert(souscription.returnMsg);
            setTimeout(() => {
              this.navCtrl.navigateRoot('/connexion');
            }, 200);
          } else {
            this.serv.showError(souscription.errorLabel);
          }

        }).catch(err => {
          this.serv.dismissloadin();
          this.serv.showError('Impossible d\'atteindre le serveur');
        });

      } else {
        this.serv.dismissloadin();
        this.serv.showError(reponse.errorLabel);
      }

    }).catch(err => {
      this.serv.dismissloadin();
      this.serv.showError('Impossible d\'atteindre le serveur');
    });

  }
  generercode() {}
}
