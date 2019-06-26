import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { Campaign } from "./shared/campaign.model";
import { CampaignService } from "./shared/campaign.service";


@Component({
    selector: 'campaigns',
    styleUrls: ['./campaigns.component.css'],
    templateUrl: './campaigns.component.html'
})

export class CampaignsComponent implements AfterViewInit {
    public campaigns: Array<Campaign>;

    //quais colunas serão exibidas (tem que estar declarada no html)
    displayedColumns = ['name', 'start_date', 'end_date', 'status', 'actions'];
    dataSource = new MatTableDataSource<Campaign>();
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    public constructor(private campaignService: CampaignService, private changeDetectorRefs: ChangeDetectorRef){}

    public ngAfterViewInit(){
        this.listCampaigns();
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
    

    public listCampaigns() {
        this.campaignService.getAll()
        .subscribe(campaigns => {
            this.campaigns = campaigns.sort((a, b) => b.id - a.id);
            this.dataSource.data = this.campaigns;
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

}

