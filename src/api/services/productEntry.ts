
import { handleMongoError } from '../../util/errors/api-error';
import { ISearch } from '../../interfaces/app/search';
import { IProduct, IProductEntry } from '../../interfaces/ProdutosInterface';
import { ProductEntry } from '../model/ProductEntry';


export default class ProductEntryService {
    
  public static async findAllProductStock({ limit, page }: ISearch) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await ProductEntry.find({})
          .limit(Number(limit))
          .skip(Number(page))
          .populate('registerby', 'profile firstName surname')
          .populate({
            path: 'product.productId',
            select: 'serialNumber productCover cover_url model brand condition technicalDescription active technicalDescription isAvailable',
            populate: {
              path: 'category',
              select: '-_id categoryName', // Seleciona apenas o campo 'name' do departamento
            },
          })
          .sort({ createdAt: -1 });
          
       
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async findOneProductStock(userId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = (await ProductEntry.findById(userId)
        .populate('registerby', 'profile firstName surname')
        .populate({
          path: 'product',
          select: 'serialNumber productCover cover_url model brand condition technicalDescription',
          populate: {
            path: 'category',
            select: '-_id categoryName', // Seleciona apenas o campo 'name' do departamento
          },
        })) as IProductEntry;

        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async verifyProduct(documentNumber: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = (await ProductEntry.findOne({
          documentNumber: documentNumber,
        }).populate('category', '_id  categoryName')) as IProduct;
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }

  public static async saveProductStock(product: IProductEntry) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await ProductEntry.create(product) as IProductEntry;
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
  public static async updateProductStock(productId: string, product: IProduct) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await ProductEntry.findByIdAndUpdate(
          { _id: productId },
          { $set: product },
          { new: true }
        );
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }

  public static async deleteProductStock(productId: string) {
    return new Promise(async function (resolve, reject) {
      try {
        const result = await ProductEntry.findByIdAndDelete(productId);
        resolve(result);
      } catch (error: unknown) {
        reject(handleMongoError(error));
      }
    });
  }
}
