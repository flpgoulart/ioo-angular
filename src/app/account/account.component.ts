import { Component, OnInit } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { FormUtils } from "../shared/form.utils";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from 'rxjs/operators';

import { BusinessAccount } from "./shared/business-account.model";
import { BusinessAccountService } from "./shared/business-account.service";


@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styles: [
        ".form-control-feedback{margin-right: 20px, margin-top: 10px} select[readonly] {background: #eee; pointer-events: none; touch-action: none;}"
    ]
})

export class AccountComponent implements OnInit {
    public account: BusinessAccount;
    public form: FormGroup;
    public formUtils: FormUtils;
    public ufOptions: Array<any>;
    public sub: any;
    public id: number;
    private controle: boolean; // false insert, true update

    public constructor(
        private accountService: BusinessAccountService,
        private location: Location,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ){
        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            email: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            cep: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
            city_name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            uf: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            address_name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            ddd_phone: [null,[Validators.minLength(1), Validators.maxLength(2)]],
            phone: [null,[Validators.minLength(8), Validators.maxLength(12)]], 
            ddd_mobile: [null,[Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
            mobile: [null,[Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
            cnpj: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(18)]],
            insce: [null, []],
            inscm: [null,[]],
            status: [null,[]]
        })

        this.formUtils = new FormUtils(this.form);

    }

    public ngOnInit(){

        this.account = new BusinessAccount(null,'','','','','','','','','',null,null,null,null,'','');

        this.controle = false ;

        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.accountService.getAll())
        )
        .subscribe(
            account => this.setAccount(account),
            error => alert("Ocorreu um erro ao carregar. Erro: " + error)
        )


        this.ufOptions = [
            {value: "AC", text: "AC"},
            {value: "AL", text: "AL"},
            {value: "AP", text: "AP"},
            {value: "AM", text: "AM"},
            {value: "BA", text: "BA"},
            {value: "CE", text: "CE"},
            {value: "DF", text: "DF"},
            {value: "ES", text: "ES"},
            {value: "GO", text: "GO"},
            {value: "MA", text: "MA"},
            {value: "MT", text: "MT"},
            {value: "MS", text: "MS"},
            {value: "MG", text: "MG"},
            {value: "PA", text: "PA"},
            {value: "PB", text: "PB"},
            {value: "PR", text: "PR"},
            {value: "PE", text: "PE"},
            {value: "PI", text: "PI"},
            {value: "RJ", text: "RJ"},
            {value: "RN", text: "RN"},
            {value: "RS", text: "RS"},
            {value: "RO", text: "RO"},
            {value: "RR", text: "RR"},
            {value: "SC", text: "SC"},
            {value: "SP", text: "SP"},
            {value: "SE", text: "SE"},
            {value: "TO", text: "TO"}           
        ]

       
    }


    public setAccount(account: BusinessAccount): void {
        this.account = account;

        // Para tratar as condições de nova conta
        if (!this.account.name) {
            this.controle = false;
        } else {
            this.controle = true;
        }
        
        this.form.patchValue(account);
    }


    public goBack() {
        this.location.back();
    }


    public submitAccount(){
        //Busca os dados do formulario
        this.account.name = this.form.get('name').value;
        this.account.email = this.form.get('email').value;
        this.account.cep = this.form.get('cep').value;
        this.account.city_name = this.form.get('city_name').value;
        this.account.uf = this.form.get('uf').value;
        this.account.address_name = this.form.get('address_name').value;
        this.account.ddd_phone = this.form.get('ddd_phone').value;
        this.account.phone = this.form.get('phone').value;
        this.account.ddd_mobile = this.form.get('ddd_mobile').value;
        this.account.mobile = this.form.get('mobile').value;
        this.account.cnpj = this.form.get('cnpj').value;
        this.account.insce = this.form.get('insce').value;
        this.account.inscm = this.form.get('inscm').value;

        // se for um update
        if (this.controle) {
    
            this.accountService.update(this.account)
            .subscribe(
                () => alert("Dados atualizados com sucesso!"),
                error => alert("Ocorreu um erro ao gravar. Erro: " + error)
            )
    
        } 
        // se for um insert
        else {
            this.account.name = this.account.name.trim();

            if (!this.account.name) {
                alert("O registro deve ter um nome!")
            } else {
                this.accountService.create(this.account)
                    .subscribe(
                        (account) => {
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

