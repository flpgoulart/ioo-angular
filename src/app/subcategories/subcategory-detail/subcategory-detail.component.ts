import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Location } from "@angular/common";
import { FormUtils } from "../../shared/form.utils";
import { switchMap } from 'rxjs/operators';

import { Subcategory } from "../shared/subcategory.model";
import { SubcategoryService } from "../shared/subcategory.service";
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from "../../categories/shared/category.service"

@Component({
    selector: 'subcategory-detail',
    templateUrl: './subcategory-detail.component.html',
    styles: [
        ".form-control-feedback{margin-right: 20px, margin-top: 10px}"
    ]
})

export class SubcategoryDetailComponent implements OnInit {
    public subcategory: Subcategory;
    public form: FormGroup;
    public formUtils: FormUtils;
    public categories: Array<Category>;
    private sub: any;
    private id: number;
    private controle: boolean; // false insert, true update


    public constructor(
        private subcategoryService: SubcategoryService,
        private categoryService: CategoryService,
        private location: Location,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) { 

        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            description: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            category_id: [null, [Validators.required]],
            market_session: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            logo: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
        })

        this.formUtils = new FormUtils(this.form);
    }


    public ngOnInit(){

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; 
         });

        
        this.subcategory = new Subcategory(null,'','',null,'','','');


        this.categoryService.getAll()
            .subscribe(
                categories => this.categories = categories.sort((a, b) => b.id - a.id),
                error => alert("Erro ao buscar as categorias. Erro: " + error)
            )


        if (this.id > 0) {
            this.controle = true;
            this.route.paramMap.pipe(
                switchMap((params: ParamMap) => this.subcategoryService.getById(+params.get('id')))
            )
            .subscribe(
                subcategory => this.setSubcategory(subcategory),
                error => alert("Ocorreu um erro ao carregar. Erro: " + error)
            )
        } else {
            this.controle = false;
        }
    }


    public setSubcategory(subcategory: Subcategory): void {
        this.subcategory = subcategory;

        this.form.patchValue(subcategory);
    }


    public goBack() {
        this.location.back();
    }


    public submitSubcategory(){
        //Busca os dados do formulario
        this.subcategory.name           = this.form.get('name').value;
        this.subcategory.description    = this.form.get('description').value;
        this.subcategory.category_id    = this.form.get('category_id').value;
        this.subcategory.market_session = this.form.get('market_session').value;
        this.subcategory.logo           = this.form.get('logo').value;

        // se for um update
        if (this.controle) {
    
            this.subcategoryService.update(this.subcategory)
            .subscribe(
                () => alert("Dados atualizados com sucesso!"),
                error => alert("Ocorreu um erro ao gravar. Erro: " + error)
            )
    
        } 
        // se for um insert
        else {
            this.subcategory.name = this.subcategory.name.trim();

            if (!this.subcategory.name) {
                alert("O registro deve ter um nome!")
            } else {
                this.subcategoryService.create(this.subcategory)
                    .subscribe(
                        (subcategory) => {
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