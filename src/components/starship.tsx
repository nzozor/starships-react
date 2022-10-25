import { IStarship } from "../types/starship";
interface Props {
  starship: IStarship;
}
const Starship: React.FC<Props> = ({ starship }: Props) => {
  return (
    <div>
      <h3>Name: {starship.name}</h3>
      <h4>Model: {starship.model}</h4>
      <h5>Number of Films: {starship.films.length}</h5>
      <h6>
        Crew Number: {parseFloat(starship.crew.split("-")[0].replace(",", ""))}
      </h6>
    </div>
  );
};

export default Starship;
