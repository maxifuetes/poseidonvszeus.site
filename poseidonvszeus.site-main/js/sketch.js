/*
TP FINAL PARTE 2 PMIW
Video Fran: https://www.youtube.com/watch?v=g8kcBlQEid0
Video Maxi: https://www.youtube.com/watch?v=r8GRu3bW-jI
*/

let imgPoseidon, imgZeus, imgEmpanadaBuena, imgEmpanadaMala, imgFondo;
let imgVidaLlena, imgVidaVacia;
let sonidoCatch, sonidoLose;
let juego;
let estado = "inicio";

let carriles = [80, 180, 280, 380, 480];

function preload() {
  imgPoseidon = loadImage("assets/img/poseidon.png");
  imgZeus = loadImage("assets/img/zeus.png");
  imgEmpanadaBuena = loadImage("assets/img/empanada_buena.png");
  imgEmpanadaMala = loadImage("assets/img/empanada_mala.png");
  imgFondo = loadImage("assets/img/fondo.png");
  imgVidaLlena = loadImage("assets/img/vida_llena.png");
  imgVidaVacia = loadImage("assets/img/vida_vacia.png");
  imgHudCirculo = loadImage("assets/img//hud_circulo.png");

  sonidoCatch = loadSound("assets/sound/catch.mp3");
  sonidoLose = loadSound("assets/sound/lose.mp3");
  clickSound = loadSound("assets/sound/click.mp3");


  fuentePixel = loadFont("assets/fonts/Pixel Emulator.otf");
}

function setup() {
  createCanvas(640, 480);
  noSmooth();
  juego = crearNuevoJuego();
}

function crearNuevoJuego() {
  const poseidon = new Jugador(imgPoseidon, carriles);
  const zeus = new Zeus(imgZeus, carriles);
  return new Juego(poseidon, zeus, sonidoCatch, sonidoLose);
}

function draw() {
  image(imgFondo, 0, 0, width, height);

  if (estado === "inicio") {
    mostrarPantallaInicio();
  } else if (estado === "jugando") {
    juego.actualizar();
    juego.mostrar();
    if (juego.vidas <= 0 || juego.puntos >= 100) estado = "fin";
  } else if (estado === "fin") {
    juego.mostrar();
    mostrarPantallaFin();
  }
}

function mostrarPantallaInicio() {
  textAlign(CENTER);
  fill(255);
  textSize(32);
  text("POSEIDÓN VS ZEUS", width / 2, height / 2 - 40);
  textSize(20);
  text("Presiona ENTER para comenzar", width / 2, height / 2 + 10);
}

function mostrarPantallaFin() {
  push();
  fill(0, 180);
  rect(0, 0, width, height);
  textAlign(CENTER);
  fill(255);
  textSize(32);
  text(juego.vidas > 0 ? "¡GANASTE!" : "PERDISTE", width / 2, height / 2 - 20);
  textSize(18);
  text("ENTER: jugar de nuevo   |   R: reiniciar a menú", width / 2, height / 2 + 20);
  pop();
}

function keyPressed() {
  if (estado === "inicio" && keyCode === ENTER) {
    estado = "jugando";
    return;
  }
  if (estado === "fin") {
    if (keyCode === ENTER) { juego = crearNuevoJuego(); estado = "jugando"; return; }
    if (key === "r" || key === "R") { juego = crearNuevoJuego(); estado = "inicio"; return; }
  }

  if (estado === "jugando") {
    if (key === "a" || key === "A") juego.poseidon.mover("izquierda");
    if (key === "d" || key === "D") juego.poseidon.mover("derecha");
  }
}

