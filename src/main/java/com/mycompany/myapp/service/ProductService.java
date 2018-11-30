package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.domain.ProductCategory;
import com.mycompany.myapp.repository.ProductRepository;
import com.mycompany.myapp.web.rest.ProductCategoryResource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Product.
 */
@Service
@Transactional
public class ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductService.class);

    private ProductRepository productRepository;

    private ProductCategoryResource productCategoryResource;

    private ProductCategory productCategory;

    private long setId ;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Save a product.
     *
     * @param product the entity to save
     * @return the persisted entity
     * @throws URISyntaxException
     */
    public Product save(Product product) throws URISyntaxException {
        boolean flag = true;
        List<ProductCategory> liftCategories = productCategoryResource.getAllProductCategories();
        for (ProductCategory var : liftCategories) {
            if(var.getName() == product.getCategory()){
                flag= false;
                break;
            }
            setId = var.getId();
        }
        if (flag){
            productCategory.setName(product.getCategory());
            productCategory.setProduct(product);
            productCategory.setId(setId+1);
            productCategoryResource.createProductCategory(productCategory);
        }
        log.debug("Request to save Product : {}", product);
        return productRepository.save(product);
    }

    /**
     * Get all the products.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Product> findAll(Pageable pageable) {
        log.debug("Request to get all Products");
        return productRepository.findAll(pageable);
    }


    /**
     * Get one product by setId.
     *
     * @param setId the setId of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Product> findOne(Long setId) {
        log.debug("Request to get Product : {}", setId);
        return productRepository.findById(setId);
    }

    /**
     * Delete the product by setId.
     *
     * @param setId the setId of the entity
     */
    public void delete(Long setId) {
        log.debug("Request to delete Product : {}", setId);
        productRepository.deleteById(setId);
    }
}
