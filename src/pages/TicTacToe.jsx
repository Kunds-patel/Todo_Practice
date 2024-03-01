/* eslint-disable react/no-unescaped-entities */
import React, { Component } from "react";
import { Button } from "@/components/ui/button";

const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default class TicTacToe extends Component {
  state = {
    player: 1,
    currentPlayer: null,
    ticTac: ["", "", "", "", "", "", "", "", ""],
    winner: null,
  };

  Checker = (y) => {
    let e = y.ticTac;
    for (const combination of winCombination) {
      const [a, b, c] = combination;
      if (e[a] !== "" && e[a] === e[b] && e[b] === e[c]) {
        this.setState({ winner: `Congratulations Player ${e[a]} is Winner ` });
      } else if (e.every((value) => value !== "")) {
        this.setState({ winner: "Match is Draw" });
      }
    }
  };

  render() {
    const { ticTac, currentPlayer, winner, player } = this.state;
    return (
      <div className="h-screen grid gap-2 place-content-center text-xl">
        <h1 className="text-5xl bold mb-14">Tic Tac Toe</h1>
        {currentPlayer ? (
          <>
            <p className="text-center ">
              Player's {player} : {currentPlayer} turn
            </p>
            <div className="grid grid-cols-3 grid-rows-3 h-[500px] aspect-square place-content-center gap-2 ">
              {ticTac.map((x, i) => (
                <button
                  key={i}
                  type="button"
                  className="text-white border-red-600 bg-black h-full text-7xl"
                  disabled={winner || x}
                  onClick={() => {
                    this.setState(
                      () => ({
                        ticTac: [
                          ...ticTac.slice(0, i),
                          currentPlayer,
                          ...ticTac.slice(i + 1),
                        ],
                      }),
                      () => {
                        this.Checker({
                          ticTac: [
                            ...ticTac.slice(0, i),
                            currentPlayer,
                            ...ticTac.slice(i + 1),
                          ],
                        });
                        this.setState({
                          currentPlayer: currentPlayer === "X" ? "O" : "X",
                          player: player === 1 ? 2 : 1,
                        });
                      }
                    );
                  }}
                >
                  {x}
                </button>
              ))}
            </div>
            <p className="text-center font-bold">{winner}</p>
          </>
        ) : (
          <>
            <p>Tose for Player 1 : 'X' or 'O'</p>
            <Button
              type="button"
              onClick={() => {
                this.setState(() => ({
                  currentPlayer:
                    Math.round(Math.random() * 2) === 1 ? "X" : "O",
                }));
              }}
            >
              Tose
            </Button>
          </>
        )}
      </div>
    );
  }
}
