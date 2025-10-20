package models

import "time"

type UserPremium struct {
	Id          string    `db:"id"`
	UserId      int       `db:"user_id"`
	FeatureId   int       `db:"feature_id"`
	ActivatedAt time.Time `db:"activated_at"`
	ExpiresAt   time.Time `db:"expires_at"`
}
