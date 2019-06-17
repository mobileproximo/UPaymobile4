import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-mescodes',
  templateUrl: './mescodes.page.html',
  styleUrls: ['./mescodes.page.scss'],
})
export class MescodesPage implements OnInit {

  constructor(public glb: GlobaleVariableService, public serv: ServiceService) { }
  public mesCodes: any = [];
  ngOnInit() {

  }
  ionViewDidEnter(){
    this.glb.ShowPin = false;
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-06.png';
    this.glb.HEADERTITELE.title = 'Mes Codes de Retrait';
    const parametres: any = {};
    parametres.idTerm = this.glb.IDTERM;
    parametres.session = this.glb.IDSESS;
    parametres.telephone = this.glb.PHONE;

    this.serv.afficheloading();
    this.serv.posts('recharge/getcondesUpay.php', parametres, {}).then(data => {
      this.serv.dismissloadin();
      const reponse = JSON.parse(data.data);
      if (reponse.returnCode === '0') {
        const codes = reponse.listCodeUpay.codeUpay;
        if (codes.length) {
        this.mesCodes = codes;
        } else {
          this.mesCodes = [];
          this.mesCodes[0] = codes;
        }
      } else { this.serv.showError(reponse.errorLabel); }
  }).catch(err => {
      this.serv.dismissloadin();
      this.serv.showError('Impossible d\'atteindre le serveur');

    });
  }
}
