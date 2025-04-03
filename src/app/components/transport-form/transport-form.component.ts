import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ConsumptionService } from '../../services/consumption.service';
import { TransportUsage } from '../../models/consumption.model';

/**
 * Component for recording transport usage data
 */
@Component({
  selector: 'app-transport-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="container">
      <div class="form-container">
        <h2>Transporte</h2>

        <div class="form-group">
          <label for="kilometers">Kilómetros recorridos</label>
          <input
            type="number"
            id="kilometers"
            name="kilometers"
            [(ngModel)]="transport.kilometers"
            class="form-control"
            required
          >
        </div>

        <div class="form-group">
          <label for="type">Tipo de transporte</label>
          <select
            id="type"
            name="type"
            [(ngModel)]="transport.transportType"
            class="form-control"
            required
          >
            <option value="car">Automóvil</option>
            <option value="bus">Autobús</option>
            <option value="bicycle">Bicicleta</option>
            <option value="walk">Caminando</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div class="form-group">
          <label for="date">Fecha</label>
          <input
            type="date"
            id="date"
            name="date"
            [(ngModel)]="transportDate"
            class="form-control"
            required
          >
        </div>



        <div class="button-group">
          <button (click)="saveTransport()" class="btn-save">Guardar</button>
          <button (click)="cancel()" class="btn-cancel">Cancelar</button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .form-container {
      background-color: #8AE68A;
      border-radius: 12px;
      padding: 30px;
      margin-top: 30px;
    }

    h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 24px;
      background-color: #fff;
      font-size: 1rem;
    }

    select.form-control {
      appearance: none;
      background-image: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
      background-repeat: no-repeat;
      background-position: right 12px center;
    }

    .button-group {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }

    .btn-save, .btn-cancel {
      padding: 12px 40px;
      border: none;
      border-radius: 24px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .btn-save {
      background-color: #00833c;
      color: white;
    }

    .btn-cancel {
      background-color: #e53935;
      color: white;
    }

    .btn-save:hover {
      background-color: #006c32;
    }

    .btn-cancel:hover {
      background-color: #c62828;
    }
  `
})
export class TransportFormComponent {
  transport: TransportUsage = {
    kilometers: 0,
    transportType: 'car',
    date: new Date(),
    cost: 0
  };

  transportDate: string = this.formatDate(new Date());

  constructor(
    private consumptionService: ConsumptionService,
    private router: Router
  ) {}

  /**
   * Save the transport usage data
   */
  saveTransport(): void {
    // Update the date from the input field
    this.transport.date = new Date(this.transportDate);

    this.consumptionService.saveTransportUsage(this.transport)
      .subscribe({
        next: () => {
          // Navigate back to habits page after successful save
          this.router.navigate(['/habitos']);
        },
        error: (error) => {
          console.error('Error saving transport usage:', error);
          // In a real app, show an error message to the user
        }
      });
  }

  /**
   * Cancel the form submission and return to habits page
   */
  cancel(): void {
    this.router.navigate(['/habitos']);
  }

  /**
   * Format a date for the date input field
   */
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
