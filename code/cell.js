function Cell(i, j) {

  // posicão na matriz
  this.i = i;
  this.j = j;

  // Top, Right, Bottom, Left
  this.walls = [true, true, true, true];

  // Vizitado ou não
  this.visited = false;

  // Verificar se existe visinhos não visitados
  this.checkNeighbors = function() {
    // Defina array de vizinhos
    var neighbors = [];

    // Reconhece os vizinhos
    var top    = grid[index(i, j -1)];
    var right  = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left   = grid[index(i-1, j)];

    //  testa se existe vizinho, ou ele já foi visitado em ambos os lados
    (top && !top.visited) ? neighbors.push(top) : null;
    (right && !right.visited) ? neighbors.push(right) : null;
    (bottom && !bottom.visited) ? neighbors.push(bottom) : null;
    (left && !left.visited) ? neighbors.push(left) : null;

    /**
     * se tiver algum vizinho e ele sorteia um deles para continuar
     * 
     * se não tiver da o sinal para voltar
     */
    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  // Destaca a cor da célula atual
  this.highlight = function() {
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
    fill(255, 0, 0, 100);
    rect(x, y, w, w);
  }

  this.show = function() {

    // Pega a posição inicial da célula para desenhar
    var x = this.i*w;
    var y = this.j*w;
    stroke(0);
    strokeWeight(3);

    // Desenha as paredes
    (this.walls[0]) ? line(x    , y    , x + w, y)     : null;
    (this.walls[1]) ? line(x + w, y    , x + w, y + w) : null;
    (this.walls[2]) ? line(x + w, y + w, x    , y + w) : null;
    (this.walls[3]) ? line(x    , y + w, x    , y)     : null;

    // Se visitado remove as bordas
    if (this.visited) {
      noStroke();
      fill(113, 89, 193, 255);
      rect(x, y, w, w);
    }
  }
}
