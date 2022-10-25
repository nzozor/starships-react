import { IStarship } from "../types/starship";
interface Props {
  starship: IStarship;
}
const Starship: React.FC<Props> = ({ starship }: Props) => {
  return (
    <div>
      <h3>Name: {starship.model}</h3>
      <h3>Number of Films: {starship.films.length}</h3>
      <p>
        Crew Number: {parseFloat(starship.crew.split("-")[0].replace(",", ""))}
      </p>
    </div>
  );
};

export default Starship;
