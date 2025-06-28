import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const SPRITES = [
  '/assets/sprite-red.png',
  '/assets/sprite-blue.png',
  '/assets/sprite-green.png',
  '/assets/sprite-yellow.png'
];

export default function GameBoard({ levelId = 1, userId = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: 8 * 40,
      height: 8 * 40,
      backgroundColor: 0x222222,
      view: canvasRef.current
    });

    let textures = [];
    let board = [];
    let sprites = [];
    let score = 0;

    PIXI.Assets.load(SPRITES).then((loaded) => {
      textures = loaded;
      initBoard();
    });

    function initBoard() {
      for (let y = 0; y < 8; y++) {
        board[y] = [];
        sprites[y] = [];
        for (let x = 0; x < 8; x++) {
          spawnTile(x, y, randomType());
        }
      }
      app.ticker.add(gameLoop);
    }

    function randomType() {
      return Math.floor(Math.random() * SPRITES.length);
    }

    function spawnTile(x, y, type) {
      board[y][x] = type;
      const sprite = new PIXI.Sprite(textures[type]);
      sprite.width = 40;
      sprite.height = 40;
      sprite.x = x * 40;
      sprite.y = y * 40;
      sprite.interactive = true;
      sprite.buttonMode = true;
      sprite.on('pointerdown', () => handleTileSelect(x, y));
      app.stage.addChild(sprite);
      sprites[y][x] = sprite;
    }

    let selected = null;
    let activePowerUp = null;

    window.addEventListener('keydown', handlePowerKey);

    function handlePowerKey(e) {
      if (e.key === '1') activePowerUp = 'taco';
      if (e.key === '2') activePowerUp = 'mural';
    }

    function handleTileSelect(x, y) {
      if (activePowerUp === 'taco') {
        tacoExplosivo(x, y);
        activePowerUp = null;
        return;
      }
      if (activePowerUp === 'mural') {
        muralEnergia(y);
        activePowerUp = null;
        return;
      }
      if (!selected) {
        selected = { x, y };
        return;
      }
      swapTiles(selected.x, selected.y, x, y);
      selected = null;
      const matches = findMatches();
      if (matches.length) {
        removeSprites(matches);
      } else {
        swapTiles(selected.x, selected.y, x, y);
      }
    }

    function swapTiles(x1, y1, x2, y2) {
      const tmp = board[y1][x1];
      board[y1][x1] = board[y2][x2];
      board[y2][x2] = tmp;
      const sp1 = sprites[y1][x1];
      const sp2 = sprites[y2][x2];
      sprites[y1][x1] = sp2;
      sprites[y2][x2] = sp1;
      if (sp1 && sp2) {
        [sp1.x, sp2.x] = [sp2.x, sp1.x];
        [sp1.y, sp2.y] = [sp2.y, sp1.y];
      }
    }

    function gameLoop() {
      const matches = findMatches();
      if (matches.length > 0) {
        app.ticker.stop();
        removeSprites(matches);
      }
    }

    function findMatches() {
      const matches = [];
      // horizontal
      for (let y = 0; y < 8; y++) {
        let count = 1;
        for (let x = 1; x <= 8; x++) {
          if (x < 8 && board[y][x] === board[y][x - 1]) {
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
      for (let x = 0; x < 8; x++) {
        let count = 1;
        for (let y = 1; y <= 8; y++) {
          if (y < 8 && board[y][x] === board[y - 1][x]) {
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
      const uniq = {};
      matches.forEach((m) => (uniq[`${m.x}-${m.y}`] = m));
      return Object.values(uniq);
    }

    function removeSprites(matches) {
      matches.forEach(({ x, y }) => {
        const sprite = sprites[y][x];
        if (!sprite) return;
        board[y][x] = null;
        app.ticker.add(function fade(delta) {
          sprite.alpha -= 0.1 * delta;
          if (sprite.alpha <= 0) {
            app.ticker.remove(fade);
            app.stage.removeChild(sprite);
            sprites[y][x] = null;
            refillGrid();
          }
        });
      });
      score += matches.length;
    }

    function refillGrid() {
      for (let x = 0; x < 8; x++) {
        for (let y = 7; y >= 0; y--) {
          if (board[y][x] === null) {
            let ny = y - 1;
            while (ny >= 0 && board[ny][x] === null) ny--;
            if (ny >= 0) {
              board[y][x] = board[ny][x];
              board[ny][x] = null;
              sprites[y][x] = sprites[ny][x];
              sprites[ny][x] = null;
              const sp = sprites[y][x];
              if (sp) {
                app.ticker.add(function drop(delta) {
                  sp.y += 10 * delta;
                  if (sp.y >= y * 40) {
                    sp.y = y * 40;
                    app.ticker.remove(drop);
                  }
                });
              }
            } else {
              spawnTile(x, y, randomType());
            }
          }
        }
      }
      app.ticker.start();
      checkLevelComplete();
    }

    function tacoExplosivo(x, y) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const nx = x + j;
          const ny = y + i;
          if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
            removeSprites([{ x: nx, y: ny }]);
          }
        }
      }
    }

    function muralEnergia(row) {
      for (let x = 0; x < 8; x++) {
        removeSprites([{ x, y: row }]);
      }
    }

    function checkLevelComplete() {
      if (score >= 30) {
        fetch(`/api/levels/${levelId}/result`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, levelId, score })
        });
      }
    }

    return () => {
      window.removeEventListener('keydown', handlePowerKey);
      app.destroy(true, { children: true, texture: true, baseTexture: true });
    };
  }, [levelId, userId]);

  return <canvas ref={canvasRef} />;
}
