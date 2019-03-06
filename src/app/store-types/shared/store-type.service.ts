import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../shared/token.service";
import { StoreType } from "./store-type.model";

@Injectable()

export class StoreTypeService{
    public storeTypesUrl = "store_types";

    public constructor(private tokenHttp: TokenService) {}

    
    public getAll(): Observable<StoreType[]>{
        let url = this.storeTypesUrl;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToStoreTypes(response))
        )
    }


    public getById(id: number): Observable<StoreType> {
        let url = `${this.storeTypesUrl}/${id}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToStoreType(response) )
        )
            
    }


    public create(store_type: StoreType): Observable<StoreType> {
        let url = this.storeTypesUrl;
        let body = JSON.stringify(store_type);

        return this.tokenHttp.post(url, body).pipe(
            catchError(this.handleErrors),
            map(response => this.responseToStoreType(response))
        )
            
    }


    public update(store_type: StoreType): Observable<StoreType> {
        let url = `${this.storeTypesUrl}/${store_type.id}`;
        let body = JSON.stringify(store_type);

        return this.tokenHttp.put(url, body).pipe(
            catchError(this.handleErrors),
            map(() => store_type)
        )
            
    }


    public delete(id: number): Observable<null> {
        let url = `${this.storeTypesUrl}/${id}`;

        return this.tokenHttp.delete(url).pipe(
            catchError(this.handleErrors),
            map(() => null)
        )
            
    }


    public searchByName(term: string): Observable<StoreType[]> {
        let url = `${this.storeTypesUrl}?q[name_cont]=${term}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response ) => this.responseToStoreTypes(response) )
        )
            
    }


    private handleErrors(error: Response){
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error );
        return throwError(error);
    }


    private responseToStoreTypes(response: Response): StoreType[] {
        let collection = response.json().data as Array<any>;
        let store_types: StoreType[] = [];

        collection.forEach(item => {
            let store_type = new StoreType(
                item.id,
                item.attributes.name
            )

            store_types.push(store_type)
        })

        return store_types;
    }


    private responseToStoreType(response: Response): StoreType {
        return new StoreType(
            response.json().data.id,
            response.json().data.attributes.name
        )
    }
}