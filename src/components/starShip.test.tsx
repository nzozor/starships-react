import { render, screen } from "@testing-library/react";
import Starship from "./starship";
import { IStarship } from "../types/starship";

test("renders starship element", () => {
  const starship = { model: "starShip 1", films: ["movie 1"], crew: "9" };
  render(<Starship starship={starship as IStarship} />);

  const linkElement = screen.getByText(/starShip 1/i);
  expect(linkElement).toBeInTheDocument();
});
