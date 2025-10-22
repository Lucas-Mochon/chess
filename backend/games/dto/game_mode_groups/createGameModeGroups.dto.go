package gameModeGroupsDto

type CreateGameModeGroupsDTO struct {
	Name string `json:"name" binding:"required"`
	Logo []byte `json:"logo" binding:"omitempty"`
}
