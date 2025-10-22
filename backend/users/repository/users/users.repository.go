package usersRepository

import (
	"chesscom-copy/backend/db/models"
	usersDto "chesscom-copy/backend/users/dto/users"
	"database/sql"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type UserRepository struct {
	DB *sql.DB
}

func (r *UserRepository) List() ([]models.Users, error) {
	rows, err := r.DB.Query("SELECT id, username, email FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.Users
	for rows.Next() {
		var u models.Users
		if err := rows.Scan(&u.Id, &u.Username, &u.Email); err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}

func (r *UserRepository) Register(user usersDto.CreateUsersDTO) error {
	_, err := r.DB.Exec(
		"INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)",
		user.Username, user.Email, user.Password,
	)

	return err
}

func (r *UserRepository) Login(user usersDto.UsersLoginDTO) (*models.Users, error) {
	var dbUser models.Users
	if err := r.DB.QueryRow("SELECT id, email, password_hash FROM users WHERE email = $1", user.Email).Scan(&dbUser.Id, &dbUser.Email, &dbUser.PasswordHash); err != nil {
		return nil, fmt.Errorf("utilisateur non trouvé")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(dbUser.PasswordHash), []byte(user.Password)); err != nil {
		return nil, fmt.Errorf("mot de passe incorrect")
	}

	return &dbUser, nil
}
