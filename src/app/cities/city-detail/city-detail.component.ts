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
            {value: "AC", text: "Acre"},
            {value: "AL", text: "Alagoas"},
            {value: "AP", text: "Amapá"},
            {value: "AM", text: "Amazonas"},
            {value: "BA", text: "Bahia"},
            {value: "CE", text: "Ceará"},
            {value: "DF", text: "Distrito Federal"},
            {value: "ES", text: "Espírito Santo"},
            {value: "GO", text: "Goiás"},
            {value: "MA", text: "Maranhão"},
            {value: "MT", text: "Mato Grosso"},
            {value: "MS", text: "Mato Grosso do Sul"},
            {value: "MG", text: "Minas Gerais"},
            {value: "PA", text: "Pará"},
            {value: "PB", text: "Paraíba"},
            {value: "PR", text: "Paraná"},
            {value: "PE", text: "Pernambuco"},
            {value: "PI", text: "Piauí"},
            {value: "RJ", text: "Rio de Janeiro"},
            {value: "RN", text: "Rio Grande do Norte"},
            {value: "RS", text: "Rio Grande do Sul"},
            {value: "RO", text: "Rondônia"},
            {value: "RR", text: "Roraima"},
            {value: "SC", text: "Santa Catarina"},
            {value: "SP", text: "São Paulo"},
            {value: "SE", text: "Sergipe"},
            {value: "TO", text: "Tocantins"}           
        ]

        if (this.id > 0) {
            this.controle = true;
            this.route.paramMap.pipe(
                switchMap((params: ParamMap) => this.cityService.getById(+params.get('id')))
            )
            .subscribe(
                city => this.setCity(city),
                error => alert("Ocorreu um erro ao carregar. Erro: " + error)
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
                () => alert("Dados atualizados com sucesso!"),
                error => alert("Ocorreu um erro ao gravar. Erro: " + error)
            )
    
        } 
        // se for um insert
        else {
            this.city.name = this.city.name.trim();

            if (!this.city.name) {
                alert("O registro deve ter um nome!")
            } else {
                this.cityService.create(this.city)
                    .subscribe(
                        (city) => {
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