import { apiService } from "./api";

interface GameInformationResponse {
    id: number;
    result: string;
    game_mode_name: string;
    game_mode_id: number;
    white_player_id: number;
    white_player_name: string;
    white_player_picture: string | null;
    white_player_country: string | null;
    white_player_rating: number;
    black_player_id: number;
    black_player_name: string;
    black_player_picture: string | null;
    black_player_country: string | null;
    black_player_rating: number;
}

interface MatchmakingResponse {
    game: GameInformationResponse;
    status: "matched" | "waiting";
}

async function joinQueue(userId: number, gameModeId: number): Promise<MatchmakingResponse | null> {
    try {
        const res = await apiService.get<MatchmakingResponse>(
            `/api/games/matchmaking/join/${userId}/${gameModeId}`
        );

        return res;
    } catch (error) {
        console.error("Erreur lors du matchmaking:", error);
        return null;
    }
}

async function checkQueueStatus(userId: number): Promise<MatchmakingResponse | null> {
    try {
        const res = await apiService.get<MatchmakingResponse>(
            `/api/games/matchmaking/check/status/${userId}`
        );

        return res;
    } catch (error) {
        console.error("Erreur lors de la vérification du statut du matchmaking:", error);
        return null;
    }
}


export const matchmakingService = {
    joinQueue,
    checkQueueStatus
};