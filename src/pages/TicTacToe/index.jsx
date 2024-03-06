/* eslint-disable react/no-unescaped-entities */
import React, { Component } from "react";
import { Button } from "@/components/ui/button";
import css from "styled-jsx/css";

export default class TicTacToe extends Component {
  state = {
    player: 1,
    currentPlayer: null,
    ticTac: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    winner: null,
  };

  render() {
    const { ticTac, currentPlayer, winner, player } = this.state;
    return (
      <div className=" h-screen grid gap-2 place-content-center text-xl">
        <h1 className="text-5xl bold mb-7 text-center">Tic Tac Toe</h1>
        {currentPlayer ? (
          <>
            <Button
              type="button"
              onClick={() => {
                this.setState({
                  player: 1,
                  currentPlayer: null,
                  ticTac: [
                    ["", "", ""],
                    ["", "", ""],
                    ["", "", ""],
                  ],
                  winner: null,
                });
              }}
            >
              Restart
            </Button>
            <p className="text-center ">
              Player's {player} : {currentPlayer} turn
            </p>
            {!winner ? (
              <div className="grid grid-cols-3 bg-black grid-rows-3 h-96 aspect-square place-content-center gap-2 ">
                {ticTac.map((x, i) =>
                  x.map((y, j) => (
                    <button
                      key={`${i}_${j}`}
                      type="button"
                      className="text-black bg-white border-red-600 h-full text-7xl"
                      disabled={winner || y}
                      onClick={() => {
                        this.setState(
                          () => ({
                            ticTac: [
                              ...ticTac.slice(0, i),
                              [
                                ...x.slice(0, j),
                                currentPlayer,
                                ...x.slice(j + 1),
                              ],

                              ...ticTac.slice(i + 1),
                            ],
                          }),
                          () => {
                            const { ticTac } = this.state;
                            if (
                              (ticTac[i][0] !== "" &&
                                ticTac[i][0] === ticTac[i][1] &&
                                ticTac[i][1] === ticTac[i][2]) ||
                              (ticTac[0][j] !== "" &&
                                ticTac[0][j] === ticTac[1][j] &&
                                ticTac[1][j] === ticTac[2][j])
                            ) {
                              return this.setState({
                                winner: `Winner is Player ${player} : ${currentPlayer}`,
                              });
                            }
                            if (
                              (ticTac[0][0] !== "" &&
                                ticTac[0][0] === ticTac[1][1] &&
                                ticTac[1][1] === ticTac[2][2]) ||
                              (ticTac[0][2] !== "" &&
                                ticTac[0][2] === ticTac[1][1] &&
                                ticTac[1][1] === ticTac[2][0])
                            ) {
                              return this.setState({
                                winner: `Winner is Player ${player} : ${currentPlayer}`,
                              });
                            }
                            if (
                              ticTac[0][0] !== "" &&
                              ticTac[0][1] !== "" &&
                              ticTac[0][2] !== "" &&
                              ticTac[1][0] !== "" &&
                              ticTac[1][1] !== "" &&
                              ticTac[1][2] !== "" &&
                              ticTac[2][0] !== "" &&
                              ticTac[2][1] !== "" &&
                              ticTac[2][2] !== ""
                            ) {
                              return this.setState({
                                winner: `Match Draw`,
                              });
                            }
                            this.setState({
                              currentPlayer: currentPlayer === "X" ? "O" : "X",
                              player: player === 1 ? 2 : 1,
                            });
                          }
                        );
                      }}
                    >
                      {y}
                    </button>
                  ))
                )}
              </div>
            ) : (
              <p className="text-center font-bold">{winner}</p>
            )}
          </>
        ) : (
          <>
            <p>Toss for Player 1 : 'X' or 'O'</p>
            <Button
              type="button"
              onClick={() => {
                this.setState(() => ({
                  currentPlayer:
                    Math.round(Math.random() * 2) === 1 ? "X" : "O",
                }));
              }}
            >
              Toss
            </Button>
          </>
        )}
      </div>
    );
  }
}
