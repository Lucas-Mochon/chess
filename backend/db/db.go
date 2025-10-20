package db

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func Init() {
	er := godotenv.Load()
	if er != nil {
		log.Fatal("Erreur lors du chargement du fichier .env")
	}
	connStr := os.Getenv("DATABASE_URL")
	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Erreur de connexion à la base :", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("Base inaccessible :", err)
	}

	log.Println("Connexion à PostgreSQL réussie ✅")
}
