import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Location } from "@angular/common";
import { FormUtils } from "../../shared/form.utils";
import { switchMap } from 'rxjs/operators';

import { Product } from "../shared/product.model";
import { ProductService } from "../shared/product.service";

import { Subcategory } from '../../subcategories/shared/subcategory.model';
import { SubcategoryService } from "../../subcategories/shared/subcategory.service"
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from "../../categories/shared/category.service"

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    styles: [
        ".form-control-feedback{margin-right: 20px, margin-top: 10px}"
    ]
})

export class ProductDetailComponent implements OnInit {
    public subcategory: Subcategory;
    public category: Category;
    public product: Product;
    
    public form: FormGroup;
    public formUtils: FormUtils;
    public categories: Array<Category>;
    public subcategories: Array<Subcategory>;
    public products: Array<Product>;
    private sub: any;
    private id: number;
    private controle: boolean; // false insert, true update


    public constructor(
        private subcategoryService: SubcategoryService,
        private categoryService: CategoryService,
        private productService: ProductService,
        private location: Location,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) { 

        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            keywords: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            category_id: [null],
            subcategory_id: [null, [Validators.required]],
            logo_default: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
            subcategory_name: [null]
        })

        this.formUtils = new FormUtils(this.form);
    }


    public ngOnInit(){

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; 
         });

        
        this.product = new Product(null,'','',null,'','');


        this.categoryService.getAll()
            .subscribe(
                categories => this.categories = categories.sort((a, b) => b.id - a.id),
                error => alert("Erro ao buscar as categorias. Erro: " + error)
            )

        if (this.id > 0) {
            this.controle = true;
            this.route.paramMap.pipe(
                switchMap((params: ParamMap) => this.productService.getById(+params.get('id')))
            )
            .subscribe(
                product => this.setProduct(product),
                error => alert("Ocorreu um erro ao carregar. Erro: " + error)
            )
        } else {
            this.controle = false;
        }
    }


    public setProduct(product: Product): void {
        this.product = product;
        
        this.form.patchValue(product);
    }


    public goBack() {
        this.location.back();
    }


    public listSubcategories(category_id: number) {
        this.subcategoryService.searchByCategory(category_id)
            .subscribe(
                subcategories => this.subcategories = subcategories.sort((a,b) => b.id - a.id),
                error => alert("Erro ao buscar as subcategorias. Erro " + error)
            )

    }

    public submitProduct(){
        //Busca os dados do formulario
        this.product.name           = this.form.get('name').value;
        this.product.keywords       = this.form.get('keywords').value;
        this.product.subcategory_id = this.form.get('subcategory_id').value;
        this.product.logo_default   = this.form.get('logo_default').value;

        // se for um update
        if (this.controle) {
    
            this.productService.update(this.product)
            .subscribe(
                () => alert("Dados atualizados com sucesso!"),
                error => alert("Ocorreu um erro ao gravar. Erro: " + error)
            )
    
        } 
        // se for um insert
        else {
            this.product.name = this.product.name.trim();

            if (!this.product.name) {
                alert("O registro deve ter um nome!")
            } else {
                this.productService.create(this.product)
                    .subscribe(
                        (product) => {
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