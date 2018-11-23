import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from './product-category.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';

@Component({
    selector: 'jhi-product-category-update',
    templateUrl: './product-category-update.component.html'
})
export class ProductCategoryUpdateComponent implements OnInit {
    productCategory: IProductCategory;
    isSaving: boolean;

    products: IProduct[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private productCategoryService: ProductCategoryService,
        private productService: ProductService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productCategory }) => {
            this.productCategory = productCategory;
        });
        this.productService.query().subscribe(
            (res: HttpResponse<IProduct[]>) => {
                this.products = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.productCategoryService.update(this.productCategory));
        } else {
            this.subscribeToSaveResponse(this.productCategoryService.create(this.productCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProductCategory>>) {
        result.subscribe((res: HttpResponse<IProductCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProductById(index: number, item: IProduct) {
        return item.id;
    }
}
