import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';

@Component({
  selector: 'app-mescodes',
  templateUrl: './mescodes.page.html',
  styleUrls: ['./mescodes.page.scss'],
})
export class MescodesPage implements OnInit {

  constructor(public glb: GlobaleVariableService) { }

  ngOnInit() {
    this.glb.ShowPin = false;
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL+"Petite-Icon-06.png";
    this.glb.HEADERTITELE.title = "Mes Codes de Retrait";
  }

}
