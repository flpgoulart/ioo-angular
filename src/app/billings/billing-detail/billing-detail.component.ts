import { Component, OnInit } from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

import { Location } from "@angular/common";
import { FormUtils } from "../../shared/form.utils";
import { switchMap } from 'rxjs/operators';

import { Billing } from "../shared/billing.model";
import { BillingService } from "../shared/billing.service";

@Component({
    selector: 'billing-detail',
    templateUrl: './billing-detail.component.html',
    styles: [
        ".form-control-feedback{margin-right: 20px, margin-top: 10px} select[readonly] {background: #eee; pointer-events: none; touch-action: none;}"
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ]
})

export class BillingDetailComponent implements OnInit {
    public billing: Billing;
    
    public form: FormGroup;
    public formUtils: FormUtils;


    public constructor(
        private billingService: BillingService,
        private location: Location,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) { 

        this.form = this.formBuilder.group({
            document: [null],
            doc_date: [null],
            ref_ini_date: [null],
            ref_end_date: [null],
            link_document: [null],
            status: [null]
        })

        this.formUtils = new FormUtils(this.form);
    }

    public ngOnInit(){

        this.billing = new Billing(null,'',null,null,null,'','');

        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.billingService.getById(+params.get('id')))
        )
        .subscribe(
            billing => this.setBilling(billing),
            error => alert("Ocorreu um erro ao carregar. Erro: " + error)
        )

    }


    public setBilling(billing: Billing): void {
        this.billing = billing;
        
        this.form.patchValue(billing);

    }


    public goBack() {
        this.location.back();
    }


    
}