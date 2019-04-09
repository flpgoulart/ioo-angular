import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Location } from "@angular/common";
import { FormUtils } from "../../shared/form.utils";
import { switchMap } from 'rxjs/operators';

import { Store } from "../shared/store.model";
import { StoreService } from "../shared/store.service";

import { StoreType } from "../../store-types/shared/store-type.model";
import { StoreTypeService } from "../../store-types/shared/store-type.service";
import { City } from "../../cities/shared/city.model";
import { CityService } from "../../cities/shared/city.service";
import { Business } from "../../businesses/shared/business.model";
import { BusinessService } from "../../businesses/shared/business.service";


@Component({
    selector: 'store-detail',
    templateUrl: './store-detail.component.html',
    styles: [
        ".form-control-feedback{margin-right: 20px, margin-top: 10px}"
    ]
})

export class StoreDetailComponent implements OnInit {
    public store_type: StoreType;
    public store_types: Array<StoreType>;
    public city: City;
    public cities: Array<City>;
    public business: Business;
    public businesses: Array<Business>;
    public store: Store;
    public stores: Array<Store>;
    public ufOptions: Array<any>;

    public form: FormGroup;
    public formUtils: FormUtils;
    private sub: any;
    private id: number;
    private controle: boolean; // false insert, true update


    public constructor(
        private storeTypeService: StoreTypeService,
        private cityService: CityService,
        private businessService: BusinessService,
        private storeService: StoreService,
        private location: Location,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) { 


        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            store_type_id: [null, [Validators.required]],
            business_id: [null, [Validators.required]],
            city_id: [null, [Validators.required]],
            cep: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
            address_name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            contact_info: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            status: [null, [Validators.required]],
            store_type_name: [null],
            business_name: [null],
            city_name: [null],
            uf: [null]
        })

        this.formUtils = new FormUtils(this.form);
    }



    public ngOnInit(){

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; 
         });

        
        this.store = new Store(null,'',null,null,null,'','','','');

        if (this.id > 0) {
            this.controle = true;
            this.route.paramMap.pipe(
                switchMap((params: ParamMap) => this.storeService.getById(+params.get('id')))
            )
            .subscribe(
                store => this.setStore(store),
                error => alert("Ocorreu um erro ao carregar. Erro: " + error)
            )
        } else {

            this.storeTypeService.getAll()
                .subscribe(
                    store_types => this.store_types = store_types.sort((a, b) => b.id - a.id),
                    error => alert("Erro ao buscar os tipos de lojas. Erro: " + error)
                )

            this.businessService.getAll()
                .subscribe(
                    businesses => this.businesses = businesses.sort((a, b) => b.id - a.id),
                    error => alert("Erro ao buscar as empresas. Erro: " + error)
                )

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
    

            this.controle = false;
        }
    }


    public setStore(store: Store): void {
        this.store = store;
        
        this.form.patchValue(store);
    }


    public goBack() {
        this.location.back();
    }

    public listCities(uf: string) {
        this.cityService.searchByUf(uf)
            .subscribe(
                cities => this.cities = cities.sort((a,b) => b.id - a.id),
                error => alert("Erro ao buscar as cidades. Erro " + error)
            )

    }

    public submitStore(){
        //Busca os dados do formulario
        this.store.name             = this.form.get('name').value;
        this.store.store_type_id    = this.form.get('store_type_id').value;
        this.store.business_id    = this.form.get('business_id').value;
        this.store.city_id    = this.form.get('city_id').value;
        this.store.cep    = this.form.get('cep').value;
        this.store.address_name    = this.form.get('address_name').value;
        this.store.contact_info    = this.form.get('contact_info').value;
        this.store.status    = this.form.get('status').value;

        // se for um update
        if (this.controle) {
    
            this.storeService.update(this.store)
            .subscribe(
                () => alert("Dados atualizados com sucesso!"),
                error => alert("Ocorreu um erro ao gravar. Erro: " + error)
            )
    
        } 
        // se for um insert
        else {
            this.store.name = this.store.name.trim();

            if (!this.store.name) {
                alert("O registro deve ter um nome!")
            } else {
                this.storeService.create(this.store)
                    .subscribe(
                        (store) => {
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