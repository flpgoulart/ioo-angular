import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { Store } from "./shared/store.model";
import { StoreService } from "./shared/store.service";

@Component({
    selector: 'stores',
    styleUrls: ['./stores.component.css'],
    templateUrl: './stores.component.html'
})

export class StoresComponent implements AfterViewInit {
    public stores: Array<Store>;

    //quais colunas serão exibidas (tem que estar declarada no html)
    displayedColumns = [ 'business_name', 'name', 'city_name', 'status', 'actions'];
    dataSource = new MatTableDataSource<Store>();
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    public constructor(private storeService: StoreService, private changeDetectorRefs: ChangeDetectorRef){}

    public ngAfterViewInit(){
        this.listStores();
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
    
    public formatStatus(status: string) {
        switch (status) {
            case 'A':
                return 'Ativo';
            case 'I':
                return 'Inativo';
            default:
                return 'ERRO';
        }
    }

    public listStores() {
        this.storeService.getAll()
        .subscribe(stores => {
            this.stores = stores.sort((a, b) => b.id - a.id);
            this.dataSource.data = this.stores;
        },
            error => alert("Ocorreu um erro ao listar. Erro: " + error ) 
        )

    }
}

