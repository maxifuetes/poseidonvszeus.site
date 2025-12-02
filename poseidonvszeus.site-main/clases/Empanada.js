class Empanada {
  constructor(imagen, x, tipo) {
    this.imagen = imagen;
    this.x = x;
    this.y = 100;
    this.tipo = tipo;
    this.velocidad = 3;
  }
  mover() { this.y += this.velocidad; }
  mostrar() { image(this.imagen, this.x - 25, this.y - 25, 50, 50); } 
  fueraPantalla() { return this.y > height + 30; }
}
