export type GameStatus =
  | "playing"
  | "win"
  | "lose"
  | "miniGameLost"
  | "miniGameWon";

export type MiniGameId =
  | "order-number"
  | "plug-wire"
  | "click"
  | "defusing"
  | "math-equation"
  | "guess-time"
  | "progress-bar"
  | "temperature"
  | "swipe-card"
  | "sort-number"
  | "element-fight";

const availableMiniGames: MiniGameId[] = [
  "order-number",
  "plug-wire",
  "click",
  "defusing",
  "math-equation",
  "guess-time",
  "progress-bar",
  "temperature",
  "swipe-card",
  "sort-number",
  "element-fight",
];

const defaultLives = 3;
const defaultLevels = 5;

export type GameState = {
  lives: number;
  level: number;
  completedLevels: number;
  status: GameStatus;
  queue: MiniGameId[];
};

export function createGameState(): GameState {
  return {
    lives: defaultLives,
    level: 0,
    completedLevels: 0,
    status: "playing",
    queue: createQueue(defaultLevels + defaultLives),
  };
}

export function createQueue(totalLevels: number): MiniGameId[] {
  const queue: MiniGameId[] = [];

  for (let i = 0; i < totalLevels; i++) {
    const previousMiniGame = queue[i - 1];

    const possibleMiniGames = availableMiniGames.filter(
      (miniGame) => miniGame !== previousMiniGame,
    );

    const randomIndex = Math.floor(Math.random() * possibleMiniGames.length);

    const selectedMiniGame = possibleMiniGames[randomIndex];

    if (selectedMiniGame === undefined) {
      throw new Error("No mini-game available");
    }

    queue.push(selectedMiniGame);
  }

  return queue;
}

export function getCurrentMiniGame(state: GameState): MiniGameId | null {
  return state.queue[state.level] ?? null;
}

export function goToMiniGameWinPage(state: GameState): void {
  state.status = "miniGameWon";
}

export function goToMiniGameLostPage(state: GameState): void {
  state.status = "miniGameLost";
}

export function winLevel(state: GameState): void {
  if (state.status !== "playing") {
    return;
  }

  state.completedLevels++;

  if (state.completedLevels === defaultLevels) {
    state.status = "win";
    return;
  }

  goToMiniGameWinPage(state);
}

export function loseLevel(state: GameState): void {
  if (state.status !== "playing") {
    return;
  }

  state.lives = Math.max(state.lives - 1, 0);

  if (state.lives === 0) {
    state.status = "lose";
    return;
  }

  goToMiniGameLostPage(state);
}

export function goToNextLevel(state: GameState): void {
  state.level++;
  state.status = "playing";
}
