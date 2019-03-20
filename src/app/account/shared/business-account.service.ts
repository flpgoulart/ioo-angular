import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../shared/token.service";
import { BusinessAccount } from "./business-account.model";

@Injectable()

export class BusinessAccountService{
    public businessAccountsUrl = "business_accounts";

    public constructor(private tokenHttp: TokenService) {}

    
    // public getById(id: number): Observable<BusinessAccount> {
    //     let url = `${this.businessAccountsUrl}/${id}`;

    //     return this.tokenHttp.get(url).pipe(
    //         catchError(this.handleErrors),
    //         map((response: Response) => this.responseToBusinessAccount(response) )
    //     )
            
    // }

    public getAll(): Observable<BusinessAccount>{
        let url = this.businessAccountsUrl;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToBusinessAccounts(response))
        )
    }
    
    
    public create(businessAccount: BusinessAccount): Observable<BusinessAccount> {
        let url = this.businessAccountsUrl;
        let body = JSON.stringify(businessAccount);

        return this.tokenHttp.post(url, body).pipe(
            catchError(this.handleErrors),
            map(response => this.responseToBusinessAccount(response))
        )
            
    }


    public update(businessAccount: BusinessAccount): Observable<BusinessAccount> {
        let url = `${this.businessAccountsUrl}/${businessAccount.id}`;
        let body = JSON.stringify(businessAccount);

        return this.tokenHttp.put(url, body).pipe(
            catchError(this.handleErrors),
            map(() => businessAccount)
        )
            
    }


    private handleErrors(error: Response){
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error );
        return throwError(error);
    }


    private responseToBusinessAccounts(response: Response): BusinessAccount {

        let collection = response.json().data as Array<any>;
        let accounts: BusinessAccount[] = [];

        collection.forEach(item => {
            let account = new BusinessAccount(
                item.id,
                item.attributes.name,
                item.attributes.cnpj,
                item.attributes.insce,
                item.attributes.inscm,
                item.attributes.cep,
                item.attributes['city-name'],
                item.attributes.uf,
                item.attributes['address-name'],
                item.attributes.email,
                item.attributes['ddd-phone'],
                item.attributes.phone,
                item.attributes['ddd-mobile'],
                item.attributes.mobile,
                item.attributes.plan,
                item.attributes.status
            )

            accounts.push(account)
        })

        if (accounts.length > 0) {
            return accounts[0];
        } else {
            let newAccount = new BusinessAccount(null,'','','','','','','','','',null,null,null,null,'','');
            return newAccount;
        }
        

    }


    private responseToBusinessAccount(response: Response): BusinessAccount {

        return new BusinessAccount(
            response.json().data.id,
            response.json().data.attributes.name,
            response.json().data.attributes.cnpj,
            response.json().data.attributes.insce,
            response.json().data.attributes.inscm,
            response.json().data.attributes.cep,
            response.json().data.attributes['city-name'],
            response.json().data.attributes.uf,
            response.json().data.attributes['address-name'],
            response.json().data.attributes.email,
            response.json().data.attributes['ddd-phone'],
            response.json().data.attributes.phone,
            response.json().data.attributes['ddd-mobile'],
            response.json().data.attributes.mobile,
            response.json().data.attributes.plan,
            response.json().data.attributes.status
    )

    }


}
