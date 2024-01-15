package com.ClarkMU.Michael.LWP.output;

import java.util.Random;
import android.content.SharedPreferences;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Handler;
import android.service.wallpaper.WallpaperService;
import android.view.SurfaceHolder;

public class DrawShapes extends WallpaperService {

	/*
	 * Version 14:

	 Optimized Vortex (-x,-y)

	 to-do:
	 solar system - larger sun smaller planets ?
	 snaking cube hangs on i=2
	 gradient swirl lapse time too long

	 add swirl settings - dc/dp/switchColor

	 tablet list -
	 vortex alpha
	 fractal tree to branch higher
	 vortex still, some how, defaults to incorrect settings


	 */

	public static final String SHARED_PREFS_NAME = "outputsettings";

	private final Handler mHandler = new Handler();

	@Override
	public void onCreate() {
		super.onCreate();
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
	}

	@Override
	public Engine onCreateEngine() {
		return new ShapeEngine();
	}

	class ShapeEngine extends Engine implements
			SharedPreferences.OnSharedPreferenceChangeListener {

		// set up
		private float WIDTH, HEIGHT, HALFWIDTH, HALFHEIGHT;
		private int WIDTHint, HEIGHTint;
		private boolean mVisible;
		private SharedPreferences mPrefs;

		private Random random = new Random();
		private Paint p = new Paint();
		private Paint p2 = new Paint();
		private Canvas c = new Canvas();

		// Preference Variables
		private int shape, lastShape, speed, C_C, colorPref, bc, switchSpiral,
				switchFractal;
		private boolean firstRun = true;

		// shape-independent
		private int i, j;
		private double x, y, R;

		// vortex
		private float ii = 0;
		private int ij = 2;
		private double vh, vw;

		// shared repeat variables
		private int coordX, coordY, cvX, cvY, CX, CY, V;
		private float V2, V3, V4;
		private int col1P, col2P, col3P, switchColor, col1BG, col2BG, col3BG,
				bgColor;

		// ambient swirl
		private int swirlRadius, dp = 1, dc = 1;

		// fractals
		private boolean turn;
		private float theta, R2;

		// isometrics
		private int switchIsometric, directions[];

		// grav sim
		private float particlex[], particley[], gravityx[], gravityy[], vx[],
				vy[], parR[], f, fs;
		private int pari, gravi, z, zz, planetColor[], switchGravSim;
		private float sunRadius, earthRadius, oneAU, planetDiameter[], planetX[];

		private final Runnable runningThread = new Runnable() {
			public void run() {
				drawFrame();
			}
		};

		ShapeEngine() {

			mPrefs = DrawShapes.this.getSharedPreferences(SHARED_PREFS_NAME, 0);
			mPrefs.registerOnSharedPreferenceChangeListener(this);
			onSharedPreferenceChanged(mPrefs, null);

		}

		@Override
		public void onCreate(SurfaceHolder surfaceHolder) {
			super.onCreate(surfaceHolder);
			firstRun = true;
			drawFrame();
		}

		@Override
		public void onSurfaceCreated(SurfaceHolder holder) {
			super.onSurfaceCreated(holder);
			firstRun = true;
			mHandler.removeCallbacks(runningThread);
			drawFrame();
		}

		@Override
		public void onVisibilityChanged(boolean visible) {
			mVisible = visible;
			if (visible) {
				firstRun = true;
				drawFrame();
			} else {
				mHandler.removeCallbacks(runningThread);
			}
		}

		@Override
		public void onSurfaceChanged(SurfaceHolder holder, int format,
				int width, int height) {
			super.onSurfaceChanged(holder, format, width, height);

			WIDTH = (float) width;
			HEIGHT = (float) height;

			WIDTHint = (int) width;
			HEIGHTint = (int) height;

			HALFWIDTH = (float) (width / 2);
			HALFHEIGHT = (float) (height / 2);

			mHandler.removeCallbacks(runningThread);
			firstRun = true;
			drawFrame();
		}

		@Override
		public void onDestroy() {
			super.onDestroy();
			mHandler.removeCallbacks(runningThread);
		}

		@Override
		public void onSurfaceDestroyed(SurfaceHolder holder) {
			super.onSurfaceDestroyed(holder);
			mVisible = false;
			mHandler.removeCallbacks(runningThread);
		}

		private final void drawFrame() {
			final SurfaceHolder holder = getSurfaceHolder();

			c = null;
			try {
				c = holder.lockCanvas();
				if (c != null) {

					c.drawColor(bgColor);

					if (lastShape != shape || firstRun == true) {
						firstRun = true;
						lastShape = shape;
					}

					if (firstRun) {

						WIDTH = WIDTHint = c.getWidth();
						HEIGHT = HEIGHTint = c.getHeight();

						HALFWIDTH = WIDTH / 2;
						HALFHEIGHT = HEIGHT / 2;

					}

					switch (shape) {
					case 1:
						drawVortex();
						break;
					case 2:
						gravitySim();
						break;
					case 3:
						drawAmbientLight();
						break;
					case 4:
						drawFractal();
						break;
					case 5:
						drawCubes();
						break;
					case 6:
						drawSpiral();
						break;
					case 7:
						drawHoundstooth();
						break;
					default:
						shape = random.nextInt(6) + 1;
						break;
					}
				}
			} finally {
				if (c != null)
					holder.unlockCanvasAndPost(c);
			}
			mHandler.removeCallbacks(runningThread);
			if (mVisible) {
				mHandler.postDelayed(runningThread, speed);
			}
		}

		private final void drawVortex() {

			if (firstRun) {
				firstRun = false;

				speed = 10;

				R = WIDTHint < HEIGHTint ? WIDTHint / 100 : HEIGHTint / 100;

				if (ij == 6) {
					vh = 2.5;
					vw = 0.5;
				} else {
					vw = 1.5;
					vh = 2.5;
				}

			}

			c.translate(HALFWIDTH, HALFHEIGHT);

			ii += 0.01;

			for (i = 0; i * vw * Math.sin((ij * i) + ii) < HEIGHT; i++) {

				p.setARGB((int) (-i), col1P, col2P, col3P);

				x = i * vw * Math.sin((ij * i) + ii);
				y = i * vh;
				c.drawCircle((float) x, (float) y, (float) R, p);

				c.drawCircle((float) -x, (float) -y, (float) R, p);

			}

		}

		private final void gravitySim() {

			switch (switchGravSim) {
			case 1:
				particleGravSim();
				break;
			case 2:
				ourSolarSystem();
				break;
			case 3:
				solarGravSim();
				break;
			case 4:
				binarySolarSystem();
				break;
			}

		}

		private final void particleGravSim() {

			if (firstRun) {

				speed = 15;

				pari = random.nextInt(25) + 20;
				gravi = random.nextInt(1) + 1;

				particlex = new float[pari];
				particley = new float[pari];
				vx = new float[pari];
				vy = new float[pari];
				parR = new float[pari];
				gravityx = new float[gravi];
				gravityy = new float[gravi];

				for (z = 0; z < pari; z++) {
					particlex[z] = random.nextInt((WIDTHint + 200) - 100);
					particley[z] = random.nextInt((HEIGHTint + 200) - 100);

					vx[z] = random.nextInt(4) - 4;
					vy[z] = random.nextInt(4) - 4;

					parR[z] = random.nextInt(15) + 15;
				}

				for (zz = 0; zz < gravi; zz++) {

					if (gravi == 1) {
						gravityx[zz] = HALFWIDTH;
						gravityy[zz] = HALFHEIGHT;
					} else {
						gravityx[zz] = random.nextInt(WIDTHint);
						gravityy[zz] = random.nextInt(HEIGHTint);
					}
				}
				firstRun = false;
			}

			for (z = 0; z < pari; z++) {
				for (zz = 0; zz < gravi; zz++) {
					f = (float) (1 / Math.sqrt(Math.pow(
							(particlex[z] - gravityx[zz]), 2)
							+ Math.pow((particley[z] - gravityy[zz]), 2)));

					vx[z] += (particlex[z] - gravityx[zz]) * f;
					vy[z] += (particley[z] - gravityy[zz]) * f;

					particlex[z] -= vx[z];
					particley[z] -= vy[z];

					c.drawCircle(gravityx[zz], gravityy[zz], 60, p);
					c.drawCircle(particlex[z], particley[z], parR[z], p);
				}
			}
		}

		private final void ourSolarSystem() {

			c.translate(HALFWIDTH, HALFHEIGHT);

			if (firstRun) {

				speed = 50;

				sunRadius = HEIGHT > WIDTH ? WIDTH/20 : HEIGHT/20;

				oneAU = WIDTH/5;
				earthRadius = oneAU/5;
										//earthRadius = sunRadius/109


				pari = 3;

				planetDiameter = new float[pari];
				vx = new float[pari];
				vy = new float[pari];
				planetColor = new int[pari];

				 //mercury
				planetX[0] = oneAU/3;
				vx[0] = random.nextInt(4) - (4);
				planetDiameter[0] = earthRadius/3;
				planetColor[0] = Color.rgb(0,0,25);

				//venus
				planetX[1] = oneAU * (3/4);
				vx[1] = random.nextInt(4) - (4);
				planetDiameter[1] = earthRadius * (9/10);
				planetColor[1] = Color.rgb(255,50,0);

				//earth
				planetX[2] = oneAU;
				vx[2] = random.nextInt(4) - (4);
				planetDiameter[2] = earthRadius;
				planetColor[2] = Color.rgb(0, 255, 0);


				//mars

				//jupiter

				//saturn

				//uranus

				//neptune

				//pluto

					/*particlex[z] = random.nextInt(WIDTHint) + 60;
					vx[z] = random.nextInt(4) - (4);
					parR[z] = random.nextInt(40) + 15;
					planetColor[z] = Color.argb(random.nextInt(55) + 200,
							random.nextInt(255), random.nextInt(255),
							random.nextInt(255));*/


				firstRun = false;
			}

			for (z = 0; z < pari; z++) {

				f = (float) (1 / Math.sqrt(Math.pow(particlex[z], 2)));

				vx[z] += ((particlex[z]) * f) / 15;

				particlex[z] -= vx[z];

				p2.setColor(planetColor[z]);

					//replace vx[z] with a boolean
				if (vx[z] > 0) {
					c.drawCircle(0, 0, sunRadius, p);
					c.drawCircle(planetX[z], 0, planetDiameter[z], p2);
				} else {
					c.drawCircle(planetX[z], 0, planetDiameter[z], p2);
					c.drawCircle(0, 0, 50, p);
				}
			}
		}

		private final void solarGravSim() {

			c.translate(HALFWIDTH, HALFHEIGHT);

			if (firstRun) {

				speed = 50;

				pari = random.nextInt(5) + 5;

				particlex = new float[pari];
				vx = new float[pari];
				vy = new float[pari];
				parR = new float[pari];
				planetColor = new int[pari];

				for (z = 0; z < pari; z++) {

					//if(z<4) particlex[z] = random.nextInt(WIDTHint) + 25;

					particlex[z] = random.nextInt(WIDTHint) + 60;

					vx[z] = random.nextInt(4) - (4);

					parR[z] = random.nextInt(40) + 15;

					planetColor[z] = Color.argb(random.nextInt(55) + 200,
							random.nextInt(255), random.nextInt(255),
							random.nextInt(255));

				}
				firstRun = false;
			}

			for (z = 0; z < pari; z++) {

				f = (float) (1 / Math.sqrt(Math.pow(particlex[z], 2)));

				vx[z] += ((particlex[z]) * f) / 15;

				particlex[z] -= vx[z];

				p2.setColor(planetColor[z]);

				// if(particlex[z]>150 ||
				// particlex[z]<-150)p2.setAlpha((int)(255-(particlex[z]/2)));
				// else p2.setAlpha(255);

				if (vx[z] > 0) {
					c.drawCircle(0, 0, 50, p);
					c.drawCircle(particlex[z], 0, parR[z], p2);
				} else {
					c.drawCircle(particlex[z], 0, parR[z], p2);
					c.drawCircle(0, 0, 50, p);
				}
			}
		}

		private final void binarySolarSystem() {

			c.translate(HALFWIDTH, HALFHEIGHT);

			if (firstRun) {

				speed = 15;

				pari = random.nextInt(5) + 5;

				particlex = new float[pari];
				particley = new float[pari];
				vx = new float[pari];
				vy = new float[pari];
				parR = new float[pari];
				planetColor = new int[pari];
				gravityx = new float[2];
				gravityy = new float[2];

				for (z = 0; z < pari; z++) {
					particlex[z] = random.nextInt((WIDTHint + 200) - 100);
					particley[z] = random.nextInt((HEIGHTint + 200) - 100);

					vx[z] = random.nextInt(4) - 4;
					vy[z] = random.nextInt(4) - 4;

					parR[z] = random.nextInt(15) + 15;

					planetColor[z] = Color.argb(random.nextInt(55) + 200,
							random.nextInt(255), random.nextInt(255),
							random.nextInt(255));
				}

				for (zz = 0; zz < 2; zz++) {
					if (zz == 0) {
						gravityx[zz] = random.nextInt(WIDTHint / 5);
						gravityy[zz] = random.nextInt(HEIGHTint / 5);
					} else {
						gravityx[zz] = random.nextInt(WIDTHint / -5);
						gravityy[zz] = random.nextInt(HEIGHTint / -5);
					}

				}
				firstRun = false;
			}

			for (zz = 0; zz < 2; zz++) {

				if (z == 1) {
					fs = (float) (1 / Math.sqrt(Math.pow(gravityx[1]
							- gravityx[0], 2)
							+ Math.pow(gravityy[1] - gravityy[0], 2)));
				} else {
					fs = (float) (1 / Math.sqrt(Math.pow(gravityx[0]
							- gravityx[1], 2)
							+ Math.pow(gravityy[0] - gravityy[1], 2)));
				}

				// fs = (float) (1 / Math.sqrt(Math.pow(gravityx[zz], 2) +
				// Math.pow(gravityy[zz], 2)));

				vx[zz] += gravityx[zz] * fs;
				vy[zz] += gravityy[zz] * fs;

				gravityx[zz] -= vx[zz] / 200;
				gravityy[zz] -= vy[zz] / 200;
			}

			for (z = 0; z < pari; z++) {
				for (zz = 0; zz < 2; zz++) {
					f = (float) (1 / Math.sqrt(Math.pow(
							(particlex[z] - gravityx[zz]), 2)
							+ Math.pow((particley[z] - gravityy[zz]), 2)));

					vx[z] += (particlex[z] - gravityx[zz]) * f;
					vy[z] += (particley[z] - gravityy[zz]) * f;

					particlex[z] -= vx[z] / 10;
					particley[z] -= vy[z] / 10;

					p2.setColor(planetColor[z]);

					if (vx[z] > 0) {
						c.drawCircle(gravityx[zz], gravityy[zz], 60, p);
						c.drawCircle(particlex[z], particley[z], parR[z], p2);
					} else {
						c.drawCircle(particlex[z], particley[z], parR[z], p2);
						c.drawCircle(gravityx[zz], gravityy[zz], 60, p);
					}
				}
			}

		}

		private final void drawAmbientLight() {

			speed = 100;

			c.translate(HALFWIDTH, HALFHEIGHT);

			swirlRadius = HEIGHTint;

			do {

				swirlColor();

				p.setARGB(255 - (swirlRadius), col1P, col2P, col3P);
				//p.setAlpha(255 - swirlRadius);
				c.drawCircle(0, 0, swirlRadius, p);

				swirlRadius -= random.nextInt(10) + 5;

			} while (swirlRadius > 10);

			i++;

		}

		private final void swirlColor() {

			if (i > 50) {
				i = 1;
				switchColor = random.nextInt(2);
			}

			switch (switchColor) {
			case 0:
				col1P += random.nextBoolean() ? random.nextInt(dp) + dc
						: (random.nextInt(dp) + dc) * -1;
				break;
			case 1:
				col2P += random.nextBoolean() ? random.nextInt(dp) + dc
						: (random.nextInt(dp) + dc) * -1;
				break;
			case 2:
				col3P += random.nextBoolean() ? random.nextInt(dp) + dc
						: (random.nextInt(dp) + dc) * -1;
				break;
			}

		}

		private final void drawFractal() {

			if (firstRun) {
				j = 3;
				p2.setColor(bgColor);
				turn = true;
				firstRun = false;
				speed = 750;
				R2 = WIDTH;
				theta = random.nextInt(25) + 15;
			}

			i = 2;

			switch (switchFractal) {
			case 1:
				c.translate(HALFWIDTH, HALFHEIGHT);
				balls();
				break;
			case 2:
				c.translate(HALFWIDTH, HEIGHT);
				branch(j * 20);
				break;
			case 3:

				if (HEIGHT > WIDTH) {
					c.translate(HALFWIDTH, HEIGHT * (.75f));
					maze(WIDTH * .33f, 1, j);
				} else {
					c.translate(HALFWIDTH, HEIGHT);
					maze(HALFHEIGHT, 1, j);
				}

				break;
			}

			j++;

			if (j > 10)
				firstRun = true;

		}

		private final void balls() {

			do {
				R2 /= 2;
				if (turn) {
					c.drawCircle(R2, 0, R2, p);
					c.drawCircle(-R2, 0, R2, p);
					c.drawCircle(0, R2, R2, p);
					c.drawCircle(0, -R2, R2, p);
				} else {
					c.drawCircle(R2, 0, R2, p2);
					c.drawCircle(-R2, 0, R2, p2);
					c.drawCircle(0, R2, R2, p2);
					c.drawCircle(0, -R2, R2, p2);
				}
				turn = !turn;
				i++;
			} while (i < j);
		}

		private final void branch(float length) {

			c.drawLine(0, 0, 0, -length, p);
			c.translate(0, -length);

			length *= 0.66;

			if (length > 10) {

				c.save();
				c.rotate(theta);
				branch(length);
				c.restore();

				c.save();
				c.rotate(-theta);
				branch(length);
				c.restore();

			}

		}

		private final void maze(float length, int start, int stop) {

			if (start != 1)
				c.drawLine(0, 0, 0, -length, p);

			c.translate(0, -length);

			length *= 0.66;
			start++;

			if (length > 1 && start < stop) {

				c.save();
				c.rotate(90f);
				maze(length, start, stop);
				c.restore();

				c.save();
				c.rotate(-90f);
				maze(length, start, stop);
				c.restore();

			}

		}

		private final void drawCubes() {

			switch (switchIsometric) {
			case 1:
				repeatedCubes();
				break;
			case 2:
				snakingCubes();
				break;
			}

		}

		private final void repeatedCubes() {

			if (firstRun) {
				firstRun = false;
				speed = 150;

				j = 1;

				C_C = WIDTHint < HEIGHTint ? WIDTHint / 10 : HEIGHTint / 10;

				V = C_C / 4;
				V2 = 2 * V;
				V3 = 3 * V;
				V4 = 4 * V;
			}

			coordX = coordY = cvX = cvY = 0;

			for (i = 1; i <= j; i++) {

				coordX = C_C * cvX;
				coordY = C_C * cvY;

				float pointsCube[] = { coordX, coordY + V, coordX + V2, coordY,
						coordX + V2, coordY, coordX + V4, coordY + V,
						coordX + V4, coordY + V, coordX + V2, coordY + V2,
						coordX + V2, coordY + V2, coordX, coordY + V, coordX,
						coordY + V, coordX, coordY + V3, coordX, coordY + V3,
						coordX + V2, coordY + V4, coordX + V2, coordY + V4,
						coordX + V4, coordY + V3, coordX + V2, coordY + V4,
						coordX + V2, coordY + V2, coordX + V4, coordY + V,
						coordX + V4, coordY + V3, };

				c.drawLines(pointsCube, p);

				cvX++;
				if (coordX >= WIDTH) {
					cvX = 0;
					cvY++;
				}
			}

			j++;

			if (coordY > HEIGHT)
				firstRun = true;

		}

		private final void snakingCubes() {

			c.translate(HALFWIDTH, HALFHEIGHT);

			if (firstRun) {
				firstRun = false;

				speed = 500;
				directions = new int[20];
				j = 1;

				C_C = WIDTHint < HEIGHTint ? WIDTHint / 10 : HEIGHTint / 10;

				V = C_C / 5;
				V2 = 2 * V;
				V3 = 3 * V;
				V4 = 4 * V;
			}

			while (directions[j] == directions[j - 1])
				directions[j] = random.nextInt(4);

			coordX = coordY = cvX = cvY = 0;

			for (i = 1; i < j; i++) {

				switch (directions[i]) {
				case 0: // down-left
					cvX--;
					cvY++;
					break;
				case 1: // down-right
					cvX++;
					cvY++;
					break;
				case 2: // up-left
					cvX--;
					cvY--;
					break;
				case 3: // up-right
					cvX++;
					cvY--;
					break;
				}

				coordX = (C_C * cvX) / 2;
				coordY = (C_C * cvY) / 2;

				float pointsCube[] = { coordX, coordY + V, coordX + V2, coordY,
						coordX + V2, coordY, coordX + V4, coordY + V,
						coordX + V4, coordY + V, coordX + V2, coordY + V2,
						coordX + V2, coordY + V2, coordX, coordY + V, coordX,
						coordY + V, coordX, coordY + V3, coordX, coordY + V3,
						coordX + V2, coordY + V4, coordX + V2, coordY + V4,
						coordX + V4, coordY + V3, coordX + V2, coordY + V4,
						coordX + V2, coordY + V2, coordX + V4, coordY + V,
						coordX + V4, coordY + V3, };

				c.drawLines(pointsCube, p);
			}

			j++;

			if (j > 19)
				firstRun = true;

		}

		private final void drawSpiral() {

			if (firstRun) {
				speed = 100;
				firstRun = false;
				j = 2;

				R = WIDTHint < HEIGHTint ? WIDTHint / 50 : HEIGHTint / 50;
			}

			c.translate(HALFWIDTH, HALFHEIGHT);

			for (i = 1; i < j; i++) {

				switch (switchSpiral) {
				case 1:
					x = (2 * R * Math.sqrt(i)) * (Math.cos(i * 137.5));
					y = (2 * R * Math.sqrt(i)) * (Math.sin(i * 137.5));
					break;
				case 2:
					x = i * 2 * (Math.cos(i));
					y = i * 2 * (Math.sin(i));
					break;
				case 3:
					x = i * (Math.cos((i * 0.1) + 1));
					y = i * (Math.sin((i * 0.1) + 1));
					break;
				}

				c.drawCircle((float) (x), (float) (y), (float) R, p);

			}

			j++;

			if (j * R > 2 * WIDTH)
				firstRun = true;

		}

		private final void drawHoundstooth() {

			if (firstRun) {
				firstRun = false;
				speed = 100;

				C_C = WIDTHint < HEIGHTint ? WIDTHint / 10 : HEIGHTint / 10;

				V = (C_C / 5);
				V2 = 2 * V;
				V3 = 3 * V;
				V4 = 4 * V;

				j = 2;
			}

			coordX = coordY = cvX = 1;
			cvY = 2;
			CY = V;

			for (i = 1; i <= j; i++) {

				coordX = C_C * cvX;
				coordY = C_C * cvY;
				CX = coordX - (C_C / 5);

				float points[] = { CX, CY, CX, CY - V, // 1-2
						CX, CY - V, CX + V, CY, // 2-3
						CX + V, CY, CX + V2, CY, // 3-4
						CX + V2, CY, CX + V4, CY + V2, // 4-5
						CX + V4, CY + V2, CX + V3, CY + V2, // 5-6
						CX + V3, CY + V2, CX + V2, CY + V, // 6-7
						CX + V2, CY + V, CX + V2, CY + V2, // 7-8
						CX + V2, CY + V2, CX + V, CY + V2, // 8-9
						CX + V, CY + V2, CX + V2, CY + V3, // 9-10
						CX + V2, CY + V3, CX + V2, CY + V4, // 10-11
						CX + V2, CY + V4, CX, CY + V2, // 11-12
						CX, CY + V2, CX, CY + V, // 12-13
						CX, CY + V, CX - V, CY, // 13-14
						CX - V, CY, CX, CY, // 14-15
				};

				c.drawLines(points, p);

				cvX++;

				if (((C_C * cvX) + C_C) >= WIDTH) {
					cvX = 1;
					cvY++;
					CY += C_C;
				}
			}

			j++;

			if (coordY >= HEIGHT + C_C)
				firstRun = true;

		}

		@Override
		public void onSharedPreferenceChanged(SharedPreferences arg0,
				String arg1) {

			shape = Integer.parseInt(arg0.getString("shape_key", "1"));

			colorPref = Integer.parseInt(arg0.getString("color_key", "2"));

			bc = Integer.parseInt(arg0.getString("background_key", "11"));

			ij = Integer.parseInt(arg0.getString("vortex_key", "33"));

			switchGravSim = Integer
					.parseInt(arg0.getString("gravsim_key", "1"));

			switchFractal = Integer
					.parseInt(arg0.getString("fractal_key", "2"));

			switchIsometric = Integer.parseInt(arg0.getString("iso_key", "2"));

			switchSpiral = Integer.parseInt(arg0.getString("spiral_key", "1"));

			switch (colorPref) {
			case 1:
				col1P = 200;
				col2P = 0;
				col3P = 0; // red
				switchColor = 1;
				break;
			case 2:
				col1P = 0;
				col2P = 200;
				col3P = 0; // green
				switchColor = 2;
				break;
			case 3:
				col1P = 0;
				col2P = 0;
				col3P = 200; // blue
				switchColor = 3;
				break;
			case 4:
				col1P = 255;
				col2P = 255;
				col3P = 255; // white
				switchColor = 3;
				break;
			case 5:
				col1P = 255;
				col2P = 255;
				col3P = 0; // yellow
				switchColor = 1;
				break;
			case 6:
				col1P = 240;
				col2P = 230;
				col3P = 140; // khaki
				switchColor = 1;
				break;
			case 7:
				col1P = 255;
				col2P = 165;
				col3P = 0; // orange
				switchColor = 3;
				break;
			case 8:
				col1P = 75;
				col2P = 0;
				col3P = 130; // indigo
				switchColor = 3;
				break;
			case 9:
				col1P = 255;
				col2P = 192;
				col3P = 203; // pink
				switchColor = 1;
				break;
			case 10:
				col1P = 210;
				col2P = 105;
				col3P = 30; // chocolate
				switchColor = 1;
				break;
			case 11:
				col1P = 0;
				col2P = 0;
				col3P = 0; // black
				switchColor = 1;
				break;
			}

			p.setARGB(250, col1P, col2P, col3P);
			p.setStrokeWidth(3);

			switch (bc) {
			case 1:
				col1BG = 200;
				col2BG = 0;
				col3BG = 0; // red
				break;
			case 2:
				col1BG = 0;
				col2BG = 200;
				col3BG = 0; // green
				break;
			case 3:
				col1BG = 0;
				col2BG = 0;
				col3BG = 200; // blue
				break;
			case 4:
				col1BG = 255;
				col2BG = 255;
				col3BG = 255; // white
				break;
			case 5:
				col1BG = 255;
				col2BG = 255;
				col3BG = 0; // yellow
				break;
			case 6:
				col1BG = 240;
				col2BG = 230;
				col3BG = 140; // khaki
				break;
			case 7:
				col1BG = 255;
				col2BG = 165;
				col3BG = 0; // orange
				break;
			case 8:
				col1BG = 75;
				col2BG = 0;
				col3BG = 130; // indigo
				break;
			case 9:
				col1BG = 255;
				col2BG = 192;
				col3BG = 203; // pink
				break;
			case 10:
				col1BG = 210;
				col2BG = 105;
				col3BG = 30; // chocolate
				break;
			case 11:
				col1BG = 0;
				col2BG = 0;
				col3BG = 0; // black
				break;
			}

			bgColor = Color.rgb(col1BG, col2BG, col3BG);

			firstRun = true;
			drawFrame();

		}

	}
}