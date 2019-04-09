import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../shared/token.service";
import { Store } from "./store.model";

@Injectable()

export class StoreService{
    public storesUrl = "stores";

    public constructor(private tokenHttp: TokenService) {}

    
    public getAll(): Observable<Store[]>{
        let url = this.storesUrl;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToStores(response))
        )
    }


    public getById(id: number): Observable<Store> {
        let url = `${this.storesUrl}/${id}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToStore(response) )
        )
            
    }


    public create(store: Store): Observable<Store> {
        let url = this.storesUrl;
        let body = JSON.stringify(store);

        return this.tokenHttp.post(url, body).pipe(
            catchError(this.handleErrors),
            map(response => this.responseToStore(response))
        )
            
    }


    public update(store: Store): Observable<Store> {
        let url = `${this.storesUrl}/${store.id}`;
        let body = JSON.stringify(store);

        return this.tokenHttp.put(url, body).pipe(
            catchError(this.handleErrors),
            map(() => store)
        )
            
    }


    public delete(id: number): Observable<null> {
        let url = `${this.storesUrl}/${id}`;

        return this.tokenHttp.delete(url).pipe(
            catchError(this.handleErrors),
            map(() => null)
        )
    }


    public searchByName(term: string): Observable<Store[]> {
        let url = `${this.storesUrl}?q[name_cont]=${term}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response ) => this.responseToStores(response) )
        )
            
    }


    private handleErrors(error: Response){
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error );
        return throwError(error);
    }


    private responseToStores(response: Response): Store[] {
        let collection = response.json().data as Array<any>;
        let stores: Store[] = [];

        collection.forEach(item => {
            let store = new Store(
                item.id,
                item.attributes.name,
                item.attributes["store-type-id"],
                item.attributes["business-id"],
                item.attributes["city-id"],
                item.attributes.cep,
                item.attributes["address-name"],
                item.attributes["contact-info"],
                item.attributes.status,
                item.attributes["store-type-name"],
                item.attributes["business-name"],
                item.attributes["city-name"]
            )

            stores.push(store)
        })

        return stores;
    }


    private responseToStore(response: Response): Store {
        return new Store(
            response.json().data.id,
            response.json().data.attributes.name,
            response.json().data.attributes["store-type-id"],
            response.json().data.attributes["business-id"],
            response.json().data.attributes["city-id"],
            response.json().data.attributes.cep,
            response.json().data.attributes["address-name"],
            response.json().data.attributes["contact-info"],
            response.json().data.attributes.status,
            response.json().data.attributes["store-type-name"],
            response.json().data.attributes["business-name"],
            response.json().data.attributes["city-name"]
    )
    }
}
