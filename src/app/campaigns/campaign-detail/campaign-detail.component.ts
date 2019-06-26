import { Component, OnInit } from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Location } from "@angular/common";
import { FormUtils } from "../../shared/form.utils";
import { switchMap } from 'rxjs/operators';

import { Campaign } from "../shared/campaign.model";
import { CampaignService } from "../shared/campaign.service";

import { StoreCampaign } from "../shared/store-campaign.model";
import { StoreCampaignService } from "../shared/store-campaign.service";

import { Store } from "../../stores/shared/store.model";
import { StoreService } from "../../stores/shared/store.service";

@Component({
    selector: 'campaign-detail',
    templateUrl: './campaign-detail.component.html',
    styles: [
        ".form-control-feedback{margin-right: 20px, margin-top: 10px}"
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ]
})

export class CampaignDetailComponent implements OnInit {
    public campaign: Campaign;
    public storeCampaign: StoreCampaign;
    
    public form: FormGroup;
    public formStoreCampaign: FormGroup;
    public formUtils: FormUtils;
    public formUtilsStoreCampaign: FormUtils;
    public stores: Array<Store>;
    public  storeCampaigns: Array<StoreCampaign>;
    private sub: any;
    private id: number;
    private controle: boolean; // false insert, true update


    public constructor(
        private campaignService: CampaignService,
        private storeCampaignService: StoreCampaignService,
        private storeService: StoreService,
        private location: Location,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private formBuilderStoreCampaign: FormBuilder
    ) { 
        // form Campaign
        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            disclaimer: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            start_date: [null, [Validators.required]],
            end_date: [null, [Validators.required]],
            status: [null, [Validators.required]]
        })

        this.formUtils = new FormUtils(this.form);

        //form StoreCampaign
        this.formStoreCampaign = this.formBuilderStoreCampaign.group({
            store_id: [null, [Validators.required]],
            campaign_id: [null],
            status: [null]
        })

        this.formUtilsStoreCampaign = new FormUtils(this.formStoreCampaign);
    }


    public ngOnInit(){

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; 
         });

        
        this.campaign = new Campaign(null,'','','','','');
        this.storeCampaign = new StoreCampaign(null,null,null,'','');


        if (this.id > 0) {
            this.controle = true;
            this.route.paramMap.pipe(
                switchMap((params: ParamMap) => this.campaignService.getById(+params.get('id')))
            )
            .subscribe(
                campaign => this.setCampaign(campaign),
                error => alert("Ocorreu um erro ao carregar. Erro: " + error)
            )

            // carregar as listas de StoreCampaign, já cadastradas
            this.storeCampaignService.searchByCampaign(this.id)
                .subscribe(
                    storeCampaigns => {
                        this.storeCampaigns = storeCampaigns.sort((a,b) => b.id - a.id);
                    },
                    error => alert("Erro ao buscar as lojas da campanha. Erro: " + error)
                )

        } else {
            this.controle = false;
        }


        
        this.storeService.getAll()
        .subscribe(
            stores => {
                this.stores = stores.sort((a, b) => b.id - a.id);
            },
            error => alert("Erro ao buscar as lojas. Erro: " + error)
        )

    }


    public setCampaign(campaign: Campaign): void {
        this.campaign = campaign;
        
        this.form.patchValue(campaign);
    }


    public goBack() {
        this.location.back();
    }


    public statusStoreCampaign(term: string) {
        if (term == "A") {
            return "Ativo"
        } else {
            return "Inativo"
        }
    }

    public submitStoreCampaign() {
        //Busca os dados do formulario
        this.storeCampaign.store_id = this.formStoreCampaign.get('store_id').value;
        this.storeCampaign.campaign_id = this.id;
        this.storeCampaign.status = "A";

        this.storeCampaignService.create(this.storeCampaign)
            .subscribe(
                (storeCampaign) => {
                    window.location.reload();
                    //this.storeCampaigns.unshift(storeCampaign);
                    //this.storeCampaign = new StoreCampaign(null,null,null,'','');
                    alert("Dados cadastrados com sucesso!");
                },
                error => alert("Ocorreu um erro ao gravar. Erro: " + error)
            )
    }


    public submitCampaign(){
        //Busca os dados do formulario
        this.campaign.name       = this.form.get('name').value;
        this.campaign.disclaimer = this.form.get('disclaimer').value;
        this.campaign.start_date = this.form.get('start_date').value;
        this.campaign.end_date   = this.form.get('end_date').value;
        this.campaign.status     = this.form.get('status').value;


        // se for um update
        if (this.controle) {
    
            this.campaignService.update(this.campaign)
            .subscribe(
                () => alert("Dados atualizados com sucesso!"),
                error => alert("Ocorreu um erro ao gravar. Erro: " + error)
            )
    
        } 
        // se for um insert
        else {
            this.campaign.name = this.campaign.name.trim();

            if (!this.campaign.name) {
                alert("O registro deve ter um nome!")
            } else {
                this.campaignService.create(this.campaign)
                    .subscribe(
                        (campaign) => {
                            alert("Dados cadastrados com sucesso!");
                            this.controle = true;
                            this.id = campaign.id;
                            this.location.go('/campaigns/' + campaign.id);
                        },
                        error => alert("Ocorreu um erro ao gravar. Erro: " + error)
                    )
            }
    
        }
    }


    public activeStore(storeCampaign: StoreCampaign) {

        storeCampaign.status = "A";

        this.storeCampaignService.update(storeCampaign)
        .subscribe(
            () => alert("Loja ativada com sucesso!"),
            error => alert("Ocorreu um erro ao gravar. Erro: " + error)
        )

    }

    public inactiveStore(storeCampaign: StoreCampaign) {

        storeCampaign.status = "I";

        this.storeCampaignService.update(storeCampaign)
        .subscribe(
            () => alert("Loja inativada com sucesso!"),
            error => alert("Ocorreu um erro ao gravar. Erro: " + error)
        )

    }

}