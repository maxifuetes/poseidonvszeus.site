let sketch = (p) => {

  let ancho = 640;
  let alto = 480;
  let estado = "inicio";
  let clickSound;


  let fondoInicio, fondoZeus, fondoDecision, fondoDuelo, fondoDuelo2;
  let fondoCulinario, fondoFinalAyuda, fondoFinalAyuda2;
  let fondoFinalFisico, fondoFinalCulinario;
  let fondoEmpanadasMalas, fondoDescubreMalas;
  let fondoReaccionaPaz, fondoReaccionaPaz2;

  
  p.preload = function () {

    const path = "assets/img/img_aventura/";

    fondoInicio = p.loadImage(path + "fondo_inicio.jpg");
    fondoZeus = p.loadImage(path + "fondo_zeus.jpg");
    fondoDecision = p.loadImage(path + "fondo_decision.jpg");

    fondoDuelo = p.loadImage(path + "fondo_duelo.jpg");
    fondoDuelo2 = p.loadImage(path + "fondo_duelo2.jpg");

    fondoCulinario = p.loadImage(path + "fondo_culinario.jpg");

    fondoFinalAyuda = p.loadImage(path + "final_ayuda.jpg");
    fondoFinalAyuda2 = p.loadImage(path + "final_ayuda2.jpg");

    fondoFinalFisico = p.loadImage(path + "final_fisico.jpg");
    fondoFinalCulinario = p.loadImage(path + "final_culinario.jpg");

    fondoEmpanadasMalas = p.loadImage(path + "empanadas_malas.jpg");
    fondoDescubreMalas = p.loadImage(path + "descubre_malas.jpg");

    fondoReaccionaPaz = p.loadImage(path + "reacciona_paz.jpg");
    fondoReaccionaPaz2 = p.loadImage(path + "reacciona_paz2.jpg");

    clickSound = p.loadSound("assets/sound/click.mp3");
  };

  
  p.setup = function () {
    let canvas = p.createCanvas(ancho, alto);
    canvas.parent("aventura-container");
  };

 
  p.draw = function () {
    mostrarPantalla(estado);
  };


  function cambiarEstado(nuevo) {
    estado = nuevo;
  }

  
  function pantallaConImagen(texto, img) {

    
    if (img) p.image(img, 0, 0, ancho, alto);

   
    p.fill(255);
    p.textSize(18);
    p.textAlign(p.CENTER, p.TOP);
    p.text(texto, ancho / 2, alto - 155); 
  }

 
  let yaClick = false;

  function mostrarBoton(txt, x, y, accion) {
    p.textSize(16);
    let w = p.textWidth(txt) + 40;
    let h = 35;

   
    p.fill(255);
    p.stroke(0);
    p.rectMode(p.CENTER);
    p.rect(ancho / 2, y, w, h, 10);

  
    p.noStroke();
    p.fill(0);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(txt, ancho / 2, y);


    if (
      p.mouseIsPressed &&
      !yaClick &&
      p.mouseX > ancho / 2 - w / 2 &&
      p.mouseX < ancho / 2 + w / 2 &&
      p.mouseY > y - h / 2 &&
      p.mouseY < y + h / 2
    ) {
      yaClick = true;
      accion();
    }
  }

  p.mouseReleased = function () {
    yaClick = false;
  };


  function botonesDistribuidos(items, y) {
    let total = 0;
    let padding = 30;

    p.textSize(16);
    items.forEach(o => o.w = p.textWidth(o.label) + padding);

    total = items.reduce((s, o) => s + o.w, 0) + (items.length - 1) * 20;

    let x = (ancho - total) / 2;

    items.forEach(o => {
      let w = o.w;
      let h = 35;

   
      p.fill(255);
      p.stroke(0);
      p.rectMode(p.CORNER);
      p.rect(x, y - h/2, w, h, 8);

     
      p.noStroke();
      p.fill(0);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(o.label, x + w/2, y);

     
      if (
        p.mouseIsPressed &&
        !yaClick &&
        p.mouseX > x &&
        p.mouseX < x + w &&
        p.mouseY > y - h/2 &&
        p.mouseY < y + h/2
      ) {
        yaClick = true;
        o.action();
      }

      x += w + 20;
    });
  }

  function botonReiniciar() {
    mostrarBoton("Reiniciar", ancho / 2, 430, () => cambiarEstado("inicio"));
  }


  function mostrarPantalla(est) {
    switch (est) {

      case "inicio":
        pantallaConImagen("Poseidón llega a la terminal de La Plata\nbuscando empanadas", fondoInicio);
        mostrarBoton("Continuar", ancho / 2, 430, () => cambiarEstado("zeus"));
        break;

      case "zeus":
        pantallaConImagen("Zeus atiende el puesto\nde empanadas", fondoZeus);
        mostrarBoton("Continuar", ancho / 2, 430, () => cambiarEstado("decision1"));
        break;

      case "decision1":
        pantallaConImagen("Zeus le exige ganarse las empanadas", fondoDecision);
        botonesDistribuidos([
          { label: "Paz / Ayuda mutua", action: () => cambiarEstado("ofrecerAyuda") },
          { label: "Duelo", action: () => cambiarEstado("decisionDuelo") },
          { label: "Empanadas malas", action: () => cambiarEstado("empanadasMalas") }
        ], 430);
        break;

      case "ofrecerAyuda":
        pantallaConImagen("Poseidón ofrece ayudar a Zeus", fondoFinalAyuda);
        mostrarBoton("Aceptar ayuda", ancho / 2, 430, () => cambiarEstado("finalAyuda"));
        break;

      case "finalAyuda":
        pantallaConImagen("FINAL: Alianza de empanadas", fondoFinalAyuda2);
        botonReiniciar();
        break;

      case "decisionDuelo":
        pantallaConImagen("¿Qué tipo de duelo harán?", fondoDuelo);
        botonesDistribuidos([
          { label: "Duelo físico", action: () => cambiarEstado("dueloFisico") },
          { label: "Duelo culinario", action: () => cambiarEstado("dueloCulinario") }
        ], 430);
        break;

      case "dueloFisico":
        pantallaConImagen("Duelo físico entre dioses", fondoDuelo2);
        mostrarBoton("Resultado", ancho / 2, 430, () => cambiarEstado("finalFisico"));
        break;

      case "dueloCulinario":
        pantallaConImagen("Competencia culinaria", fondoCulinario);
        mostrarBoton("Votos del público", ancho / 2, 430, () => cambiarEstado("finalCulinario"));
        break;

      case "finalFisico":
        pantallaConImagen("FINAL: Poseidón gana el duelo físico", fondoFinalFisico);
        botonReiniciar();
        break;

      case "finalCulinario":
        pantallaConImagen("FINAL: Poseidón gana la competencia", fondoFinalCulinario);
        botonReiniciar();
        break;

      case "empanadasMalas":
        pantallaConImagen("Zeus entrega empanadas malas", fondoEmpanadasMalas);
        mostrarBoton("Continuar", ancho / 2, 430, () => cambiarEstado("descubreMalEstado"));
        break;

      case "descubreMalEstado":
        pantallaConImagen("Poseidón descubre que están malas", fondoDescubreMalas);
        botonesDistribuidos([
          { label: "Proponer duelo", action: () => cambiarEstado("reaccionaDuelo") },
          { label: "Preferir paz", action: () => cambiarEstado("reaccionaPaz") }
        ], 430);
        break;

      case "reaccionaDuelo":
        pantallaConImagen("Poseidón se enoja y propone duelo", fondoDuelo);
        botonesDistribuidos([
          { label: "Físico", action: () => cambiarEstado("dueloFisico") },
          { label: "Culinario", action: () => cambiarEstado("dueloCulinario") }
        ], 430);
        break;

      case "reaccionaPaz":
        pantallaConImagen("Poseidón prefiere la paz y se va", fondoReaccionaPaz);
        mostrarBoton("Continuar", ancho / 2, 430, () => cambiarEstado("finalPaz"));
        break;

      case "finalPaz":
        pantallaConImagen("FINAL: Poseidón parte en paz", fondoReaccionaPaz2);
        botonReiniciar();
        break;
    }
  }

  
  p.mousePressed = function () {
    if (clickSound && clickSound.isLoaded()) clickSound.play();
  };

};


new p5(sketch);
