package models

import "time"

type Payments struct {
	Id          string    `db:"id"`
	UserId      int       `db:"user_id"`
	Amount      string    `db:"amount"`
	Currency    string    `db:"currency"`
	PaymentDate time.Time `db:"payment_date"`
	Method      string    `db:"method"`
}
