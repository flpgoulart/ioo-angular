import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Location } from "@angular/common";
import { FormUtils } from "../../shared/form.utils";
import { switchMap } from 'rxjs/operators';

import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";

@Component({
    selector: 'category-detail',
    templateUrl: './category-detail.component.html',
    styles: [
        ".form-control-feedback{margin-right: 20px, margin-top: 10px}"
    ]
})

export class CategoryDetailComponent implements OnInit {
    public category: Category;
    public form: FormGroup;
    public formUtils: FormUtils;
    private sub: any;
    private id: number;
    private controle: boolean; // false insert, true update


    public constructor(
        private categoryService: CategoryService,
        private location: Location,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) { 

        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            description: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            logo: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
        })

        this.formUtils = new FormUtils(this.form);
    }


    public ngOnInit(){

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; 
         });

        
        this.category = new Category(null,'','','');


        if (this.id > 0) {
            this.controle = true;
            this.route.paramMap.pipe(
                switchMap((params: ParamMap) => this.categoryService.getById(+params.get('id')))
            )
            .subscribe(
                category => this.setCategory(category),
                error => alert("Ocorreu um erro ao carregar. Erro: " + error)
            )
        } else {
            this.controle = false;
        }
    }


    public setCategory(category: Category): void {
        this.category = category;

        this.form.patchValue(category);
    }


    public goBack() {
        this.location.back();
    }


    public submitCategory(){
        //Busca os dados do formulario
        this.category.name      = this.form.get('name').value;
        this.category.description = this.form.get('description').value;
        this.category.logo   = this.form.get('logo').value;

        // se for um update
        if (this.controle) {
    
            this.categoryService.update(this.category)
            .subscribe(
                () => alert("Dados atualizados com sucesso!"),
                error => alert("Ocorreu um erro ao gravar. Erro: " + error)
            )
    
        } 
        // se for um insert
        else {
            this.category.name = this.category.name.trim();

            if (!this.category.name) {
                alert("O registro deve ter um nome!")
            } else {
                this.categoryService.create(this.category)
                    .subscribe(
                        (category) => {
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