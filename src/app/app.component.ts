import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ExcelUploadComponent], // Import ExcelUploadComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'excel-reader-app';
}