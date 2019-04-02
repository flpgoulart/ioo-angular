import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../shared/token.service";
import { Business } from "./business.model";

@Injectable()

export class BusinessService{
    public businessesUrl = "businesses";

    public constructor(private tokenHttp: TokenService) {}

    
    public getAll(): Observable<Business[]>{
        let url = this.businessesUrl;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToBusinesses(response))
        )
    }


    public getById(id: number): Observable<Business> {
        let url = `${this.businessesUrl}/${id}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToBusiness(response) )
        )
            
    }


    public create(business: Business): Observable<Business> {
        let url = this.businessesUrl;
        let body = JSON.stringify(business);

        return this.tokenHttp.post(url, body).pipe(
            catchError(this.handleErrors),
            map(response => this.responseToBusiness(response))
        )
            
    }


    public update(business: Business): Observable<Business> {
        let url = `${this.businessesUrl}/${business.id}`;
        let body = JSON.stringify(business);

        return this.tokenHttp.put(url, body).pipe(
            catchError(this.handleErrors),
            map(() => business)
        )
            
    }


    public delete(id: number): Observable<null> {
        let url = `${this.businessesUrl}/${id}`;

        return this.tokenHttp.delete(url).pipe(
            catchError(this.handleErrors),
            map(() => null)
        )
            
    }


    public searchByName(term: string): Observable<Business[]> {
        let url = `${this.businessesUrl}?q[name_cont]=${term}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response ) => this.responseToBusinesses(response) )
        )
            
    }


    private handleErrors(error: Response){
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error );
        return throwError(error);
    }


    private responseToBusinesses(response: Response): Business[] {
        let collection = response.json().data as Array<any>;
        let businesses: Business[] = [];

        collection.forEach(item => {
            let business = new Business(
                item.id,
                item.attributes.name,
                item.attributes["about-us"],
                item.attributes["url-site"],
                item.attributes["url-facebook"],
                item.attributes["contact-info"]
            )

            businesses.push(business)
        })

        return businesses;
    }


    private responseToBusiness(response: Response): Business {
        return new Business(
            response.json().data.id,
            response.json().data.attributes.name,
            response.json().data.attributes["about-us"],
            response.json().data.attributes["url-site"],
            response.json().data.attributes["url-facebook"],
            response.json().data.attributes["contact-info"]
        )
    }
}

