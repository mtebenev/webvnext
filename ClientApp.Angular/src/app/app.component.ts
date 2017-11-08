import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  public output: string;

  constructor(private httpClient: HttpClient) {

  }

  public handleLoadContactsClick(): void {

    this.httpClient.get('http://localhost:59613/api/contact')
      .subscribe(data => {
        this.output = JSON.stringify(data);

      }, (error) => {
        alert('error loading data!');
        this.output = JSON.stringify(error);
      });
  }
}
