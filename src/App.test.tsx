import { render, screen } from "@testing-library/react";
import App from "./App";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

test("renders star wars title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Star wars/i);

  expect(linkElement).toBeInTheDocument();
});

test("render starships", async () => {
  render(<App />);
  mockedAxios.mockResolvedValueOnce({
    data: [],
    status: 200,
    statusText: "Ok",
    headers: {},
    config: {},
  });
  expect(axios.get).toHaveBeenCalledWith(
    `https://swapi.dev/api/starships/?format=json`
  );
});
