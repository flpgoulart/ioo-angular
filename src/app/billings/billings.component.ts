import { Component, AfterViewInit, ViewChild } from "@angular/core";
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { Billing } from "./shared/billing.model";
import { BillingService } from "./shared/billing.service";


@Component({
    selector: 'billings',
    styleUrls: ['./billings.component.css'],
    templateUrl: './billings.component.html'
})

export class BillingsComponent implements AfterViewInit {
    public billings: Array<Billing>;

    //quais colunas serão exibidas (tem que estar declarada no html)
    displayedColumns = ['document', 'doc_date', 'ref_ini_date', 'ref_end_date', 'status', 'actions'];
    dataSource = new MatTableDataSource<Billing>();
  

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    public constructor(private billingService: BillingService){}

    public ngAfterViewInit(){
        this.listBillings();
    }

    public ngOnInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }


    public listBillings() {
        this.billingService.getAll()
        .subscribe(billings => {
            this.billings = billings.sort((a, b) => b.id - a.id);
            this.dataSource.data = this.billings;
        },
            error => alert("Ocorreu um erro ao listar. Erro: " + error ) 
        )

    }



    public formatStatus(status: string) {
        switch (status) {
            case 'P':
                return 'Pendente';
            case 'C':
                return 'Cancelado';
            case 'O':
                return 'Pago';
            default:
                return 'ERRO';
        }
    }
}

