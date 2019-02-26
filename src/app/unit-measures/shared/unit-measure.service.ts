import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../shared/token.service";
import { UnitMeasure } from "./unit-measure.model";

@Injectable()

export class UnitMeasureService{
    public unitMeasuresUrl = "unit_measures";

    public constructor(private tokenHttp: TokenService) {}

    
    public getAll(): Observable<UnitMeasure[]>{
        let url = this.unitMeasuresUrl;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToUnitMeasures(response))
        )
    }


    public getById(id: number): Observable<UnitMeasure> {
        let url = `${this.unitMeasuresUrl}/${id}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToUnitMeasure(response) )
        )
            
    }


    public create(unit_measure: UnitMeasure): Observable<UnitMeasure> {
        let url = this.unitMeasuresUrl;
        let body = JSON.stringify(unit_measure);

        return this.tokenHttp.post(url, body).pipe(
            catchError(this.handleErrors),
            map(response => this.responseToUnitMeasure(response))
        )
            
    }


    public update(unit_measure: UnitMeasure): Observable<UnitMeasure> {
        let url = `${this.unitMeasuresUrl}/${unit_measure.id}`;
        let body = JSON.stringify(unit_measure);

        return this.tokenHttp.put(url, body).pipe(
            catchError(this.handleErrors),
            map(() => unit_measure)
        )
            
    }


    public delete(id: number): Observable<null> {
        let url = `${this.unitMeasuresUrl}/${id}`;

        return this.tokenHttp.delete(url).pipe(
            catchError(this.handleErrors),
            map(() => null)
        )
            
    }


    public searchByName(term: string): Observable<UnitMeasure[]> {
        let url = `${this.unitMeasuresUrl}?q[name_cont]=${term}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response ) => this.responseToUnitMeasures(response) )
        )
            
    }


    private handleErrors(error: Response){
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error );
        return throwError(error);
    }


    private responseToUnitMeasures(response: Response): UnitMeasure[] {
        let collection = response.json().data as Array<any>;
        let unit_measures: UnitMeasure[] = [];

        collection.forEach(item => {
            let unit_measure = new UnitMeasure(
                item.id,
                item.attributes.name
            )

            unit_measures.push(unit_measure)
        })

        return unit_measures;
    }


    private responseToUnitMeasure(response: Response): UnitMeasure {
        return new UnitMeasure(
            response.json().data.id,
            response.json().data.attributes.name
        )
    }
}