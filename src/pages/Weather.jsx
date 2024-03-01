import React, { Component, createRef } from "react";
import { Button } from "@/components/ui/button";

export default class Weather extends Component {
  state = {
    data: [
      {
        id: 1,
        city: "Ahmedabad",
        temp: 25,
      },
      {
        id: 2,
        city: "Surat",
        temp: 29,
      },
      {
        id: 3,
        city: "Mehsana",
        temp: 21,
      },
      {
        id: 4,
        city: "Gandhinagar",
        temp: 25,
      },
      {
        id: 5,
        city: "Palanpur",
        temp: 24,
      },
      {
        id: 6,
        city: "Vadodra",
        temp: 27,
      },
    ],
    selectedItem: null,
  };

  selectRef = createRef();

  tempShow = (e) => {
    e.preventDefault();
    this.setState(({ data }) => ({
      selectedItem: data.find((x) => x.id == this.selectRef.current.value),
    }));
  };

  render() {
    const { selectedItem, data } = this.state;
    return (
      <div className="h-screen grid place-content-center">
        <form onSubmit={this.tempShow} className="flex">
          <select
            ref={this.selectRef}
            name="citys"
            id="select"
            className="border border-black rounded-l-lg"
          >
            <option value="">Please choose City</option>
            {data.map((x) => (
              <option key={x.id} value={x.id}>
                {x.city}
              </option>
            ))}
          </select>
          <Button className=" rounded-l-none" type="submit">
            Submit
          </Button>
        </form>
        {selectedItem && (
          <p>
            temperature of {selectedItem.city} is {selectedItem.temp}
          </p>
        )}
      </div>
    );
  }
}
