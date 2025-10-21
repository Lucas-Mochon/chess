package middlewares

import (
	"chesscom-copy/backend/internal/config"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func JWTMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "token manquant"})
			return
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")

		if tokenStr != string(config.GetJWTToken()) {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "token invalide"})
			return
		}

		c.Next()
	}
}
