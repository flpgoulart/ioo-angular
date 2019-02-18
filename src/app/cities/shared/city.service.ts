import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../shared/token.service";
import { City } from "./city.model";

@Injectable()

export class CityService{
    public citiesUrl = "cities";

    public constructor(private tokenHttp: TokenService) {}

    
    public getAll(): Observable<City[]>{
        let url = this.citiesUrl;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToCities(response))
        )
    }


    public getById(id: number): Observable<City> {
        let url = `${this.citiesUrl}/${id}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToCity(response) )
        )
            
    }


    public create(city: City): Observable<City> {
        let url = this.citiesUrl;
        let body = JSON.stringify(city);

        return this.tokenHttp.post(url, body).pipe(
            catchError(this.handleErrors),
            map(response => this.responseToCity(response))
        )
            
    }


    public update(city: City): Observable<City> {
        let url = `${this.citiesUrl}/${city.id}`;
        let body = JSON.stringify(city);

        return this.tokenHttp.put(url, body).pipe(
            catchError(this.handleErrors),
            map(() => city)
        )
            
    }


    public delete(id: number): Observable<null> {
        let url = `${this.citiesUrl}/${id}`;

        return this.tokenHttp.delete(url).pipe(
            catchError(this.handleErrors),
            map(() => null)
        )
            
    }


    public searchByName(term: string): Observable<City[]> {
        let url = `${this.citiesUrl}?q[name_cont]=${term}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response ) => this.responseToCities(response) )
        )
            
    }


    private handleErrors(error: Response){
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error );
        return throwError(error);
    }


    private responseToCities(response: Response): City[] {
        let collection = response.json().data as Array<any>;
        let cities: City[] = [];

        collection.forEach(item => {
            let city = new City(
                item.id,
                item.attributes.name,
                item.attributes['cep-begin'],
                item.attributes['cep-end'],
                item.attributes.uf
            )

            cities.push(city)
        })

        return cities;
    }


    private responseToCity(response: Response): City {
        return new City(
            response.json().data.id,
            response.json().data.attributes.name,
            response.json().data.attributes['cep-begin'],
            response.json().data.attributes['cep-end'],
            response.json().data.attributes.uf
        )
    }
}