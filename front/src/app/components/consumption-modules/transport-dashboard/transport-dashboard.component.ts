import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { KpiCardComponent } from '../../kpi-cards/kpi-card/kpi-card.component';
import { KpiPaginationComponent } from '../../kpi-cards/kpi-pagination/kpi-pagination.component';

/**
 * Component for the transport dashboard module
 */
@Component({
  selector: 'app-transport-dashboard',
  templateUrl: './transport-dashboard.component.html',
  styleUrls: ['./transport-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    KpiCardComponent,
    KpiPaginationComponent
  ]
})
export class TransportDashboardComponent implements OnInit {
  @Input() activeTabName: string = 'transporte';

  // Add your component properties and methods here

  constructor() {}

  ngOnInit(): void {
    // Initialize component
  }
}
