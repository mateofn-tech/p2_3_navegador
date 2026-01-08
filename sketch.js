let naranjas = [];
let cantidad = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Crear naranjas con posiciones y tamaños aleatorios
  for (let i = 0; i < cantidad; i++) {
    let x = random(width);
    let y = random(-height, 0);
    let tam = random(40, 80);
    let velocidad = random(1, 3);
    naranjas.push(new Naranja(x, y, tam, velocidad));
  }
}

function draw() {
  drawGradientBackground();

  // Dibujar y mover las naranjas
  for (let n of naranjas) {
    n.show();
    n.move();
  }
}

// --- Función para dibujar fondo degradado rosa ---
function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    // Interpolamos el color de arriba a abajo
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(255, 182, 193), color(255, 105, 180), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

// --- Clase Naranja ---
class Naranja {
  constructor(x, y, tam, velocidad) {
    this.x = x;
    this.y = y;
    this.tam = tam;
    this.velocidad = velocidad;
    this.colorBase = color(255, 140, 0);
  }

  show() {
    // sombra
    fill(100, 80);
    ellipse(this.x + 5, this.y + 5, this.tam * 0.9);

    // cuerpo
    fill(this.colorBase);
    ellipse(this.x, this.y, this.tam);

    // brillo
    fill(255, 150);
    ellipse(this.x - this.tam * 0.2, this.y - this.tam * 0.2, this.tam * 0.3);

    // tallo
    stroke(60, 30, 10);
    strokeWeight(3);
    line(this.x, this.y - this.tam / 2, this.x, this.y - this.tam / 2 - 10);

    // hoja
    fill(60, 150, 60);
    noStroke();
    ellipse(this.x + 5, this.y - this.tam / 2 - 5, this.tam * 0.25, this.tam * 0.12);
  }

  move() {
    this.y += this.velocidad;

    // Si sale del lienzo, reaparece arriba
    if (this.y > height + this.tam / 2) {
      this.y = -this.tam / 2;
      this.x = random(width); 
      this.velocidad = random(1, 3); 
    }
  }
}

// Ajustar canvas al tamaño de la ventana al redimensionar
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
