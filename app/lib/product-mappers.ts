import { DatabaseProduct, ProductType } from "@/app/interfaces";

export const toProductType = (product: DatabaseProduct): ProductType => ({
  id: product.id,
  title: product.name,
  about: product.description,
  oldprice: product.oldPriceInCents ? product.oldPriceInCents / 100 : undefined,
  price: product.priceInCents / 100,
  discount: product.discountPercentage,
  image: product.images?.[0] || product.imagePath || "/assets/img/placeholder.svg",
  isnew: product.isNew,
});
