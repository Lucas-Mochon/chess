package main

import (
	"chesscom-copy/backend/internal/router"
	"log"
)

func main() {
	r := router.SetupRouter()
	log.Println("✅ Serveur API démarré sur http://localhost:8080")
	r.Run(":8080")
}
