import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Location } from "@angular/common";
import { FormUtils } from "../../shared/form.utils";
import { switchMap } from 'rxjs/operators';

import { StoreType } from "../shared/store-type.model";
import { StoreTypeService } from "../shared/store-type.service";

@Component({
    selector: 'store-type-detail',
    templateUrl: './store-type-detail.component.html',
    styles: [
        ".form-control-feedback{margin-right: 20px, margin-top: 10px}"
    ]
})

export class StoreTypeDetailComponent implements OnInit {
    public store_type: StoreType;
    public form: FormGroup;
    public formUtils: FormUtils;
    private sub: any;
    private id: number;
    private controle: boolean; // false insert, true update


    public constructor(
        private storeTypeService: StoreTypeService,
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

        
        this.store_type = new StoreType(null,'');

        if (this.id > 0) {
            this.controle = true;
            this.route.paramMap.pipe(
                switchMap((params: ParamMap) => this.storeTypeService.getById(+params.get('id')))
            )
            .subscribe(
                store_type => this.setStoreType(store_type),
                error => alert("Ocorreu um erro ao carregar. Erro: " + error)
            )
        } else {
            this.controle = false;
        }
    }


    public setStoreType(store_type: StoreType): void {
        this.store_type = store_type;

        this.form.patchValue(store_type);
    }


    public goBack() {
        this.location.back();
    }


    public submitStoreType(){
        //Busca os dados do formulario
        this.store_type.name = this.form.get('name').value;

        // se for um update
        if (this.controle) {
    
            this.storeTypeService.update(this.store_type)
            .subscribe(
                () => alert("Dados atualizados com sucesso!"),
                error => alert("Ocorreu um erro ao gravar. Erro: " + error)
            )
    
        } 
        // se for um insert
        else {
            this.store_type.name = this.store_type.name.trim();

            if (!this.store_type.name) {
                alert("O registro deve ter um nome!")
            } else {
                this.storeTypeService.create(this.store_type)
                    .subscribe(
                        (store_type) => {
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