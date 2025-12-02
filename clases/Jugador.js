class Jugador {
  constructor(imagen, carriles) {
    this.imagen = imagen;
    this.carriles = carriles;
    this.carrilActual = 2;
    this.x = carriles[this.carrilActual];
    this.y = 440;
    this.cooldownMs = 120;
    this.ultimoPaso = 0;
  }

  mover(direccion) {
    if (millis() - this.ultimoPaso < this.cooldownMs) return;

    if (direccion === "izquierda" && this.carrilActual > 0) this.carrilActual--;
    else if (direccion === "derecha" && this.carrilActual < this.carriles.length - 1) this.carrilActual++;

    this.x = this.carriles[this.carrilActual];
    this.ultimoPaso = millis();
  }

  mostrar() {
    
    image(this.imagen, this.x - 40, this.y - 80, 80, 80);
  }
}
