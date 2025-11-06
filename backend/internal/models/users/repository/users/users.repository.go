package usersRepository

import (
	"chesscom-copy/backend/db/models"
	usersDto "chesscom-copy/backend/internal/models/users/dto/users"
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

func (r *UserRepository) Register(user usersDto.CreateUsersDTO) (models.Users, error) {
	var createdUser models.Users

	err := r.DB.QueryRow(
		`INSERT INTO users (username, email, password_hash)
         VALUES ($1, $2, $3)
         RETURNING id, username, email`,
		user.Username, user.Email, user.Password,
	).Scan(&createdUser.Id, &createdUser.Username, &createdUser.Email)

	if err != nil {
		return models.Users{}, err
	}

	return createdUser, nil
}

func (r *UserRepository) Login(user usersDto.UsersLoginDTO) (*models.Users, error) {
	var dbUser models.Users

	err := r.DB.QueryRow(
		"SELECT id, email, password_hash FROM users WHERE email = $1",
		user.Email,
	).Scan(&dbUser.Id, &dbUser.Email, &dbUser.PasswordHash)

	if err != nil {
		return nil, fmt.Errorf("utilisateur non trouvé")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(dbUser.PasswordHash), []byte(user.Password)); err != nil {
		return nil, fmt.Errorf("mot de passe incorrect")
	}

	return &dbUser, nil
}
