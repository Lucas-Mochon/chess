package main

import (
	"chesscom-copy/backend/db"
	"chesscom-copy/backend/internal/router"
	"log"
)

func main() {
	db.Init()
	r := router.SetupRouter()
	log.Println("✅ Serveur API démarré sur http://localhost:8080")
	r.Run(":8080")
}
