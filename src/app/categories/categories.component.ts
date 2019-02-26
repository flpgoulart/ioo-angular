import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { Category } from "./shared/category.model";
import { CategoryService } from "./shared/category.service";

@Component({
    selector: 'categories',
    styleUrls: ['./categories.component.css'],
    templateUrl: './categories.component.html'
})

export class CategoriesComponent implements AfterViewInit {
    public categories: Array<Category>;

    //quais colunas serão exibidas (tem que estar declarada no html)
    displayedColumns = ['name', 'description', 'actions'];
    dataSource = new MatTableDataSource<Category>();
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    public constructor(private categoryService: CategoryService, private changeDetectorRefs: ChangeDetectorRef){}

    public ngAfterViewInit(){
        this.listCategories();
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
    

    public deleteCategory(category: Category){
        if (confirm(`Deseja realmente excluir - "${category.name}"`)) {
            this.categoryService.delete(category.id)
                .subscribe(
                    () => {
                        this.listCategories();
                        this.changeDetectorRefs.detectChanges();
                    },
                    error => alert("Ocorreu um erro ao excluir. Erro: " + error)
                )
        }
    }


    public listCategories() {
        this.categoryService.getAll()
        .subscribe(categories => {
            this.categories = categories.sort((a, b) => b.id - a.id);
            this.dataSource.data = this.categories;
        },
            error => alert("Ocorreu um erro ao listar. Erro: " + error ) 
        )

    }
}

