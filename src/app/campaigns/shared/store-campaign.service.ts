import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../shared/token.service";
import { StoreCampaign } from "./store-campaign.model";

@Injectable()

export class StoreCampaignService{
    public storeCampaignsUrl = "store_campaigns";

    public constructor(private tokenHttp: TokenService) {}

    
    public getAll(): Observable<StoreCampaign[]>{
        let url = this.storeCampaignsUrl;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToStoreCampaigns(response))
        )
    }


    public getById(id: number): Observable<StoreCampaign> {
        let url = `${this.storeCampaignsUrl}/${id}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToStoreCampaign(response) )
        )
            
    }

    public create(storeCampaign: StoreCampaign): Observable<StoreCampaign> {
        let url = this.storeCampaignsUrl;
        let body = JSON.stringify(storeCampaign);

        return this.tokenHttp.post(url, body).pipe(
            catchError(this.handleErrors),
            map(response => this.responseToStoreCampaign(response))
        )
            
    }


    public update(storeCampaign: StoreCampaign): Observable<StoreCampaign> {
        let url = `${this.storeCampaignsUrl}/${storeCampaign.id}`;
        let body = JSON.stringify(storeCampaign);

        return this.tokenHttp.put(url, body).pipe(
            catchError(this.handleErrors),
            map(() => storeCampaign)
        )
            
    }


    public searchByCampaign(id: number): Observable<StoreCampaign[]> {
        let url = `${this.storeCampaignsUrl}?q[campaign_id_eq]=${id}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response ) => this.responseToStoreCampaigns(response) )
        )
            
    }

    private handleErrors(error: Response){
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error );
        return throwError(error);
    }


    private responseToStoreCampaigns(response: Response): StoreCampaign[] {
        let collection = response.json().data as Array<any>;
        let storeCampaigns: StoreCampaign[] = [];

        collection.forEach(item => {
            let storeCampaign = new StoreCampaign(
                item.id, 
                item.attributes['store-id'],  
                item.attributes['campaign-id'], 
                item.attributes.status,
                item.attributes['store-name']
            )

            storeCampaigns.push(storeCampaign)
        })

        return storeCampaigns;
    }


    private responseToStoreCampaign(response: Response): StoreCampaign {
        return new StoreCampaign(
            response.json().data.id, 
            response.json().data.attributes['store-id'], 
            response.json().data.attributes['campaign-id'], 
            response.json().data.attributes.status,
            response.json().data.attributes['store-name']
        )
    }
}