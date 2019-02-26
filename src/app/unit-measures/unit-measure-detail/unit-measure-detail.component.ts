import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Location } from "@angular/common";
import { FormUtils } from "../../shared/form.utils";
import { switchMap } from 'rxjs/operators';

import { UnitMeasure } from "../shared/unit-measure.model";
import { UnitMeasureService } from "../shared/unit-measure.service";

@Component({
    selector: 'unit-measure-detail',
    templateUrl: './unit-measure-detail.component.html',
    styles: [
        ".form-control-feedback{margin-right: 20px, margin-top: 10px}"
    ]
})

export class UnitMeasureDetailComponent implements OnInit {
    public unit_measure: UnitMeasure;
    public form: FormGroup;
    public formUtils: FormUtils;
    public ufOptions: Array<any>;
    private sub: any;
    private id: number;
    private controle: boolean; // false insert, true update


    public constructor(
        private unitMeasureService: UnitMeasureService,
        private location: Location,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) { 

        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
        })

        this.formUtils = new FormUtils(this.form);
    }


    public ngOnInit(){

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; 
         });

        
        this.unit_measure = new UnitMeasure(null,'');

        if (this.id > 0) {
            this.controle = true;
            this.route.paramMap.pipe(
                switchMap((params: ParamMap) => this.unitMeasureService.getById(+params.get('id')))
            )
            .subscribe(
                unit_measure => this.setUnitMeasure(unit_measure),
                error => alert("Ocorreu um erro ao carregar. Erro: " + error)
            )
        } else {
            this.controle = false;
        }
    }


    public setUnitMeasure(unit_measure: UnitMeasure): void {
        this.unit_measure = unit_measure;

        this.form.patchValue(unit_measure);
    }


    public goBack() {
        this.location.back();
    }


    public submitUnitMeasure(){
        //Busca os dados do formulario
        this.unit_measure.name = this.form.get('name').value;

        // se for um update
        if (this.controle) {
    
            this.unitMeasureService.update(this.unit_measure)
            .subscribe(
                () => alert("Dados atualizados com sucesso!"),
                error => alert("Ocorreu um erro ao gravar. Erro: " + error)
            )
    
        } 
        // se for um insert
        else {
            this.unit_measure.name = this.unit_measure.name.trim();

            if (!this.unit_measure.name) {
                alert("O registro deve ter um nome!")
            } else {
                this.unitMeasureService.create(this.unit_measure)
                    .subscribe(
                        (unit_measure) => {
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