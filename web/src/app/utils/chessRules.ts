// utils/chessRules.ts
import { Piece, Color, PieceType } from '../types/chess';

export type Position = string;

interface Board {
    [key: string]: Piece | null;
}

export class ChessRules {
    static isValidPosition(position: string): boolean {
        const file = position.charCodeAt(0) - 'a'.charCodeAt(0);
        const rank = parseInt(position[1]) - 1;
        return file >= 0 && file <= 7 && rank >= 0 && rank <= 7;
    }

    static positionToCoords(position: string): [number, number] {
        const file = position.charCodeAt(0) - 'a'.charCodeAt(0);
        const rank = parseInt(position[1]) - 1;
        return [file, rank];
    }

    static coordsToPosition(file: number, rank: number): string {
        return String.fromCharCode('a'.charCodeAt(0) + file) + (rank + 1);
    }

    static shouldPromote(to: string, piece: Piece): boolean {
        if (piece.type !== 'pawn') return false;

        const [, rank] = this.positionToCoords(to);

        if (piece.color === 'white' && rank === 7) return true;

        if (piece.color === 'black' && rank === 0) return true;

        return false;
    }

    static getLegalMoves(
        position: string,
        piece: Piece,
        board: Board,
        currentTurn: Color
    ): string[] {
        if (piece.color !== currentTurn) {
            return [];
        }

        const moves: string[] = [];
        const [file, rank] = this.positionToCoords(position);

        let pseudoLegalMoves: string[] = [];

        switch (piece.type) {
            case 'pawn':
                pseudoLegalMoves = this.getPawnMoves(file, rank, piece.color, board);
                break;
            case 'rook':
                pseudoLegalMoves = this.getRookMoves(file, rank, piece.color, board);
                break;
            case 'knight':
                pseudoLegalMoves = this.getKnightMoves(file, rank, piece.color, board);
                break;
            case 'bishop':
                pseudoLegalMoves = this.getBishopMoves(file, rank, piece.color, board);
                break;
            case 'queen':
                pseudoLegalMoves = this.getQueenMoves(file, rank, piece.color, board);
                break;
            case 'king':
                pseudoLegalMoves = this.getKingMoves(file, rank, piece.color, board);
                break;
        }

        return pseudoLegalMoves.filter((move) => {
            const newBoard = this.simulateMove(position, move, board);
            return !this.isKingInCheck(piece.color, newBoard);
        });
    }

    static simulateMove(from: string, to: string, board: Board): Board {
        const newBoard = { ...board };
        const piece = newBoard[from];
        newBoard[to] = piece;
        newBoard[from] = null;
        return newBoard;
    }

    static findKing(color: Color, board: Board): string | null {
        for (const position in board) {
            const piece = board[position];
            if (piece && piece.type === 'king' && piece.color === color) {
                return position;
            }
        }
        return null;
    }

    static isKingInCheck(color: Color, board: Board): boolean {
        const kingPosition = this.findKing(color, board);
        if (!kingPosition) return false;

        const opponentColor = color === 'white' ? 'black' : 'white';

        for (const position in board) {
            const piece = board[position];
            if (piece && piece.color === opponentColor) {
                const attacks = this.getAttackingSquares(position, piece, board);
                if (attacks.includes(kingPosition)) {
                    return true;
                }
            }
        }

        return false;
    }

    static getAttackingSquares(
        position: string,
        piece: Piece,
        board: Board
    ): string[] {
        const [file, rank] = this.positionToCoords(position);
        const attacks: string[] = [];

        switch (piece.type) {
            case 'pawn':
                return this.getPawnAttacks(file, rank, piece.color);
            case 'rook':
                return this.getRookMoves(file, rank, piece.color, board);
            case 'knight':
                return this.getKnightMoves(file, rank, piece.color, board);
            case 'bishop':
                return this.getBishopMoves(file, rank, piece.color, board);
            case 'queen':
                return this.getQueenMoves(file, rank, piece.color, board);
            case 'king':
                return this.getKingMoves(file, rank, piece.color, board);
            default:
                return [];
        }
    }

    static isCheckmate(color: Color, board: Board): boolean {
        if (!this.isKingInCheck(color, board)) {
            return false;
        }

        for (const position in board) {
            const piece = board[position];
            if (piece && piece.color === color) {
                const legalMoves = this.getLegalMoves(position, piece, board, color);
                if (legalMoves.length > 0) {
                    return false;
                }
            }
        }

        return true;
    }

    static isStalemate(color: Color, board: Board): boolean {
        if (this.isKingInCheck(color, board)) {
            return false;
        }

        for (const position in board) {
            const piece = board[position];
            if (piece && piece.color === color) {
                const legalMoves = this.getLegalMoves(position, piece, board, color);
                if (legalMoves.length > 0) {
                    return false;
                }
            }
        }

        return true;
    }

