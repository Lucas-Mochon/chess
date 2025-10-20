package echequier

import (
	"bytes"
	"image/color"

	"github.com/fogleman/gg"
)

type PieceType string

const (
	Pawn   PieceType = "pawn"
	Rook   PieceType = "rook"
	Knight PieceType = "knight"
	Bishop PieceType = "bishop"
	Queen  PieceType = "queen"
	King   PieceType = "king"
)

type ColorType string

const (
	White ColorType = "white"
	Black ColorType = "black"
)

type Piece struct {
	Type  PieceType
	Color ColorType
}

func GeneratePieceImage(piece Piece, size int) ([]byte, error) {
	dc := gg.NewContext(size, size)

	dc.SetRGBA(0, 0, 0, 0)
	dc.Clear()

	if piece.Color == White {
		dc.SetColor(color.White)
	} else {
		dc.SetColor(color.Black)
	}

	dc.DrawCircle(float64(size)/2, float64(size)/2, float64(size)/2-5)
	dc.Fill()

	dc.SetColor(color.Black)
	if piece.Color == Black {
		dc.SetColor(color.White)
	}

	var letter string
	switch piece.Type {
	case King:
		letter = "K"
	case Queen:
		letter = "Q"
	case Rook:
		letter = "R"
	case Bishop:
		letter = "B"
	case Knight:
		letter = "N"
	case Pawn:
		letter = "P"
	}

	dc.SetRGB(1, 0, 0)
	if err := dc.LoadFontFace("/path/to/font.ttf", float64(size)/2); err != nil {
		return nil, err
	}
	dc.DrawStringAnchored(letter, float64(size)/2, float64(size)/2, 0.5, 0.5)

	var buf bytes.Buffer
	if err := dc.EncodePNG(&buf); err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}
