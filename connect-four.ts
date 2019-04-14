import * as prompt from 'prompt';

class ConnectFour {
  board: object;
  player: number;
  constructor() {
    this.board = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
    }
    this.player = 1;
  }

  private printBoard(): void {
    const returnSpot = (input: string | undefined): string => {
      return input === undefined ? ' ' : input;
    }
    console.log(
        `
        |${returnSpot(this.board[1][5])}|${returnSpot(this.board[2][5])}|${returnSpot(this.board[3][5])}|${returnSpot(this.board[4][5])}|${returnSpot(this.board[5][5])}|${returnSpot(this.board[6][5])}|${returnSpot(this.board[7][5])}|
        |${returnSpot(this.board[1][4])}|${returnSpot(this.board[2][4])}|${returnSpot(this.board[3][4])}|${returnSpot(this.board[4][4])}|${returnSpot(this.board[5][4])}|${returnSpot(this.board[6][4])}|${returnSpot(this.board[7][4])}|
        |${returnSpot(this.board[1][3])}|${returnSpot(this.board[2][3])}|${returnSpot(this.board[3][3])}|${returnSpot(this.board[4][3])}|${returnSpot(this.board[5][3])}|${returnSpot(this.board[6][3])}|${returnSpot(this.board[7][3])}|
        |${returnSpot(this.board[1][2])}|${returnSpot(this.board[2][2])}|${returnSpot(this.board[3][2])}|${returnSpot(this.board[4][2])}|${returnSpot(this.board[5][2])}|${returnSpot(this.board[6][2])}|${returnSpot(this.board[7][2])}|
        |${returnSpot(this.board[1][1])}|${returnSpot(this.board[2][1])}|${returnSpot(this.board[3][1])}|${returnSpot(this.board[4][1])}|${returnSpot(this.board[5][1])}|${returnSpot(this.board[6][1])}|${returnSpot(this.board[7][1])}|
        |${returnSpot(this.board[1][0])}|${returnSpot(this.board[2][0])}|${returnSpot(this.board[3][0])}|${returnSpot(this.board[4][0])}|${returnSpot(this.board[5][0])}|${returnSpot(this.board[6][0])}|${returnSpot(this.board[7][0])}|
        ---------------
        |1|2|3|4|5|6|7|
        `
    )
  }

  private printRotatedBoard(): void {
    const returnSpot = (input: string | undefined): string => {
      return input === undefined ? ' ' : input;
    }
    console.log(
        `
        |${returnSpot(this.board[1][6])}|${returnSpot(this.board[2][6])}|${returnSpot(this.board[3][6])}|${returnSpot(this.board[4][6])}|${returnSpot(this.board[5][6])}|${returnSpot(this.board[6][6])}|
        |${returnSpot(this.board[1][5])}|${returnSpot(this.board[2][5])}|${returnSpot(this.board[3][5])}|${returnSpot(this.board[4][5])}|${returnSpot(this.board[5][5])}|${returnSpot(this.board[6][5])}|
        |${returnSpot(this.board[1][4])}|${returnSpot(this.board[2][4])}|${returnSpot(this.board[3][4])}|${returnSpot(this.board[4][4])}|${returnSpot(this.board[5][4])}|${returnSpot(this.board[6][4])}|
        |${returnSpot(this.board[1][3])}|${returnSpot(this.board[2][3])}|${returnSpot(this.board[3][3])}|${returnSpot(this.board[4][3])}|${returnSpot(this.board[5][3])}|${returnSpot(this.board[6][3])}|
        |${returnSpot(this.board[1][2])}|${returnSpot(this.board[2][2])}|${returnSpot(this.board[3][2])}|${returnSpot(this.board[4][2])}|${returnSpot(this.board[5][2])}|${returnSpot(this.board[6][2])}|
        |${returnSpot(this.board[1][1])}|${returnSpot(this.board[2][1])}|${returnSpot(this.board[3][1])}|${returnSpot(this.board[4][1])}|${returnSpot(this.board[5][1])}|${returnSpot(this.board[6][1])}|
        |${returnSpot(this.board[1][0])}|${returnSpot(this.board[2][0])}|${returnSpot(this.board[3][0])}|${returnSpot(this.board[4][0])}|${returnSpot(this.board[5][0])}|${returnSpot(this.board[6][0])}|
        -------------
        |1|2|3|4|5|6|
        `
    )
  }

  // Rotates board 90 degrees (only works once as it is now)
  public rotateBoard(): void {
    // Since the board isn't a square then there will now be 6 columns and 7 rows in the newly rotated board

    const newBoard = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    }

    // col and row are iterating through the "old" board
    for (let col = 7, newRow = 0; col >= 1; col--, newRow++) {
      for (let row = 0, newCol = 1; row < 6; row++, newCol++) {
        newBoard[newCol][newRow] = this.board[col][row];
      }
    }

    this.board = newBoard;
  }

  public playGame(): void {
    this.printBoard();
    console.log(`Enter a column player ${this.player}`);
    prompt.start();
    prompt.get(['Col'], (err, result) => {
      if (!this.isValidCol(result.Col)) {
        console.log('That is not a valid input. Please enter a column number between 1 and 7');
        this.playGame();
      } else if (this.isColFull(result.Col)) {
        console.log('That column is full. Please enter a valid column');
        this.playGame();
      } else {
        this.updateBoard(result.Col);
        this.checkForVictor();
      }
    })

  }

  private checkForVictor(): void {
    const checkCol = (col: number): string => {
      for (let i: number = 0; i <= 2; i++) {
        let initialMoniker: string = this.board[col][i];
            for (let y: number = 1; y < 4; y++) {
              if (initialMoniker === undefined) {
                break;
              } else if (this.board[col][i + y] !== initialMoniker) {
                break;
              } else if (this.board[col][i + y] === initialMoniker && y === 3) {
                return initialMoniker;
              }
            }
      }
      return '';
    }

    const checkRow = (row: number): string => {
      for (let i: number = 1; i <= 4; i++) {
        let initialMoniker: string = this.board[i][row];
            for (let y: number = 0; y < 4; y++) {
              if (initialMoniker === undefined) {
                break;
              } else if (this.board[i + y][row] !== initialMoniker) {
                break;
              } else if (this.board[i + y][row] === initialMoniker && y === 3) {
                return initialMoniker;
              }
            }
      }
      return '';
    }

    const declareVictor = (input: string): void => {
      const victor: string = input === 'O' ? 'Player 1 (O)': 'Player 2 (X)';
      console.log(victor + ' wins!');
      this.printBoard();
      console.log('Rotated board: ');
      this.rotateBoard();
      this.printRotatedBoard();
    }

    for (let col = 1; col <= 7; col++) {
      if (checkCol(col)) {
        declareVictor(checkCol(col));
        return;
      }
    }

    for (let row = 0; row <= 5; row++) {
      if (checkRow(row)) {
        declareVictor(checkRow(row));
        return;
      }
    }
    this.player = this.player === 1 ? 2 : 1;
    this.playGame();
  }

  private updateBoard(input: string): void {
    this.board[Number(input.trim())].push(this.returnMoniker());
  }

  private isValidCol(input: string): boolean {
    const scrubbedInput = Number(input.trim());
    return scrubbedInput >= 1 && scrubbedInput <= 7 ? true : false;
  }

  private returnMoniker(): string {
    return this.player === 1 ? 'O' : 'X';
  }

  private isColFull(input: string): boolean {
    const scrubbedInput = Number(input.trim());
    return this.board[scrubbedInput].length >= 6 ? true : false;
  }

}

const game = new ConnectFour();
game.playGame();
