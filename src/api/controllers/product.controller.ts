// controllers/product.controller.ts
import { Request, Response } from 'express';
import ProductService from '../services/product.service';
import { CloudflareService } from '../../util/cloudflare';

class ProductController {
  private cloudflare: CloudflareService;
  constructor() {
    this.cloudflare = new CloudflareService();
    this.createProduct = this.createProduct.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.getProductsByCategory = this.getProductsByCategory.bind(this);
  }

  createProduct = async (req: Request, res: Response): Promise<void> => {
 
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const urls: { image?: string; pdf_url?: string } = {};

      if (files?.image && files.image[0]) {
        const imageUrl = await this.cloudflare.uploadFile('product',files.image[0]);
        urls.image = imageUrl;
      }

      const dadosProduct = req.body;
      const product = await ProductService.createProduct({ ...dadosProduct, ...urls });
      res.status(201).json(product);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
  };

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const {
        search,
        category,
        minPrice,
        maxPrice,
        inStock,
        sort,
        page,
        limit
      } = req.query;

      const products = await ProductService.getAllProducts({
        search: search as string,
        category: category as string,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
        inStock: inStock ? (inStock === 'true') : undefined,
        sort: sort as string,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined
      });

      res.status(200).json(products);
    } catch (error: unknown) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json(product);
    } catch (error: unknown) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const dadosAtualizados = req.body;

      const produtoExistente = await ProductService.getProductById(id);
      if (!produtoExistente) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      if (files?.image && files.image[0]) {
        if (produtoExistente.image) {
          const imageUrl = produtoExistente.image;
          const url = new URL(imageUrl);
          const keyToDelete = decodeURIComponent(url.pathname.slice(1)); // remove o `/` do início
          await this.cloudflare.deleteFile(keyToDelete);
        }

        // Faz upload da nova imagem e usa a URL pública direto
        const newImageUrl = await this.cloudflare.uploadFile('product',files.image[0]);
        dadosAtualizados.image = newImageUrl;
      }

      const produtoAtualizado = await ProductService.updateProduct(id, dadosAtualizados);
      res.status(200).json(produtoAtualizado);
    } catch (error: unknown) {
      console.error(error);
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {  const url_image= req.query.url_image as string;
      console.log(url_image);
      await this.cloudflare.deleteFile(url_image);
      const product = await ProductService.deleteProduct(req.params.id);

      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error: unknown) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
  }

  async getProductsByCategory(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductService.getProductsByCategory(req.params.category);
     
      res.status(200).json(products);
    } catch (error: unknown) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
  }
}

export default new ProductController();
