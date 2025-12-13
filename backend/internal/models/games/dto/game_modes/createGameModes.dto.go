package gameModesDto

type CreateGameModesDTO struct {
	GameModeGroupID int    `json:"gameModeGroupId" binding:"required"`
	Name            string `json:"name" binding:"required"`
	Descrition      string `json:"description" binding:"omitempty"`
	DefaultStats    int    `json:"defaultStats" binding:"required"`
	Time            int    `json:"time" binding:"required"`
}
