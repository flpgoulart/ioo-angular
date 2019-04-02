import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Location } from "@angular/common";
import { FormUtils } from "../../shared/form.utils";
import { switchMap } from 'rxjs/operators';

import { Business } from "../shared/business.model";
import { BusinessService } from "../shared/business.service";


@Component({
    selector: 'business-detail',
    templateUrl: './business-detail.component.html',
    styles: [
        ".form-control-feedback{margin-right: 20px, margin-top: 10px}"
    ]
})

export class BusinessDetailComponent implements OnInit {
    public business: Business;
    
    public form: FormGroup;
    public formUtils: FormUtils;
    public businesses: Array<Business>;
    private sub: any;
    private id: number;
    private controle: boolean; // false insert, true update


    public constructor(
        private businessService: BusinessService,
        private location: Location,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) { 

        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            about_us: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            url_site: [null],
            url_facebook: [null],
            contact_info: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
        })

        this.formUtils = new FormUtils(this.form);
    }


    public ngOnInit(){

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; 
         });

        
        this.business = new Business(null,'','','','','');


        if (this.id > 0) {
            this.controle = true;
            this.route.paramMap.pipe(
                switchMap((params: ParamMap) => this.businessService.getById(+params.get('id')))
            )
            .subscribe(
                business => this.setBusiness(business),
                error => alert("Ocorreu um erro ao carregar. Erro: " + error)
            )
        } else {
            this.controle = false;
        }
    }


    public setBusiness(business: Business): void {
        this.business = business;
        
        this.form.patchValue(business);
    }


    public goBack() {
        this.location.back();
    }


    public submitBusiness(){
        //Busca os dados do formulario
        this.business.name           = this.form.get('name').value;
        this.business.about_us       = this.form.get('about_us').value;
        this.business.url_site       = this.form.get('url_site').value;
        this.business.url_facebook   = this.form.get('url_facebook').value;
        this.business.contact_info   = this.form.get('contact_info').value;

        // se for um update
        if (this.controle) {
    
            this.businessService.update(this.business)
            .subscribe(
                () => alert("Dados atualizados com sucesso!"),
                error => alert("Ocorreu um erro ao gravar. Erro: " + error)
            )
    
        } 
        // se for um insert
        else {
            this.business.name = this.business.name.trim();

            if (!this.business.name) {
                alert("O registro deve ter um nome!")
            } else {
                this.businessService.create(this.business)
                    .subscribe(
                        (business) => {
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