import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { Offer } from "./shared/offer.model";
import { OfferService } from "./shared/offer.service";


@Component({
    selector: 'offers',
    styleUrls: ['./offers.component.css'],
    templateUrl: './offers.component.html'
})

export class OffersComponent implements AfterViewInit {
    public offers: Array<Offer>;

    //quais colunas serão exibidas (tem que estar declarada no html)
    displayedColumns = ['campaign_name', 'name', 'brand_name', 'status', 'offer_value', 'actions'];
    dataSource = new MatTableDataSource<Offer>();
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    public constructor(private offerService: OfferService, private changeDetectorRefs: ChangeDetectorRef){}

    public ngAfterViewInit(){
        this.listOffers();
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
    

    public listOffers() {
        this.offerService.getAll()
        .subscribe(offers => {
            this.offers = offers.sort((a, b) => b.id - a.id);
            this.dataSource.data = this.offers;
        },
            error => alert("Ocorreu um erro ao listar. Erro: " + error ) 
        )

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


    public getFormattedPrice(price: number) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    }
}

