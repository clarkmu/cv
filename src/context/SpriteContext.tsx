import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * sprite animation ideas:
 *
 * 1) sprite bumps into h1 | SocialIcons | edge
 *       then shivers, pauses, changes direction
 *
 * 2) sprite wanders around screen and replicates itself
 *      where child has a slightly different trajectory
 *
 * 3) move sprite to contact so it's less distracting than on Portfolio ?
 *
 *
 */

interface SpriteStateType {
  sprite: Sprite | null;
  collidables: Element[];
}

interface SpriteContextType {
  state: SpriteStateType;
  setState: Dispatch<SpriteStateType>;
  Canvas: () => React.JSX.Element;
}

const INITIAL_STATE: SpriteStateType = {
  sprite: null,
  collidables: [],
};

export const SpriteContext = createContext<SpriteContextType>({
  state: INITIAL_STATE,
  setState: () => null,
  Canvas: () => <div>Loading...</div>,
});

export function useSpriteContext(): SpriteContextType {
  return useContext(SpriteContext);
}

const staggerFrames = 1; // 15;
const numberOfFrames = 3;

class Sprite {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;

  spriteWidth: number;
  spriteHeight: number;
  width: number;
  height: number;

  x = 0;
  y = 0;

  frameY = 0;
  gameFrame = 0;

  directionX: number = 1;
  directionY: number = 1;

  collidables: Element[] = [];

  isRunning = true;

  lifetime = 500;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = "/corona-sprite.webp";

    this.spriteWidth = 200;
    this.spriteHeight = 200;

    const dimX = ctx.canvas.clientWidth / 20;
    const dimY = ctx.canvas.clientHeight / 20;
    const dim = dimX < dimY ? dimX : dimY;

    this.width = dim;
    this.height = dim;
  }
  handleSpriteFrames() {
    if (this.frameY > numberOfFrames) {
      this.frameY = 0;
    } else {
      this.frameY++;
    }
  }
  handleMovement() {
    this.x += this.directionX;
    this.y += this.directionY;
  }
  detectCollision() {
    const left = this.x;
    const top = this.y;
    const right = this.x + this.width;
    const bottom = this.y + this.height;

    const containerHeight = this.ctx.canvas.height;
    const containerWidth = this.ctx.canvas.width;

    if (bottom > containerHeight) {
      this.directionY = Math.random() - 1;
    }

    if (right > containerWidth) {
      this.directionX = Math.random() - 1;
    }

    if (top < 0) {
      this.directionY = Math.random();
    }

    if (left < 0) {
      this.directionX = Math.random();
    }
  }
  clearCanvas() {
    this.ctx.clearRect(
      0,
      0,
      this.ctx.canvas.clientWidth,
      this.ctx.canvas.clientHeight
    );
  }
  draw() {
    this.clearCanvas();

    this.ctx.drawImage(
      this.img,
      0,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  init() {
    this.gameLoop();
  }
  gameLoop() {
    this.gameFrame++;

    if (this.gameFrame % staggerFrames === 0) {
      this.handleSpriteFrames();

      this.detectCollision();
      this.handleMovement();

      this.draw();
    }

    // if (this.lifetime < this.gameFrame) {
    //   this.isRunning = false;
    // }

    if (this.isRunning) {
      requestAnimationFrame(() => this.gameLoop());
    } else {
      this.clearCanvas();
    }
  }
  destroy() {
    this.isRunning = false;
  }
}

export default function SpriteContextProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [state, setState] = useState<SpriteStateType>(INITIAL_STATE);
  const ref = useRef(null);

  const [init, setInit] = useState(false);

  const Canvas = () => (
    <canvas ref={ref} className="absolute inset-0 w-full h-full"></canvas>
  );

  const spawnSprite = () => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d");
      const sprite = new Sprite(ctx);
      sprite.init();
    }
  };

  useEffect(() => {
    if (ref?.current && !init) {
      setInit(true);
      setTimeout(spawnSprite, 500);
    }
  }, [ref?.current]);

  return (
    <SpriteContext.Provider
      value={{
        state,
        setState,
        Canvas,
      }}
    >
      {children}
    </SpriteContext.Provider>
  );
}

export const WithSpriteContext = (Component: any) => {
  return function WrapperComponent(props: any) {
    return (
      <SpriteContextProvider>
        <Component {...props} />
      </SpriteContextProvider>
    );
  };
};
