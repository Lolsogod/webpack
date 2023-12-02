interface IMovieInfo {
  id: number;
  poster: string;
  name: string;
  genere: string;
  year: number;
  lenght: string;
  descr: string;
}
interface ISearch {
  query: string;
  type: "name" | "genere";
}
interface ISort {
  type: "name" | "year";
  asc: boolean;
}
