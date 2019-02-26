import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../shared/token.service";
import { Category } from "./category.model";

@Injectable()

export class CategoryService{
    public categoriesUrl = "categories";

    public constructor(private tokenHttp: TokenService) {}

    
    public getAll(): Observable<Category[]>{
        let url = this.categoriesUrl;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToCategories(response))
        )
    }


    public getById(id: number): Observable<Category> {
        let url = `${this.categoriesUrl}/${id}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToCategory(response) )
        )
            
    }


    public create(category: Category): Observable<Category> {
        let url = this.categoriesUrl;
        let body = JSON.stringify(category);

        return this.tokenHttp.post(url, body).pipe(
            catchError(this.handleErrors),
            map(response => this.responseToCategory(response))
        )
            
    }


    public update(category: Category): Observable<Category> {
        let url = `${this.categoriesUrl}/${category.id}`;
        let body = JSON.stringify(category);

        return this.tokenHttp.put(url, body).pipe(
            catchError(this.handleErrors),
            map(() => category)
        )
            
    }


    public delete(id: number): Observable<null> {
        let url = `${this.categoriesUrl}/${id}`;

        return this.tokenHttp.delete(url).pipe(
            catchError(this.handleErrors),
            map(() => null)
        )
            
    }


    public searchByName(term: string): Observable<Category[]> {
        let url = `${this.categoriesUrl}?q[name_cont]=${term}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response ) => this.responseToCategories(response) )
        )
            
    }


    private handleErrors(error: Response){
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error );
        return throwError(error);
    }


    private responseToCategories(response: Response): Category[] {
        let collection = response.json().data as Array<any>;
        let categories: Category[] = [];

        collection.forEach(item => {
            let category = new Category(
                item.id,
                item.attributes.name,
                item.attributes.description,
                item.attributes.logo
            )

            categories.push(category)
        })

        return categories;
    }


    private responseToCategory(response: Response): Category {
        return new Category(
            response.json().data.id,
            response.json().data.attributes.name,
            response.json().data.attributes.description,
            response.json().data.attributes.logo
        )
    }
}