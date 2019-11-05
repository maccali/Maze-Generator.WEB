var cols, rows;

// Tamanho do quadrado da célula
var w = 40;

// "Matriz" do labirinto
var grid = [];

// Célula atual
var current;

// Pilha para "gravar" a rota;
var stack = [];

function setup() {
  // Cria o quadrado da "Matriz"
  createCanvas(1480, 840);

  // Divide a gride conforme o tamanho do quadro e das celulas
  cols = floor(width/w);
  rows = floor(height/w);

  // Velocidade de "preenchimento"
  // frameRate(10);

  // Popula a grid com novas células
  for (var   j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  // Seta a célula inicial;
  current = grid[0];
}

function draw() {
  
  // Define acor do fundo
  background(0);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  // Marca como visitada e a atual;
  current.visited = true;
  current.highlight();

  
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    // Adiciona na pilha
    stack.push(current);
 
    removeWalls(current, next);

    // Passa para o próximo
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}

// Remove paredes da célula
function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
