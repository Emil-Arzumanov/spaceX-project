export interface IShips {
    ship_id: string,
    ship_name: string,
    ship_type: string,
    weight_kg: number,
    home_port: string,
    year_built: number,
    missions: Array<{ name: string, flight: number }>,
}