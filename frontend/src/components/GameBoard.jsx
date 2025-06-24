import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const GRID_SIZE = 8;
const TILE_SIZE = 50;
const COLORS = [0xff4757, 0x1e90ff, 0x2ed573, 0xffe066, 0xa55eea];

const GameBoard = () => {
  const canvasRef = useRef(null);
  const appRef = useRef(null);
  const boardRef = useRef([]);

  useEffect(() => {
    const app = new PIXI.Application({
      width: GRID_SIZE * TILE_SIZE,
      height: GRID_SIZE * TILE_SIZE,
      backgroundColor: 0x000000,
    });
    appRef.current = app;
    canvasRef.current.appendChild(app.view);
    initBoard();
    resolveMatches();
    return () => {
      app.destroy(true, { children: true });
    };
  }, []);

  const initBoard = () => {
    boardRef.current = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      boardRef.current[y] = [];
      for (let x = 0; x < GRID_SIZE; x++) {
        const sprite = createTile(x, y);
        boardRef.current[y][x] = { sprite };
        appRef.current.stage.addChild(sprite);
      }
    }
  };

  const createTile = (x, y, color) => {
    const g = new PIXI.Graphics();
    const c = color ?? COLORS[Math.floor(Math.random() * COLORS.length)];
    g.beginFill(c).drawRoundedRect(0, 0, TILE_SIZE - 4, TILE_SIZE - 4, 8).endFill();
    const texture = appRef.current.renderer.generateTexture(g);
    const sprite = new PIXI.Sprite(texture);
    sprite.x = x * TILE_SIZE + 2;
    sprite.y = y * TILE_SIZE + 2;
    sprite.anchor.set(0);
    sprite.tint = c;
    sprite.colorId = c;
    return sprite;
  };

  const resolveMatches = () => {
    let matches = findMatches();
    if (matches.length === 0) return;
    animateRemoval(matches, () => {
      dropTiles();
      refillBoard();
      resolveMatches();
    });
  };

  const findMatches = () => {
    const board = boardRef.current;
    const toRemove = [];
    // horizontal
    for (let y = 0; y < GRID_SIZE; y++) {
      let count = 1;
      for (let x = 1; x <= GRID_SIZE; x++) {
        if (x < GRID_SIZE && board[y][x].sprite.colorId === board[y][x - 1].sprite.colorId) {
          count++;
        } else {
          if (count >= 3) {
            for (let k = 0; k < count; k++) {
              toRemove.push({ x: x - 1 - k, y });
            }
          }
          count = 1;
        }
      }
    }
    // vertical
    for (let x = 0; x < GRID_SIZE; x++) {
      let count = 1;
      for (let y = 1; y <= GRID_SIZE; y++) {
        if (y < GRID_SIZE && board[y][x].sprite.colorId === board[y - 1][x].sprite.colorId) {
          count++;
        } else {
          if (count >= 3) {
            for (let k = 0; k < count; k++) {
              toRemove.push({ x, y: y - 1 - k });
            }
          }
          count = 1;
        }
      }
    }
    // remove duplicates
    const key = p => `${p.x}-${p.y}`;
    const map = new Map();
    toRemove.forEach(p => map.set(key(p), p));
    return Array.from(map.values());
  };

  const animateRemoval = (matches, callback) => {
    const app = appRef.current;
    let remaining = matches.length;
    matches.forEach(({ x, y }) => {
      const tile = boardRef.current[y][x];
      const sprite = tile.sprite;
      const anim = delta => {
        sprite.scale.x += 0.1 * delta;
        sprite.scale.y += 0.1 * delta;
        sprite.alpha -= 0.1 * delta;
        if (sprite.alpha <= 0) {
          app.ticker.remove(anim);
          app.stage.removeChild(sprite);
          boardRef.current[y][x] = null;
          if (--remaining === 0) callback();
        }
      };
      app.ticker.add(anim);
    });
  };

  const dropTiles = () => {
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = GRID_SIZE - 1; y >= 0; y--) {
        if (!boardRef.current[y][x]) {
          for (let k = y - 1; k >= 0; k--) {
            if (boardRef.current[k][x]) {
              const moving = boardRef.current[k][x];
              moving.sprite.y += TILE_SIZE * (y - k);
              boardRef.current[y][x] = moving;
              boardRef.current[k][x] = null;
              break;
            }
          }
        }
      }
    }
  };

  const refillBoard = () => {
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (!boardRef.current[y][x]) {
          const sprite = createTile(x, y);
          boardRef.current[y][x] = { sprite };
          appRef.current.stage.addChild(sprite);
        } else {
          boardRef.current[y][x].sprite.x = x * TILE_SIZE + 2;
          boardRef.current[y][x].sprite.y = y * TILE_SIZE + 2;
        }
      }
    }
  };

  return <div ref={canvasRef} />;
};

export default GameBoard;