    private static getPawnMoves(
        file: number,
        rank: number,
        color: Color,
        board: Board
    ): string[] {
        const moves: string[] = [];
        const direction = color === 'white' ? 1 : -1;
        const startRank = color === 'white' ? 1 : 6;

        const oneForward = rank + direction;
        if (this.isValidRank(oneForward)) {
            const pos = this.coordsToPosition(file, oneForward);
            if (!board[pos]) {
                moves.push(pos);

                if (rank === startRank) {
                    const twoForward = rank + 2 * direction;
                    const posTwo = this.coordsToPosition(file, twoForward);
                    if (!board[posTwo]) {
                        moves.push(posTwo);
                    }
                }
            }
        }

        [-1, 1].forEach((fileDelta) => {
            const newFile = file + fileDelta;
            const newRank = rank + direction;
            if (this.isValidFile(newFile) && this.isValidRank(newRank)) {
                const pos = this.coordsToPosition(newFile, newRank);
                const targetPiece = board[pos];
                if (targetPiece && targetPiece.color !== color) {
                    moves.push(pos);
                }
            }
        });

        return moves;
    }

    private static getPawnAttacks(
        file: number,
        rank: number,
        color: Color
    ): string[] {
        const attacks: string[] = [];
        const direction = color === 'white' ? 1 : -1;

        [-1, 1].forEach((fileDelta) => {
            const newFile = file + fileDelta;
            const newRank = rank + direction;
            if (this.isValidFile(newFile) && this.isValidRank(newRank)) {
                attacks.push(this.coordsToPosition(newFile, newRank));
            }
        });

        return attacks;
    }

    private static getRookMoves(
        file: number,
        rank: number,
        color: Color,
        board: Board
    ): string[] {
        const moves: string[] = [];
        const directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];

        directions.forEach(([fileDelta, rankDelta]) => {
            this.addLineMoves(
                file,
                rank,
                fileDelta,
                rankDelta,
                color,
                board,
                moves
            );
        });

        return moves;
    }

    private static getKnightMoves(
        file: number,
        rank: number,
        color: Color,
        board: Board
    ): string[] {
        const moves: string[] = [];
        const knightMoves = [
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
            [1, 2],
            [1, -2],
            [-1, 2],
            [-1, -2],
        ];

        knightMoves.forEach(([fileDelta, rankDelta]) => {
            const newFile = file + fileDelta;
            const newRank = rank + rankDelta;

            if (this.isValidFile(newFile) && this.isValidRank(newRank)) {
                const pos = this.coordsToPosition(newFile, newRank);
                const targetPiece = board[pos];

                if (!targetPiece || targetPiece.color !== color) {
                    moves.push(pos);
                }
            }
        });

        return moves;
    }

    private static getBishopMoves(
        file: number,
        rank: number,
        color: Color,
        board: Board
    ): string[] {
        const moves: string[] = [];
        const directions = [
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
        ];

        directions.forEach(([fileDelta, rankDelta]) => {
            this.addLineMoves(
                file,
                rank,
                fileDelta,
                rankDelta,
                color,
                board,
                moves
            );
        });

        return moves;
    }

    private static getQueenMoves(
        file: number,
        rank: number,
        color: Color,
        board: Board
    ): string[] {
        const moves: string[] = [];
        const directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
        ];

        directions.forEach(([fileDelta, rankDelta]) => {
            this.addLineMoves(
                file,
                rank,
                fileDelta,
                rankDelta,
                color,
                board,
                moves
            );
        });

        return moves;
    }

    private static getKingMoves(
        file: number,
        rank: number,
        color: Color,
        board: Board
    ): string[] {
        const moves: string[] = [];
        const directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
        ];

        directions.forEach(([fileDelta, rankDelta]) => {
            const newFile = file + fileDelta;
            const newRank = rank + rankDelta;

            if (this.isValidFile(newFile) && this.isValidRank(newRank)) {
                const pos = this.coordsToPosition(newFile, newRank);
                const targetPiece = board[pos];

                if (!targetPiece || targetPiece.color !== color) {
                    moves.push(pos);
                }
            }
        });

        return moves;
    }

    private static addLineMoves(
        file: number,
        rank: number,
        fileDelta: number,
        rankDelta: number,
        color: Color,
        board: Board,
        moves: string[]
    ): void {
        let newFile = file + fileDelta;
        let newRank = rank + rankDelta;

        while (this.isValidFile(newFile) && this.isValidRank(newRank)) {
            const pos = this.coordsToPosition(newFile, newRank);
            const targetPiece = board[pos];

            if (!targetPiece) {
                moves.push(pos);
            } else {
                if (targetPiece.color !== color) {
                    moves.push(pos);
                }
                break;
            }

            newFile += fileDelta;
            newRank += rankDelta;
        }
    }

    private static isValidFile(file: number): boolean {
        return file >= 0 && file <= 7;
    }

    private static isValidRank(rank: number): boolean {
        return rank >= 0 && rank <= 7;
    }

    static isLegalMove(
        from: string,
        to: string,
        piece: Piece,
        board: Board,
        currentTurn: Color
    ): boolean {
        const legalMoves = this.getLegalMoves(from, piece, board, currentTurn);
        return legalMoves.includes(to);
    }
}
