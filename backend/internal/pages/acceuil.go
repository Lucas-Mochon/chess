package pages

import "github.com/gin-gonic/gin"

func HomePage(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Bienvenue sur ChessGo 🧠",
		"version": "1.0.0",
	})
}
