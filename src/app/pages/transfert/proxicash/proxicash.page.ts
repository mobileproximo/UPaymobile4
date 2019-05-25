import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';

@Component({
  selector: 'app-proxicash',
  templateUrl: './proxicash.page.html',
  styleUrls: ['./proxicash.page.scss'],
})
export class ProxicashPage implements OnInit {
  private dataenvoi: any = {};
  private afficheenv = true;
  constructor(public glb: GlobaleVariableService) { }

  ngOnInit() {
    this.glb.ShowPin = false;
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.dataenvoi.image = this.glb.IMAGE_BASE_URL + 'Icon-16.png';
    this.dataenvoi.oper = '0052';
    this.dataenvoi.operateur = 'ProxiCash';
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-03.png';
    this.glb.HEADERTITELE.title = 'Transfert d\'argent';
    this.afficheenv = true;

  }

}
