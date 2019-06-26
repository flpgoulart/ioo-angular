import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../shared/token.service";
import { Campaign } from "./campaign.model";

@Injectable()

export class CampaignService{
    public campaignsUrl = "campaigns";

    public constructor(private tokenHttp: TokenService) {}

    
    public getAll(): Observable<Campaign[]>{
        let url = this.campaignsUrl;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToCampaigns(response))
        )
    }


    public getById(id: number): Observable<Campaign> {
        let url = `${this.campaignsUrl}/${id}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToCampaign(response) )
        )
            
    }

    public create(campaign: Campaign): Observable<Campaign> {
        let url = this.campaignsUrl;
        let body = JSON.stringify(campaign);

        return this.tokenHttp.post(url, body).pipe(
            catchError(this.handleErrors),
            map(response => this.responseToCampaign(response))
        )
            
    }


    public update(campaign: Campaign): Observable<Campaign> {
        let url = `${this.campaignsUrl}/${campaign.id}`;
        let body = JSON.stringify(campaign);

        return this.tokenHttp.put(url, body).pipe(
            catchError(this.handleErrors),
            map(() => campaign)
        )
            
    }


    public searchByName(term: string): Observable<Campaign[]> {
        let url = `${this.campaignsUrl}?q[name_cont]=${term}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response ) => this.responseToCampaigns(response) )
        )
            
    }


    private handleErrors(error: Response){
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error );
        return throwError(error);
    }


    private responseToCampaigns(response: Response): Campaign[] {
        let collection = response.json().data as Array<any>;
        let campaigns: Campaign[] = [];

        collection.forEach(item => {
            let campaign = new Campaign(
                item.id, 
                item.attributes.name,  
                item.attributes.disclaimer, 
                item.attributes['start-date'], 
                item.attributes['end-date'], 
                item.attributes.status
            )

            campaigns.push(campaign)
        })

        return campaigns;
    }


    private responseToCampaign(response: Response): Campaign {
        return new Campaign(
            response.json().data.id, 
            response.json().data.attributes.name, 
            response.json().data.attributes.disclaimer, 
            response.json().data.attributes['start-date'], 
            response.json().data.attributes['end-date'], 
            response.json().data.attributes.status
        )
    }
}