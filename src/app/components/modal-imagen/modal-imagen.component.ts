import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from '../../services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css'],
})
export class ModalImagenComponent implements OnInit {
  public imgTemp: any = null;
  public imagenSubir: File;

  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService
  ) {
  }

  ngOnInit(): void {}

  cerrarModal() {
    this.modalImagenService.cerrarModal();
    this.imgTemp = null;
  }

  // change del input tipo file
  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen(){
  
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
      .then( img => {
        Swal.fire('Nuevo cambio', 'Imagen actualizada', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      })
      .catch( (err) => {
        console.log(err);
        Swal.fire('Error', 'No se logró cargar la imagen', 'error');
      })
  }
}
