import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { City } from "./shared/city.model";
import { CityService } from "./shared/city.service";

@Component({
    selector: 'cities',
    styleUrls: ['./cities.component.css'],
    templateUrl: './cities.component.html'
})

export class CitiesComponent implements AfterViewInit {
    public cities: Array<City>;

    //quais colunas serão exibidas (tem que estar declarada no html)
    displayedColumns = ['name', 'uf', 'cep_begin', 'cep_end', 'actions'];
    dataSource = new MatTableDataSource<City>();
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    public constructor(private cityService: CityService, private changeDetectorRefs: ChangeDetectorRef){}

    public ngAfterViewInit(){
        this.listCities();
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
    

    public deleteCity(city: City){
        if (confirm(`Deseja realmente excluir - "${city.name}"`)) {
            this.cityService.delete(city.id)
                .subscribe(
                    () => {
                        this.listCities();
                        this.changeDetectorRefs.detectChanges();
                    },
                    error => alert("Ocorreu um erro ao excluir. Erro: " + error)
                )
        }
    }


    public listCities() {
        this.cityService.getAll()
        .subscribe(cities => {
            this.cities = cities.sort((a, b) => b.id - a.id);
            this.dataSource.data = this.cities;
        },
            error => alert("Ocorreu um erro ao listar. Erro: " + error ) 
        )

    }
}

