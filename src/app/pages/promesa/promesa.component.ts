import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styleUrls: ['./promesa.component.css']
})
export class PromesaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(res => console.log(res));

    // Promesa simple ejemplo
    // const promesa = new Promise( (resolve, reject)=>{
    //   if(false)
    //     resolve('todo ok');
    //   else  
    //     reject('algo no salio como debia')
    // });

    // // Promesa resulta con exito
    // promesa.then((respuesta)=>{
    //   console.log('promesa terminata', respuesta);
    // })
    // // error en la promesa
    // .catch(error => console.log('error en promesa*', error))

    // console.log('fin init');
  }


  getUsuarios(){

    // Manejo de promesas Forma 1
    // return new Promise( resolve => {
    const promesa = new Promise( resolve => {
      fetch('https://reqres.in/api/users')
        .then( res => res.json())
        .then( users => resolve(users.data))
    });

    return promesa;

    // Forma 2
    // fetch('https://reqres.in/api/users').then(res => {
    //   res.json().then(r => console.log(r))
    // })
  }
}
