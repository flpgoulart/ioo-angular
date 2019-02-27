import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { Subcategory } from "./shared/subcategory.model";
import { SubcategoryService } from "./shared/subcategory.service";
import { CategoryService } from "../categories/shared/category.service";
import { Category } from "../categories/shared/category.model";

@Component({
    selector: 'subcategories',
    styleUrls: ['./subcategories.component.css'],
    templateUrl: './subcategories.component.html'
})

export class SubcategoriesComponent implements AfterViewInit {
    public subcategories: Array<Subcategory>;
    public category: Category;

    //quais colunas serão exibidas (tem que estar declarada no html)
    displayedColumns = ['category_name', 'name', 'description', 'actions'];
    dataSource = new MatTableDataSource<Subcategory>();
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    public constructor(private subcategoryService: SubcategoryService, private categoryService: CategoryService, private changeDetectorRefs: ChangeDetectorRef){}

    public ngAfterViewInit(){
        this.listSubcategories();
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
    

    public deleteSubcategory(subcategory: Subcategory){
        if (confirm(`Deseja realmente excluir - "${subcategory.name}"`)) {
            this.subcategoryService.delete(subcategory.id)
                .subscribe(
                    () => {
                        this.listSubcategories();
                        this.changeDetectorRefs.detectChanges();
                    },
                    error => alert("Ocorreu um erro ao excluir. Erro: " + error)
                )
        }
    }


    public listSubcategories() {
        this.subcategoryService.getAll()
        .subscribe(subcategories => {
            this.subcategories = subcategories.sort((a, b) => b.id - a.id);
            this.dataSource.data = this.subcategories;
        },
            error => alert("Ocorreu um erro ao listar. Erro: " + error ) 
        )

    }
}

