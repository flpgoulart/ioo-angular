import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { Business } from "./shared/business.model";
import { BusinessService } from "./shared/business.service";


@Component({
    selector: 'businesses',
    styleUrls: ['./businesses.component.css'],
    templateUrl: './businesses.component.html'
})

export class BusinessesComponent implements AfterViewInit {
    public businesses: Array<Business>;

    //quais colunas serão exibidas (tem que estar declarada no html)
    displayedColumns = ['name', 'about_us', 'actions'];
    dataSource = new MatTableDataSource<Business>();
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    public constructor(private businessService: BusinessService, private changeDetectorRefs: ChangeDetectorRef){}

    public ngAfterViewInit(){
        this.listBusinesses();
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
    

    public listBusinesses() {
        this.businessService.getAll()
        .subscribe(businesses => {
            this.businesses = businesses.sort((a, b) => b.id - a.id);
            this.dataSource.data = this.businesses;
        },
            error => alert("Ocorreu um erro ao listar. Erro: " + error ) 
        )

    }
}

