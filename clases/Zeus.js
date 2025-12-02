class Zeus {
  constructor(imagen, carriles) {
    this.imagen = imagen;
    this.carriles = carriles;
    this.carrilActual = 2;
    this.x = carriles[this.carrilActual];
    this.y = 100;
    this.tiempoCambio = 0;
    this.intervaloCambio = 1000;
  }

  actualizar() {
    if (millis() - this.tiempoCambio > this.intervaloCambio) {
      this.carrilActual = int(random(this.carriles.length));
      this.x = this.carriles[this.carrilActual];
      this.tiempoCambio = millis();
    }
  }

  mostrar() {
    
    image(this.imagen, this.x - 40, this.y - 80, 80, 80);
  }
}
