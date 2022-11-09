import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor() {}
  summary: boolean = false;
  board: boolean = false;
  task: boolean = false;
  contacts: boolean = false;
  ngOnInit(): void {
    this.summary = true;
  }

  homeLink() {
    this.summary = true;
    this.board = false;
    this.task = false;
    this.contacts = false;
  }

  boardLink() {
    this.summary = false;
    this.board = true;
    this.task = false;
    this.contacts = false;
  }

  taskLink() {
    this.summary = false;
    this.board = false;
    this.task = true;
    this.contacts = false;
  }
  contactLink() {
    this.summary = false;
    this.board = false;
    this.task = false;
    this.contacts = true;
  }
}
