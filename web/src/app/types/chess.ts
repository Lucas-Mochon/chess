export type Color = 'white' | 'black';
export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type GameStatus = 'playing' | 'check' | 'checkmate' | 'stalemate' | 'resigned' | 'draw' | 'timeout';

export interface Piece {
    type: PieceType;
    color: Color;
}

export interface Player {
    id: string;
    username: string;
    rating: number;
    avatar: string;
    country: string;
}

export interface Move {
    from: string;
    to: string;
    timestamp: number;
    notation: string;
    capturedPiece?: Piece;
    promotedTo?: PieceType;
}

export interface GameState {
    white: Player;
    black: Player;
    moves: Move[];
    currentTurn: Color;
    status: GameStatus;
    time: {
        timeWhite: number;
        timeBlack: number;
    }
    selectedSquare: string | null;
    validMoves: string[];
    inCheck?: boolean;
    checkColor?: Color;
    promotionPending?: {
        from: string;
        to: string;
    };
}
