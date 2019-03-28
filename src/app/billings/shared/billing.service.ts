import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../shared/token.service";
import { Billing } from "./billing.model";

@Injectable()

export class BillingService{
    public billingsUrl = "billings";

    public constructor(private tokenHttp: TokenService) {}

    
    public getAll(): Observable<Billing[]>{
        let url = this.billingsUrl;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToBillings(response))
        )
    }


    public getById(id: number): Observable<Billing> {
        let url = `${this.billingsUrl}/${id}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToBilling(response) )
        )
            
    }



    private handleErrors(error: Response){
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error );
        return throwError(error);
    }



    private responseToBillings(response: Response): Billing[] {
        let collection = response.json().data as Array<any>;
        let billings: Billing[] = [];

        collection.forEach(item => {
            let billing = new Billing(
                item.id, 
                item.attributes.document,  
                item.attributes['doc-date'], 
                item.attributes['ref-ini-date'], 
                item.attributes['ref-end-date'], 
                item.attributes['link-document'], 
                item.attributes.status
            )

            billings.push(billing)
        })

        return billings;
    }


    private responseToBilling(response: Response): Billing {
        return new Billing(
            response.json().data.id, 
            response.json().data.attributes.document, 
            response.json().data.attributes['doc-date'], 
            response.json().data.attributes['ref-ini-date'], 
            response.json().data.attributes['ref-end-date'], 
            response.json().data.attributes['link-document'], 
            response.json().data.attributes.status
        )
    }
}