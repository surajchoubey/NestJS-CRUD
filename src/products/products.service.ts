import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from './product.model'

@Injectable()
export class ProductsService {
    products: Product[] = []

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString(); // new Date().toString()
        const newProduct = new Product(prodId, title, desc, price)
        this.products.push(newProduct)
        return prodId
    }

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0]
        return { ...product }
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productId)
        const updatedProduct = {...product};

        if (title) updatedProduct.title = title
        if (desc) updatedProduct.description = desc
        if (price) updatedProduct.price = price

        this.products[index] = updatedProduct

        return { ...updatedProduct }
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id == id)
        const product = this.products[productIndex]
        if(!product) throw new NotFoundException('Could not find product');
        return [product, productIndex]
    }

    deleteProduct(id: string) {
        const [product, index] = this.findProduct(id)
        this.products.splice(index, 1);
        /*
        const newProducts = this.products.filter(prod => prod.id != id)
        this.products = newProducts
        */
        return { message: 'Deletion Successful', ...product }
    }
}