import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],
})
export class ValueComponent implements OnInit {
  public values: ValueModel;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getValues();
  }

  private getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe(
      (res: ValueModel) => (this.values = res),
      (err) => console.log(err)
    );
  }
}

interface ValueModel {
  id: number;
  name: string;
}
