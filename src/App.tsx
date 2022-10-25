import React from "react";
import "./App.scss";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IStarship, IStarshipResponse } from "./types/starship";
import Starship from "./components/starship";
import styled from "styled-components";

const App: React.FC = () => {
  const defaultStarships: IStarship[] = [];
  const [starships, setStarships]: [IStarship[], (posts: IStarship[]) => void] =
    React.useState(defaultStarships);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] =
    React.useState("");
  const [next, setNext]: [string | null, (previous: string | null) => void] =
    React.useState<string | null>("");
  const [previous, setPrevious]: [
    string | null,
    (previous: string | null) => void
  ] = React.useState<string | null>("");

  const loadStarship = async (url: string) => {
    setLoading(true);
    setStarships([]);
    await axios
      .get<IStarshipResponse>(url)
      .then((response: AxiosResponse<IStarshipResponse, any>) => {
        setStarships(
          response.data.results
            .sort((a, b) => {
              const shipA = parseFloat(a.crew.split("-")[0].replace(",", ""));
              const shipB = parseFloat(b.crew.split("-")[0].replace(",", ""));

              return shipA - shipB;
            })
            .filter(
              (starship) =>
                parseFloat(starship.crew.split("-")[0].replace(",", "")) <= 10
            )
        );
        setNext(response.data.next);
        setPrevious(response.data.previous);
        setLoading(false);
      })
      .catch((ex: AxiosError) => {
        const error =
          ex.response?.status === 404
            ? "Resource Not found"
            : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      });
  };
  React.useEffect(() => {
    loadStarship("https://swapi.dev/api/starships/?format=json");
  }, []);

  return (
    <div className="starship-app">
      <main className="starship-app__main">
        <h1> Star Wars</h1>
        <div>
          {starships.length > 0 &&
            starships.map((starship) => (
              <Ship key={starship.name}>
                <Starship starship={starship}></Starship>
              </Ship>
            ))}
        </div>
        <div>{loading && <p>Loading starships</p>}</div>
        <div>{error && <p>{error}</p>}</div>
        <div className="starship-app__btn-container">
          {previous && (
            <Button onClick={() => loadStarship(previous as string)}>
              Previous
            </Button>
          )}
          {next && (
            <Button
              disabled={!next}
              onClick={() => loadStarship(next as string)}
            >
              Next
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;

const Ship = styled.div`
  border: 1px solid yellow;
  margin: 30px;
  padding: 30px;
  color: yellow;
`;

const Button = styled.button`
  display: inline;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  margin: 1em;
  background-color: black;
  border: 2px solid yellow;
  border-radius: 3px;
  cursor: pointer;
`;
