package matchmakingDto

type MatchFoundResponse struct {
	MatchID          string `json:"matchId"`
	Color            string `json:"color"`
	OpponentPlayerId int    `json:"opponentUserId"`
}
