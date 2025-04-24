import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { KpiCardComponent } from '../../kpi-cards/kpi-card/kpi-card.component';
import { KpiPaginationComponent } from '../../kpi-cards/kpi-pagination/kpi-pagination.component';

/**
 * Component for the electricity dashboard module
 */
@Component({
  selector: 'app-electricity-dashboard',
  templateUrl: './electricity-dashboard.component.html',
  styleUrls: ['./electricity-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    KpiCardComponent,
    KpiPaginationComponent
  ]
})
export class ElectricityDashboardComponent implements OnInit {
  @Input() activeTabName: string = 'electricidad';

  // Add your component properties and methods here

  constructor() {}

  ngOnInit(): void {
    // Initialize component
  }
}
