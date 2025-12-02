class Juego {
  constructor(poseidon, zeus, sonidoCatch, sonidoLose) {
    this.poseidon = poseidon;
    this.zeus = zeus;
    this.sonidoCatch = sonidoCatch;
    this.sonidoLose = sonidoLose;
    this.empanadas = [];
    this.puntos = 0;
    this.vidas = 3;
  }

  actualizar() {
    this.zeus.actualizar();

    
    if (frameCount % 60 === 0) {
      const tipo = random() < 0.7 ? "buena" : "mala";
      const img = (tipo === "buena") ? imgEmpanadaBuena : imgEmpanadaMala;
      this.empanadas.push(new Empanada(img, this.zeus.x, tipo));
    }

    
    for (const e of this.empanadas) e.mover();
    this.empanadas = this.empanadas.filter(e => !e.fueraPantalla());

    
    for (let e of this.empanadas) {
  e.mover();
  e.mostrar();

  
  if (dist(this.poseidon.x, this.poseidon.y, e.x, e.y) < 50) {
    if (e.tipo === "buena") {
      this.puntos += 5;
      this.sonidoCatch.play();
    } else {
      this.vidas--;
      if (this.vidas <= 0) {
        this.sonidoLose.play();
      }
    }
    e.y = height + 100; 
   }
  }
}

  mostrar() {
    
    this.zeus.mostrar();
    this.poseidon.mostrar();
    for (const e of this.empanadas) e.mostrar();

    
    this.mostrarUIAbajo();
  }

  mostrarUIAbajo() {
  const tam = 25;
  const yBase = height - 70; 

  const circuloWidth = 130;
  const circuloHeight = 60;
  
  const circuloIzqX = 20;
  
  const circuloDerX = width - 150;
  
  image(imgHudCirculo, circuloIzqX, yBase, circuloWidth, circuloHeight); 
  image(imgHudCirculo, circuloDerX, yBase, circuloWidth, circuloHeight); 

  const centroIzqX = circuloIzqX + (circuloWidth / 2);
  const xOffsetVidas = centroIzqX - 45; 
  const yOffsetVidas = yBase + 18;
  
  for (let i = 0; i < 3; i++) {
    const x = xOffsetVidas + i * (tam + 8);
    if (i < this.vidas) image(imgVidaLlena, x, yOffsetVidas, tam, tam);
    else image(imgVidaVacia, x, yOffsetVidas, tam, tam);
  }


  push();
  textFont(fuentePixel); 
  textAlign(CENTER, CENTER);
  textSize(16);
  fill(255);
  noStroke();
  
  const centroDerX = circuloDerX + (circuloWidth / 2);
  const centroDerY = yBase + (circuloHeight / 2) - 2;
  
  text(`PUNTOS: ${this.puntos}`, centroDerX, centroDerY);
  pop();
}
}
