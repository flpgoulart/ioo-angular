import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../shared/token.service";
import { Subcategory } from "./subcategory.model";

@Injectable()

export class SubcategoryService{
    public subcategoriesUrl = "subcategories";

    public constructor(private tokenHttp: TokenService) {}

    
    public getAll(): Observable<Subcategory[]>{
        let url = this.subcategoriesUrl;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToSubcategories(response))
        )
    }


    public getById(id: number): Observable<Subcategory> {
        let url = `${this.subcategoriesUrl}/${id}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToSubcategory(response) )
        )
            
    }


    public create(subcategory: Subcategory): Observable<Subcategory> {
        let url = this.subcategoriesUrl;
        let body = JSON.stringify(subcategory);

        return this.tokenHttp.post(url, body).pipe(
            catchError(this.handleErrors),
            map(response => this.responseToSubcategory(response))
        )
            
    }


    public update(subcategory: Subcategory): Observable<Subcategory> {
        let url = `${this.subcategoriesUrl}/${subcategory.id}`;
        let body = JSON.stringify(subcategory);

        return this.tokenHttp.put(url, body).pipe(
            catchError(this.handleErrors),
            map(() => subcategory)
        )
            
    }


    public delete(id: number): Observable<null> {
        let url = `${this.subcategoriesUrl}/${id}`;

        return this.tokenHttp.delete(url).pipe(
            catchError(this.handleErrors),
            map(() => null)
        )
            
    }


    public searchByName(term: string): Observable<Subcategory[]> {
        let url = `${this.subcategoriesUrl}?q[name_cont]=${term}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response ) => this.responseToSubcategories(response) )
        )
            
    }


    private handleErrors(error: Response){
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error );
        return throwError(error);
    }


    private responseToSubcategories(response: Response): Subcategory[] {
        let collection = response.json().data as Array<any>;
        let subcategories: Subcategory[] = [];

        collection.forEach(item => {
            let subcategory = new Subcategory(
                item.id,
                item.attributes.name,
                item.attributes.description,
                item.attributes["category-id"],
                item.attributes["market-session"],
                item.attributes.logo,
                item.attributes["category-name"]
            )

            subcategories.push(subcategory)
        })

        return subcategories;
    }


    private responseToSubcategory(response: Response): Subcategory {
        return new Subcategory(
            response.json().data.id,
            response.json().data.attributes.name,
            response.json().data.attributes.description,
            response.json().data.attributes["category-id"],
            response.json().data.attributes["market-session"],
            response.json().data.attributes.logo,
            response.json().data["category-name"]
        )
    }
}