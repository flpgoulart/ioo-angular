import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../shared/token.service";
import { Offer } from "./offer.model";

@Injectable()

export class OfferService{
    public offersUrl = "offers";

    public constructor(private tokenHttp: TokenService) {}

    
    public getAll(): Observable<Offer[]>{
        let url = this.offersUrl;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToOffers(response))
        )
    }


    public getById(id: number): Observable<Offer> {
        let url = `${this.offersUrl}/${id}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToOffer(response) )
        )
            
    }


    public create(offer: Offer): Observable<Offer> {
        let url = this.offersUrl;
        let body = JSON.stringify(offer);

        return this.tokenHttp.post(url, body).pipe(
            catchError(this.handleErrors),
            map(response => this.responseToOffer(response))
        )
            
    }


    public update(offer: Offer): Observable<Offer> {
        let url = `${this.offersUrl}/${offer.id}`;
        let body = JSON.stringify(offer);

        return this.tokenHttp.put(url, body).pipe(
            catchError(this.handleErrors),
            map(() => offer)
        )
            
    }


    public searchByName(term: string): Observable<Offer[]> {
        let url = `${this.offersUrl}?q[name_cont]=${term}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response ) => this.responseToOffers(response) )
        )
            
    }


    private handleErrors(error: Response){
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error );
        return throwError(error);
    }


    private responseToOffers(response: Response): Offer[] {
        let collection = response.json().data as Array<any>;
        let offers: Offer[] = [];

        collection.forEach(item => {
            let offer = new Offer(
                item.id,
                item.attributes.name,
                item.attributes["brand-name"],
                item.attributes["product-id"],
                item.attributes["campaign-id"],
                item.attributes.disclaimer,
                item.attributes.status,
                item.attributes["unit-measure-id"],
                item.attributes["product-value"],
                item.attributes["offer-value"],
                item.attributes["campaign-name"]
            )

            offers.push(offer)
        })

        return offers;
    }


    private responseToOffer(response: Response): Offer {
        return new Offer(
            response.json().data.id,
            response.json().data.attributes.name,
            response.json().data.attributes["brand-name"],
            response.json().data.attributes["product-id"],
            response.json().data.attributes["campaign-id"],
            response.json().data.attributes.disclaimer,
            response.json().data.attributes.status,
            response.json().data.attributes["unit-measure-id"],
            response.json().data.attributes["product-value"],
            response.json().data.attributes["offer-value"],
            response.json().data.attributes["campaign-name"]
    )
    }
}