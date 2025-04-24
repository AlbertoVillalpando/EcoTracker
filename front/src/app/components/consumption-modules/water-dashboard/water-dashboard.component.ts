import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { KpiCardComponent } from '../../kpi-cards/kpi-card/kpi-card.component';
import { KpiPaginationComponent } from '../../kpi-cards/kpi-pagination/kpi-pagination.component';
import { ConsumptionService } from '../../../services/consumption.service';
import { WaterAnalyticsService } from '../../../services/analytics/water-analytics.service';
import { SparklineService } from '../../../services/visualization/sparkline.service';
import { WaterConsumption } from '../../../models/consumption.model';
import { KpiData } from '../../../models/kpi.model';

@Component({
  selector: 'app-water-dashboard',
  templateUrl: './water-dashboard.component.html',
  styleUrls: ['./water-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    KpiCardComponent,
    KpiPaginationComponent
  ]
})
export class WaterDashboardComponent implements OnInit {
  @Input() activeTabName: string = 'agua';

  waterConsumption: WaterConsumption[] = [];
  waterKpis: KpiData[] = [];
  currentKpiPage = 0;

  constructor(
    private consumptionService: ConsumptionService,
    private waterAnalyticsService: WaterAnalyticsService,
    private sparklineService: SparklineService
  ) {}

  ngOnInit(): void {
    this.loadWaterData();
  }

  /**
   * Load water consumption data and process KPIs
   */
  private loadWaterData(): void {
    this.consumptionService.getWaterConsumption().subscribe({
      next: (data) => {
        this.waterConsumption = this.sortByDate(data);
        this.processWaterKpis();
      },
      error: (error) => {
        console.error('Error loading water consumption data:', error);
        // Optional: Load mock data for development/testing
        this.waterConsumption = this.consumptionService.getMockWaterData();
        this.processWaterKpis();
      }
    });
  }

  /**
   * Process water consumption data into KPI metrics
   * This is now delegated to the WaterAnalyticsService
   */
  private processWaterKpis(): void {
    this.waterKpis = this.waterAnalyticsService.generateWaterKpis(
      this.waterConsumption,
      this.sparklineService
    );
  }

  /**
   * Change the current KPI page
   */
  onPageChange(page: number): void {
    this.currentKpiPage = page;
  }

  /**
   * Helper to sort consumption data by date (newest first)
   */
  private sortByDate<T extends { date: Date }>(data: T[]): T[] {
    return [...data].sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
