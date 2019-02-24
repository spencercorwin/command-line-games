import * as prompt from 'prompt';

class TicTacToe {
    board: object;
    player: number;
    constructor() {
        this.board = {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
        };
        this.player = 1;
    }

    private printBoard(): void {
        console.log(
            `
            ${this.board[1]} | ${this.board[2]} | ${this.board[3]}\n
            ----------\n
            ${this.board[4]} | ${this.board[5]} | ${this.board[6]}\n
            ----------\n
            ${this.board[7]} | ${this.board[8]} | ${this.board[9]}\n
            `
        )
    }

    public startMove(): void {
        this.printBoard();
        console.log(`Player ${this.player} make your move`);
        prompt.start();
        prompt.get(['Space'], (err, result) => {
            if (!this.isAValidSpace(result.Space)) {
                console.log('That is not valid input. Please enter a number between 1 and 9');
                this.startMove();
            } else if (this.isSpaceTaken(result.Space)) {
                console.log('That space is taken. Try again');
                this.startMove();
            } else {
                console.log('You entered: ' + result.Space.trim());
                this.updateBoard(result.Space);
                this.checkForVictory();
            }
        });
    }

    private updateBoard(input: string): void {
        const scrubbedInput = input.trim();
        const number = Number(scrubbedInput);
        const symbol = (player: number): string => player === 1 ? 'O' : 'X';
        this.board[number] = symbol(this.player);
    }

    private checkForVictory(): void {
        const board = this.board;
        const declareVictor = (victor: number): void => {
            console.log(board[victor] + ' wins!');
        };
        const checkRow = (start: number): boolean => {
            return board[start] === board[start+1] && board[start] === board[start+2] ? true : false;
        }
        const checkCol = (start: number): boolean => {
            return board[start] === board[start+3] && board[start] === board[start+6] ? true : false;
        }
        const checkD1 = (start: number): boolean => {
            return board[start] === board[start+5] && board[start] === board[start+8] ? true : false;
        }
        const checkD2 = (start: number): boolean => {
            return board[start] === board[start+2] && board[start] === board[start+4] ? true : false;
        }
        if (checkRow(1)) {
            declareVictor(1);
        } else if (checkRow(4)) {
            declareVictor(4);
        } else if (checkRow(7)) {
            declareVictor(7);
        } else if (checkCol(1)) {
            declareVictor(1);
        } else if (checkCol(2)) {
            declareVictor(2);
        } else if (checkCol(3)) {
            declareVictor(3);
        } else if (checkD1(1)) {
            declareVictor(1);
        } else if (checkD2(3)) {
            declareVictor(3);
        } else {
            this.player = this.player === 1 ? 2 : 1;
            this.startMove();
        }
    }

    private isSpaceTaken(input: string): boolean {
        const scrubbedInput = Number(input.trim());
        return typeof this.board[scrubbedInput] === 'number' ? false : true;
    }

    private isAValidSpace(input: string): boolean {
        const validSpaces = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        return validSpaces.indexOf(Number(input.trim())) !== -1 ? true : false;
    }
}

const game = new TicTacToe;
game.startMove();