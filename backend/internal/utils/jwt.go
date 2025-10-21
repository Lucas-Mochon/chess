package utils

import (
	"chesscom-copy/backend/internal/config"

	"github.com/google/uuid"
)

func GenerateJWT(userID int, email string) (string, error) {
	token := uuid.NewString()

	config.SetJWTToken(token)

	return token, nil
}
