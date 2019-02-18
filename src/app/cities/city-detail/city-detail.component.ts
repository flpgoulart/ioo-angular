import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Location } from "@angular/common";
import { FormUtils } from "../../shared/form.utils";
import { City } from '../shared/city.model';
import { CityService } from "../shared/city.service";
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'city-detail',
    templateUrl: './city-detail.component.html',
    styles: [
        ".form-control-feedback{margin-right: 20px, margin-top: 10px}"
    ]
})

export class CityDetailComponent implements OnInit {
    public city: City;
    public form: FormGroup;
    public formUtils: FormUtils;
    public ufOptions: Array<any>;
    private sub: any;
    private id: number;
    private controle: boolean; // false insert, true update


    public constructor(
        private cityService: CityService,
        private location: Location,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) { 

        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            cep_begin: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
            cep_end: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
            uf: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
        })

        this.formUtils = new FormUtils(this.form);
    }


    public ngOnInit(){

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; 
         });

        
        this.city = new City(null, '', null, null, '');

        this.ufOptions = [
            {value: "SP", text: "São Paulo"},
            {value: "RJ", text: "Rio de Janeiro"},
            {value: "PR", text: "Paraná"},
            {value: "SC", text: "Santa Catarina"},
            {value: "RS", text: "Rio Grande do Sul"},
        ]

        if (this.id > 0) {
            this.controle = true;
            this.route.paramMap.pipe(
                switchMap((params: ParamMap) => this.cityService.getById(+params.get('id')))
            )
            .subscribe(
                city => this.setCity(city),
                error => alert("Ocorreu um erro no servidor, tente mais tarde!")
            )
        } else {
            this.controle = false;
        }
    }


    public setCity(city: City): void {
        this.city = city;

        this.form.patchValue(city);
    }


    public goBack() {
        this.location.back();
    }


    public submitCity(){
        //Busca os dados do formulario
        this.city.name      = this.form.get('name').value;
        this.city.cep_begin = this.form.get('cep_begin').value;
        this.city.cep_end   = this.form.get('cep_end').value;
        this.city.uf        = this.form.get('uf').value;

        // se for um update
        if (this.controle) {
    
            this.cityService.update(this.city)
            .subscribe(
                () => alert("Cidade atualizada com sucesso!"),
                () => alert("Ocorreu um erro no servidor, tente mais tarde!")
            )
    
        } 
        // se for um insert
        else {
            this.city.name = this.city.name.trim();

            if (!this.city.name) {
                alert("A Cidade deve ter um nome!")
            } else {
                this.cityService.create(this.city)
                    .subscribe(
                        (city) => {
                            alert("Cidade cadastrada com sucesso!");
                            this.controle = true;
                            this.location.back();
                        },
                        () => alert("Ocorreu um erro no servidor, tente mais tarde.")
                    )
            }
    
        }
    }

    
}