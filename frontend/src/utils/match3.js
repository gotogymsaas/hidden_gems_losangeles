export function findMatches(board) {
  const matches = [];
  const height = board.length;
  const width = board[0].length;
  // horizontal
  for (let y = 0; y < height; y++) {
    let count = 1;
    for (let x = 1; x <= width; x++) {
      if (x < width && board[y][x] === board[y][x - 1]) {
        count++;
      } else {
        if (count >= 3) {
          for (let k = 0; k < count; k++) {
            matches.push({ x: x - 1 - k, y });
          }
        }
        count = 1;
      }
    }
  }
  // vertical
  for (let x = 0; x < width; x++) {
    let count = 1;
    for (let y = 1; y <= height; y++) {
      if (y < height && board[y][x] === board[y - 1][x]) {
        count++;
      } else {
        if (count >= 3) {
          for (let k = 0; k < count; k++) {
            matches.push({ x, y: y - 1 - k });
          }
        }
        count = 1;
      }
    }
  }
  const unique = {};
  matches.forEach(m => {
    unique[`${m.x}-${m.y}`] = m;
  });
  return Object.values(unique);
}
