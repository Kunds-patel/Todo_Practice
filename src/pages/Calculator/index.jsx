import React, { Component } from "react";

export default class Calculator extends Component {
  state = {
    data: 0,
  };
  render() {
    const { data } = this.state;
    return (
      <div className="h-screen grid grid-cols-4 gap-4  place-content-center text-6xl text-red-500 font-bold">
        <p
          className="col-span-4 mx-28 border border-black"
          type="text"
          name="data"
          id=""
        >
          {data}
        </p>
        <button
          onClick={() => {
            this.setState({ data: 0 });
          }}
        >
          AC
        </button>
        <button>back</button>
        <button>+/-</button>
        <button>/</button>
        <button
          //
          onClick={() => {
            this.setState({ data: data + "7" });
          }}
        >
          7
        </button>
        <button
          onClick={() => {
            this.setState({ data: data + "8" });
          }}
        >
          8
        </button>
        <button
          onClick={() => {
            this.setState({ data: data + "9" });
          }}
        >
          9
        </button>
        <button
          onClick={() => {
            this.setState({ data: data + "*" });
          }}
        >
          *
        </button>
        <button
          onClick={() => {
            this.setState({ data: data + "4" });
          }}
        >
          4
        </button>
        <button
          onClick={() => {
            this.setState({ data: data + "5" });
          }}
        >
          5
        </button>
        <button
          onClick={() => {
            this.setState({ data: data + "6" });
          }}
        >
          6
        </button>
        <button
          onClick={() => {
            this.setState({ data: data + "-" });
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            this.setState({ data: data + "1" });
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            this.setState({ data: data + "2" });
          }}
        >
          2
        </button>
        <button
          onClick={() => {
            this.setState({ data: data + "3" });
          }}
        >
          3
        </button>
        <button
          onClick={() => {
            this.setState({ data: data + "+" });
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            this.setState({ data: data + "%" });
          }}
        >
          %
        </button>
        <button
          onClick={() => {
            this.setState({ data: data + "0" });
          }}
        >
          0
        </button>
        <button
          onClick={() => {
            this.setState({ data: data + "." });
          }}
        >
          .
        </button>
        <button
          onClick={() => {
            this.setState({ data: data });
          }}
        >
          =
        </button>
      </div>
    );
  }
}
