import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, AfterViewInit {
  date: Date = new Date();
  getHour: any;
  greeding: string = '';
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.getHour = this.date.getHours().toLocaleString('HH');

    if (this.getHour > 0 && this.getHour < 12) {
      this.greeding = 'Good Morning';
    } else if (this.getHour > 12 && this.getHour < 18) {
      this.greeding = 'Good afternoon';
    } else {
      this.greeding = 'Good evening';
    }
    this.changeDetectorRef.detectChanges();
  }
}
