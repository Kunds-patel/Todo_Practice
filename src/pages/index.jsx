import Link from "next/link";
import React, { Component } from "react";

export default class All extends Component {
  render() {
    return (
      <div className="grid md:grid-cols-2 text-white gap-32 text-2xl font-bold text-center place-content-center justify-items-center h-screen max-w-6xl mx-auto">
        <Link
          href="/TodoApp"
          target="_blank"
          className="grid place-content-center h-36 aspect-square rounded-lg bg-orange-300"
        >
          Todo
        </Link>
        <Link
          href="/TodoApp_Function"
          target="_blank"
          className="grid place-content-center h-36 aspect-square rounded-lg bg-orange-300"
        >
          Todo Function
        </Link>
        <Link
          href="/TicTacToe"
          target="_blank"
          className="grid place-content-center h-36 aspect-square rounded-lg bg-orange-300"
        >
          TicTacToe
        </Link>
        <Link
          href="/Weather"
          target="_blank"
          className="h-36 aspect-square grid place-content-center rounded-lg bg-orange-300"
        >
          Weather
        </Link>
        <Link
          href="/Calculator"
          target="_blank"
          className="grid place-content-center h-36 aspect-square rounded-lg bg-orange-300"
        >
          Calculator
        </Link>
      </div>
    );
  }
}
