import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent {
  title: string = '';
  titleSubs$: Subscription;

  // Obtener la data de la ruta para mostrar el titulo por pantalla
  constructor(private router: Router) {
    this.titleSubs$ = this.getDataRouter().subscribe(({ title }) => {
      this.title = title;
      document.title = title;
    });
  }

  getDataRouter() {
    return this.router.events.pipe(
      // Solo tomar las instancias de ActivationEnd
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }
}
