import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'hospitales' | 'medicos',
    id: string
  ) {
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;

      const formData = new FormData();
      formData.append('imagen', archivo);

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });

      const data = await res.json();
      
      if(data.ok){
        return data.nombreArchivo;
      }else return false;

    } catch (error) {
      console.log('Error', error);
      return false;
    }
  }
}
