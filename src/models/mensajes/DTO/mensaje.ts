export default class MensajeDTO {
  from: string;
  message: string;

  constructor(mensaje: string, tipo: string) {
    this.from = tipo === 'USUARIO' ? 'Yo' : 'Robot';
    this.message = mensaje;
  }
}
