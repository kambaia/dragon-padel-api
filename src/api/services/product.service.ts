// services/product.service.ts

import { FilterQuery } from "mongoose";
import { IProduct, ProductQueryParams } from "../../interfaces/generoInterface";
import { Product } from "../model/Product";

class ProductService {
  async createProduct(productData: IProduct): Promise<IProduct> {
    try {
      const product = new Product(productData);
      return await product.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error creating product: ${error.message}`);
      }
      throw new Error('An unknown error occurred while creating the product');
    }
  }

  async getAllProducts(params: ProductQueryParams = {}): Promise<{
    products: IProduct[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;
  }> {

    try {
      const {
        search = '',
        category,
        minPrice,
        maxPrice,
        inStock,
        sort = '-created_at',
        page = 1,
        limit = 10
      } = params;

      const filterQuery: FilterQuery<IProduct> = {};

      // Text search across multiple fields
      if (search) {
        filterQuery.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
        ];
      }

      // Category filter
      if (category) {
        filterQuery.category = category;
      }

      // Price range filter
      if (minPrice !== undefined && maxPrice !== undefined) {
        filterQuery.price = { 
          $gte: minPrice, 
          $lte: maxPrice 
        };
      } else if (minPrice !== undefined) {
        filterQuery.price = { $gte: minPrice };
      } else if (maxPrice !== undefined) {
        filterQuery.price = { $lte: maxPrice };
      }

      // In stock filter
      if (inStock !== undefined) {
        filterQuery.stock = inStock ? { $gt: 0 } : { $eq: 0 };
      }

      // Pagination
      const skipDocuments = (page - 1) * limit;

      // Execute query
      const products = await Product.find(filterQuery)
        .sort(sort)
        .skip(skipDocuments)
        .limit(limit);

      // Count total matching documents
      const totalProducts = await Product.countDocuments(filterQuery);

      // Calculate total pages
      const totalPages = Math.ceil(totalProducts / limit);

      return {
        products,
        totalProducts,
        totalPages,
        currentPage: page
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching products: ${error.message}`);
      }
      throw new Error('An unknown error occurred while fetching products');
    }
  }

  async getFilteredProducts(params: ProductQueryParams) {
    return this.getAllProducts(params);
  }

  // Get product by ID
  async getProductById(id: string): Promise<IProduct | null> {
    try {
      return await Product.findById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching product: ${error.message}`);
      }
      throw new Error('An unknown error occurred while fetching the product');
    }
  }

  // Update product
  async updateProduct(id: string, productData: Partial<IProduct>): Promise<IProduct | null> {
    try {
      return await Product.findByIdAndUpdate(id, productData, { new: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error updating product: ${error.message}`);
      }
      throw new Error('An unknown error occurred while updating the product');
    }
  }

  // Delete product
  async deleteProduct(id: string): Promise<IProduct | null> {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error deleting product: ${error.message}`);
      }
      throw new Error('An unknown error occurred while deleting the product');
    }
  }

  // Get products by category
  async getProductsByCategory(category: string): Promise<IProduct[]> {
    try {
      return await Product.find({ category });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching products by category: ${error.message}`);
      }
      throw new Error('An unknown error occurred while fetching products by category');
    }
  }
}

export default new ProductService();