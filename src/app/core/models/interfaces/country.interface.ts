export interface ICountry {
  id: number;
  name: string;
  cities: City[]
}

interface City {
  id: number,
  name: string
}
