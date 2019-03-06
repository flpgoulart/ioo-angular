import { Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { TokenService } from "../../shared/token.service";
import { Product } from "./product.model";

@Injectable()

export class ProductService{
    public productsUrl = "products";

    public constructor(private tokenHttp: TokenService) {}

    
    public getAll(): Observable<Product[]>{
        let url = this.productsUrl;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToProducts(response))
        )
    }


    public getById(id: number): Observable<Product> {
        let url = `${this.productsUrl}/${id}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response) => this.responseToProduct(response) )
        )
            
    }


    public create(product: Product): Observable<Product> {
        let url = this.productsUrl;
        let body = JSON.stringify(product);

        return this.tokenHttp.post(url, body).pipe(
            catchError(this.handleErrors),
            map(response => this.responseToProduct(response))
        )
            
    }


    public update(product: Product): Observable<Product> {
        let url = `${this.productsUrl}/${product.id}`;
        let body = JSON.stringify(product);

        return this.tokenHttp.put(url, body).pipe(
            catchError(this.handleErrors),
            map(() => product)
        )
            
    }


    public delete(id: number): Observable<null> {
        let url = `${this.productsUrl}/${id}`;

        return this.tokenHttp.delete(url).pipe(
            catchError(this.handleErrors),
            map(() => null)
        )
            
    }


    public searchByName(term: string): Observable<Product[]> {
        let url = `${this.productsUrl}?q[name_cont]=${term}`;

        return this.tokenHttp.get(url).pipe(
            catchError(this.handleErrors),
            map((response: Response ) => this.responseToProducts(response) )
        )
            
    }


    private handleErrors(error: Response){
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error );
        return throwError(error);
    }


    private responseToProducts(response: Response): Product[] {
        let collection = response.json().data as Array<any>;
        let products: Product[] = [];

        collection.forEach(item => {
            let product = new Product(
                item.id,
                item.attributes.name,
                item.attributes["logo-default"],
                item.attributes["subcategory-id"],
                item.attributes.keywords,
                item.attributes["subcategory-name"]
            )

            products.push(product)
        })

        return products;
    }


    private responseToProduct(response: Response): Product {
        return new Product(
            response.json().data.id,
            response.json().data.attributes.name,
            response.json().data.attributes["logo-default"],
            response.json().data.attributes["subcategory-id"],
            response.json().data.attributes.keywords,
            response.json().data.attributes["subcategory-name"]
        )
    }
}