package main

import (
	"chesscom-copy/backend/db"
	"chesscom-copy/backend/internal/initiator"
	"chesscom-copy/backend/internal/router"
	"log"
)

func main() {
	db.Init()
	controllers := initiator.InitControllers(db.DB)
	r := router.SetupRouter(controllers)
	log.Println("✅ Serveur API démarré sur http://localhost:8080")
	r.Run(":8080")
}
