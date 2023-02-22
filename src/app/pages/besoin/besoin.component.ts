import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Besoin, statusType } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-besoin',
  templateUrl: './besoin.component.html',
  styleUrls: ['./besoin.component.css'],
})
export class BesoinComponent implements OnInit {
  besoins: Array<Besoin> = [];
  statusTypes: Array<statusType> = [];
  newBesoin = {
    description: '',
    status: 'Terminé',
    file: '',
    offre: '',
    date_envoi: '',
    date_rappel: '',
  };
  selectedValue = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`http://localhost:8080/besoins`).subscribe((res: any) => {
      try {
        console.log(res);

        this.besoins = res;
        console.log(res);
      } catch (error) {
        console.log('An error occured');
      }
    });

    this.http
      .get(`http://localhost:8080/besoins/status/types`)
      .subscribe((res: any) => {
        try {
          console.log(res);

          this.statusTypes = res;
          console.log(res);
        } catch (error) {
          console.log('An error occured');
        }
      });
  }

  createBesoin(event: any) {
    event.preventDefault();
    const data = new FormData();
    const d = new Date();
    let date = d.toLocaleDateString('en-GB');
    data.append('description', this.newBesoin.description);
    data.append('date', date);
    data.append('offre', this.newBesoin.offre);
    data.append('status', this.newBesoin.status);
    data.append('file', this.newBesoin.file);
    data.append('date_envoi', this.newBesoin.date_envoi);
    data.append('date_rappel', this.newBesoin.date_rappel);

    this.http.post(`http://localhost:8080/besoins`, data).subscribe((res) => {
      try {
        this.ngOnInit();
        this.newBesoin = {
          description: '',
          status: 'Terminé',
          file: '',
          offre: '',
          date_envoi: '',
          date_rappel: '',
        };
        const dates = document.querySelectorAll('.dates');
        dates.forEach((date: any) => (date.value = ''));
      } catch (error) {
        console.log('An error occured');
      }
    });
  }

  onSelected(e: any) {
    console.log(e.target);
    const index = e.target.selectedIndex;
    const { value } = e.target[index];
    this.newBesoin = { ...this.newBesoin, status: value };
  }

  handleChange(e: any) {
    const { type, value, name } = e.target;
    console.log(type);
    if (type === 'date') {
      const d = new Date(value);
      let date = d.toLocaleDateString('en-GB');
      this.newBesoin = { ...this.newBesoin, [name]: date };
    } else {
      this.newBesoin = { ...this.newBesoin, [name]: value };
    }
  }

  selectFile(e: any) {
    const [file] = e.target.files;
    this.newBesoin = { ...this.newBesoin, file };
    console.log(file);
  }

  updateFile(e: any) {
    const [file] = e.target.files;
    const { id } = e.target;
    const data = new FormData();
    data.append('file', file);
    this.http
      .put(`http://localhost:8080/besoins/${id}`, data)
      .subscribe((res) => {
        try {
          this.ngOnInit();
        } catch (error) {
          console.log('An error occured');
        }
      });
  }

  showFile(event: any) {
    const { id } = event.target;
    window.location.href = `http://localhost:8080/besoins/file/${id}`;
  }

 
}
