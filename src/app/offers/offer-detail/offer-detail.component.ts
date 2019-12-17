import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Location } from "@angular/common";
import { FormUtils } from "../../shared/form.utils";
import { switchMap } from 'rxjs/operators';

import { Offer } from "../shared/offer.model";
import { OfferService } from "../shared/offer.service";


import { Product } from "../../products/shared/product.model";
import { ProductService } from "../../products/shared/product.service";
import { Campaign } from "../../campaigns/shared/campaign.model";
import { CampaignService } from "../../campaigns/shared/campaign.service";
import { UnitMeasure } from "../../unit-measures/shared/unit-measure.model";
import { UnitMeasureService } from "../../unit-measures/shared/unit-measure.service";

@Component({
    selector: 'offer-detail',
    templateUrl: './offer-detail.component.html',
    styles: [
        ".form-control-feedback{margin-right: 20px, margin-top: 10px}"
    ]
})

export class OfferDetailComponent implements OnInit {
    public product: Product;
    public campaign: Campaign;
    public unitMeasure: UnitMeasure;
    public offer: Offer;
    
    public form: FormGroup;
    public formUtils: FormUtils;
    public products: Array<Product>;
    public campaigns: Array<Campaign>;
    public unitMeasures: Array<UnitMeasure>;

    private sub: any;
    private id: number;
    private controle: boolean; // false insert, true update


    public constructor(
        private productService: ProductService,
        private campaignService: CampaignService,
        private unitMeasureService: UnitMeasureService,
        private offerService: OfferService,
        private location: Location,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) { 

        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            brand_name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            product_id: [null, [Validators.required]],
            campaign_id: [null, [Validators.required]],
            disclaimer: [null],
            status: [null, [Validators.required]],
            unit_measure_id: [null, [Validators.required]],
            product_value: [null, [Validators.required]],
            offer_value: [null, [Validators.required]],
            campaign_name: [null]
        })

        this.formUtils = new FormUtils(this.form);
    }


    public ngOnInit(){

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; 
         });

        
        this.offer = new Offer(null,'','',null,null,'','',null,null,null);


        this.campaignService.getAllActive()
            .subscribe(
                campaigns => this.campaigns = campaigns.sort((a, b) => b.id - a.id),
                error => alert("Erro ao buscar as campanhas. Erro: " + error)
            )

        this.unitMeasureService.getAll()
            .subscribe(
                unitMeasures => this.unitMeasures = unitMeasures.sort((a, b) => b.id - a.id),
                error => alert("Erro ao buscar as unidades de medida. Erro: " + error)
            )

        this.productService.getAll()
            .subscribe(
                products => this.products = products.sort((a, b) => b.id - a.id),
                error => alert("Erro ao buscar os produtos. Erro: " + error)
            )


        if (this.id > 0) {
            this.controle = true;
            this.route.paramMap.pipe(
                switchMap((params: ParamMap) => this.offerService.getById(+params.get('id')))
            )
            .subscribe(
                offer => this.setOffer(offer),
                error => alert("Ocorreu um erro ao carregar. Erro: " + error)
            )
        } else {
            this.controle = false;
        }
    }


    public setOffer(offer: Offer): void {
        this.offer = offer;
        
        this.form.patchValue(offer);
    }


    public goBack() {
        this.location.back();
    }


    public submitOffer(){
        //Busca os dados do formulario
        this.offer.name            = this.form.get('name').value;
        this.offer.brand_name      = this.form.get('brand_name').value;
        this.offer.product_id      = this.form.get('product_id').value;
        this.offer.campaign_id     = this.form.get('campaign_id').value;
        this.offer.disclaimer      = this.form.get('disclaimer').value;
        this.offer.status          = this.form.get('status').value;
        this.offer.unit_measure_id = this.form.get('unit_measure_id').value;
        this.offer.product_value   = this.form.get('product_value').value;
        this.offer.offer_value     = this.form.get('offer_value').value;


        // se for um update
        if (this.controle) {
    
            this.offerService.update(this.offer)
            .subscribe(
                () => alert("Dados atualizados com sucesso!"),
                error => alert("Ocorreu um erro ao gravar. Erro: " + error)
            )
    
        } 
        // se for um insert
        else {
            this.offer.name = this.offer.name.trim();

            if (!this.offer.name) {
                alert("O registro deve ter um nome!")
            } else {
                this.offerService.create(this.offer)
                    .subscribe(
                        (offer) => {
                            alert("Dados cadastrados com sucesso!");
                            this.controle = true;
                            this.location.back();
                        },
                        error => alert("Ocorreu um erro ao gravar. Erro: " + error)
                    )
            }
    
        }
    }

    
}