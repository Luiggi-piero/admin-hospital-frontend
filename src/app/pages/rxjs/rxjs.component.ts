import { Component } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent {

  intervalSubs: Subscription;

  constructor() {
    // this.getObservable().pipe(
    //   // retry  ejecuta todo el observable otra vez
    //   // y continua con el ultimo valor emitido
    //   retry(1)
    // ).subscribe({
    //   next: valor => console.log('valor', valor),
    //   error: error => console.error('error', error),
    //   complete: () => console.info('ob completado')
    // });
    this.intervalSubs = this.getInterval().subscribe((value) => console.log(value));
  }

  getObservable(): Observable<number> {
    let i = -1;

    const ob$ = new Observable<number>((observer) => {
      const interval = setInterval(() => {
        // console.log('i antes de aumentar', i);
        i++;
        // console.log('i luego de aumentar', i);
        observer.next(i);

        if (i === 4) {
          // console.log('i es 4***');
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          // console.log('i es 2*** error');
          observer.error('i llego a 2');
          clearInterval(interval);
        }
      }, 1000);
    });

    return ob$;
  }

  getInterval(): Observable<number> {
    // return interval(1000).pipe(
    const interval$ = interval(500).pipe(
      take(10),
      map(value => value + 1),
      filter(numero => numero % 2 === 0),
    );
    return interval$;
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();    
  }
}
