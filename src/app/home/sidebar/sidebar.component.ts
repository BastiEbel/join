import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { share } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  active = this.activeroute.fragment.pipe(share());
  constructor(public activeroute: ActivatedRoute) {}

  ngOnInit(): void {}
  deactivate() {}
}
