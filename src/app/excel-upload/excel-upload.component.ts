import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-upload',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule here
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css']
})
export class ExcelUploadComponent {
  data: any[] = [];
  searchText: string = '';
  searchColumn: number = 0;

  get filteredData(): any[] {
    if (!this.searchText) return this.data.slice(1);
  
    return this.data.slice(1).filter(row => {
      const cellValue = row[this.searchColumn];
  
      // Skip if the cell value is null or undefined
      if (cellValue === null || cellValue === undefined) return false;
  
      // Convert the cell value to a string for comparison
      const cellValueStr = cellValue.toString().toLowerCase();
      const searchTextLower = this.searchText.toLowerCase();
  
      // Check if the search text contains a wildcard (%)
      if (searchTextLower.includes('%')) {
        const searchPattern = searchTextLower.replace(/%/g, ''); // Remove all wildcards
        if (searchTextLower.startsWith('%') && searchTextLower.endsWith('%')) {
          // Search for text containing the pattern (e.g., %text%)
          return cellValueStr.includes(searchPattern);
        } else if (searchTextLower.startsWith('%')) {
          // Search for text ending with the pattern (e.g., %text)
          return cellValueStr.endsWith(searchPattern);
        } else if (searchTextLower.endsWith('%')) {
          // Search for text starting with the pattern (e.g., text%)
          return cellValueStr.startsWith(searchPattern);
        }
      } else {
        // Normal search (exact match or contains)
        return cellValueStr.includes(searchTextLower);
      }
  
      return false;
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    this.searchColumn = 0; // Reset the search column
    this.searchText = ''; // Reset the
    fileReader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      this.data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    };
    fileReader.readAsArrayBuffer(file);
  }
}