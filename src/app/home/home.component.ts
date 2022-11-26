import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { share } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  active = this.activeroute.fragment.pipe(share());
  constructor(
    public activeroute: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  /**
   * open the Dialog for the Profil Component
   *
   */
  openDialog(): void {
    //this.dialog.open(ProfilComponent);
  }
}
