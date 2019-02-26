import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { UnitMeasure } from "./shared/unit-measure.model";
import { UnitMeasureService } from "./shared/unit-measure.service";

@Component({
    selector: 'unit-measures',
    styleUrls: ['./unit-measures.component.css'],
    templateUrl: './unit-measures.component.html'
})

export class UnitMeasuresComponent implements AfterViewInit {
    public unit_measures: Array<UnitMeasure>;

    //quais colunas serão exibidas (tem que estar declarada no html)
    displayedColumns = ['name', 'actions'];
    dataSource = new MatTableDataSource<UnitMeasure>();
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    public constructor(private unitMeasureService: UnitMeasureService, private changeDetectorRefs: ChangeDetectorRef){}

    public ngAfterViewInit(){
        this.listUnitMeasures();
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
    

    public deleteUnitMeasure(unit_measure: UnitMeasure){
        if (confirm(`Deseja realmente excluir - "${unit_measure.name}"`)) {
            this.unitMeasureService.delete(unit_measure.id)
                .subscribe(
                    () => {
                        this.listUnitMeasures();
                        this.changeDetectorRefs.detectChanges();
                    },
                    error => alert("Ocorreu um erro ao excluir. Erro: " + error)
                )
        }
    }


    public listUnitMeasures() {
        this.unitMeasureService.getAll()
        .subscribe(unit_measures => {
            this.unit_measures = unit_measures.sort((a, b) => b.id - a.id);
            this.dataSource.data = this.unit_measures;
        },
            error => alert("Ocorreu um erro ao listar. Erro: " + error ) 
        )

    }
}

