package gamesDto

type GameInformationResponse struct {
	Result             string  `json:"result"`
	Id                 int     `json:"id"`
	Time               string  `json:"game_mode_time"`
	GameModeName       string  `json:"game_mode_name"`
	GameModeId         int     `json:"game_mode_id"`
	WhitePlayerId      int     `json:"white_player_id"`
	WhitePlayerName    string  `json:"white_player_name"`
	WhitePlayerPicture []byte  `json:"white_player_picture"`
	WhitePlayerCountry *string `json:"white_player_country"`
	WhitePlayerRating  int     `json:"white_player_rating"`
	BlackPlayerId      int     `json:"black_player_id"`
	BlackPlayerName    string  `json:"black_player_name"`
	BlackPlayerPicture []byte  `json:"black_player_picture"`
	BlackPlayerCountry *string `json:"black_player_country"`
	BlackPlayerRating  int     `json:"black_player_rating"`
}
