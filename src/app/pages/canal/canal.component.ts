import { Component, OnInit, ViewChild } from '@angular/core';
import { Canal } from 'src/app/utils/interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-canal',
  templateUrl: './canal.component.html',
  styleUrls: ['./canal.component.css'],
})
export class CanalComponent implements OnInit {
  canals: Array<Canal> = [];
  newCanal = {
    name: '',
  };
  temp: Array<string> = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`http://localhost:8080/canals`).subscribe((res: any) => {
      try {
        console.log(res);

        this.canals = res.map((canal: any) => {
          canal = { ...canal, disabled: true };
          this.temp.push(canal.name);
          return canal;
        });
        console.log(res);
      } catch (error) {
        console.log('An error occured');
      }
    });
  }

  handleChange(event: any) {
    const { name, value } = event.target;
    this.newCanal = { ...this.newCanal, [name]: value };
    console.log(this.newCanal);
  }

  createCanal(event: any) {
    event.preventDefault();
    if (this.newCanal.name === '') {
      alert('Canal cannot be empty string');
      return;
    }
    this.http
      .post(`http://localhost:8080/canals`, {
        ...this.newCanal,
      })
      .subscribe((res: any) => {
        try {
          if (res.error) {
            alert(res.error);
          } else {
            this.ngOnInit();
            this.newCanal.name = '';
            console.log(res);
          }
        } catch (error) {
          console.log('An error occured');
        }
      });
  }

  deleteCanal(event: any) {
    const { id } = event.target;
    this.http.delete(`http://localhost:8080/canals/${id}`).subscribe((res) => {
      try {
        console.log(res);
        this.ngOnInit();
      } catch (error) {
        console.log('An error occured');
      }
    });
  }

  enable(i: number) {
    console.log(i);
    this.canals = this.canals.map((canal: any, index) => {
      console.log(index);
      if (i === index) {
        canal = { ...canal, disabled: false };
      }
      return canal;
    });
  }

  update(event: any, index: number) {
    const { id } = event.target;
    if (this.temp[index] === '') {
      alert('Canal cannot be empty string');
      return;
    }
    const canal = this.canals.find((canal) => canal.id === id);
    canal!.name = this.temp[index];
    this.http
      .put(`http://localhost:8080/canals/${id}`, canal)
      .subscribe((res) => {
        try {
          console.log(res);
          this.ngOnInit();
        } catch (error) {
          console.log('An error occured');
        }
      });
  }

  editText(event: any, i: number) {
    console.log(this.temp);
    console.log(i);
    const { value } = event.target;
    console.log(value);

    this.temp = this.temp.map((text: any, index) => {
      if (i === index) {
        text = value;
      }
      return text;
    });
  }
}
