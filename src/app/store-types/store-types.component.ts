import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { StoreType } from "./shared/store-type.model";
import { StoreTypeService } from "./shared/store-type.service";

@Component({
    selector: 'store-types',
    styleUrls: ['./store-types.component.css'],
    templateUrl: './store-types.component.html'
})

export class StoreTypesComponent implements AfterViewInit {
    public store_types: Array<StoreType>;

    //quais colunas serão exibidas (tem que estar declarada no html)
    displayedColumns = ['name', 'actions'];
    dataSource = new MatTableDataSource<StoreType>();
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    public constructor(private storeTypeService: StoreTypeService, private changeDetectorRefs: ChangeDetectorRef){}

    public ngAfterViewInit(){
        this.listStoreTypes();
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
    

    public deleteStoreType(store_type: StoreType){
        if (confirm(`Deseja realmente excluir - "${store_type.name}"`)) {
            this.storeTypeService.delete(store_type.id)
                .subscribe(
                    () => {
                        this.listStoreTypes();
                        this.changeDetectorRefs.detectChanges();
                    },
                    error => alert("Ocorreu um erro ao excluir. Erro: " + error)
                )
        }
    }


    public listStoreTypes() {
        this.storeTypeService.getAll()
        .subscribe(store_types => {
            this.store_types = store_types.sort((a, b) => b.id - a.id);
            this.dataSource.data = this.store_types;
        },
            error => alert("Ocorreu um erro ao listar. Erro: " + error ) 
        )

    }
}

