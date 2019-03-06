import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { Product } from "./shared/product.model";
import { ProductService } from "./shared/product.service";


@Component({
    selector: 'products',
    styleUrls: ['./products.component.css'],
    templateUrl: './products.component.html'
})

export class ProductsComponent implements AfterViewInit {
    public products: Array<Product>;

    //quais colunas serão exibidas (tem que estar declarada no html)
    displayedColumns = ['subcategory_name', 'name', 'keywords', 'actions'];
    dataSource = new MatTableDataSource<Product>();
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    public constructor(private productService: ProductService, private changeDetectorRefs: ChangeDetectorRef){}

    public ngAfterViewInit(){
        this.listProducts();
    }

    public ngOnInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    public applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }
    

    public deleteProduct(product: Product){
        if (confirm(`Deseja realmente excluir - "${product.name}"`)) {
            this.productService.delete(product.id)
                .subscribe(
                    () => {
                        this.listProducts();
                        this.changeDetectorRefs.detectChanges();
                    },
                    error => alert("Ocorreu um erro ao excluir. Erro: " + error)
                )
        }
    }


    public listProducts() {
        this.productService.getAll()
        .subscribe(products => {
            this.products = products.sort((a, b) => b.id - a.id);
            this.dataSource.data = this.products;
        },
            error => alert("Ocorreu um erro ao listar. Erro: " + error ) 
        )

    }
}

