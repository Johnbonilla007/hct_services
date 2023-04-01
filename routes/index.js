const express = require("express");
const tryCatchAsync = require("../commons/middlewares/try-catch.middleware");
const productValidator = require("../commons/validators/products");
const validUserMigrateMiddleware = require("../commons/middlewares/validUserMigrate.middleware");

const {
  auth,
  product,
  category,
  quote,
  city,
  carrusel,
  user,
  rating,
  wishList,
  promotion,
  migrationHCT,
} = require("../controllers");

// tryCatchAsync captura los errores internos dentro del método
// ejemplo server no disponble, errores inesperados.
const initialRoutes = (app) => {
  // auth
  app.post("/auth/signup", tryCatchAsync(auth.signup));
  app.post("/auth/signin", tryCatchAsync(auth.signin));
  app.post("/auth/change-password", tryCatchAsync(auth.changePassword));

  // Products
  app.post("/products/addproducts", product.createProduct);
  app.get("/products/getproductid/:idProduct", product.getProductId);
  app.get("/products/getproducts", product.getProducts);
  app.post("/products/getproductcategory", product.getProductCategory);
  app.post("/products/getproductname", product.getProductName);
  app.post("/products/updateproductrating", product.updateRatingProduct);

  //Categories
  app.post("/categories/new", tryCatchAsync(category.addCategory));
  app.post(
    "/categories/:categoryId/sub-categories/news",
    tryCatchAsync(category.addSubCategoriesToCategoyId)
  );
  app.get("/categories", category.getCategories);

  //quotes
  app.post("/quote/addquote", quote.addQuote);
  app.get("/quote/getquote/:uid", quote.getQuoteUid);

  //cities
  // app.post("/setcity", city.setCity);
  app.get("/getcity", city.getCity);

  //carrusel
  app.get("/getcarrusel", tryCatchAsync(carrusel.getCarrusels));

  //users
  app.post("/user/adduser", user.addUser);
  app.post("/user/getuser", user.getUserUId);
  app.post("/user/updateuser", user.updateInfotUser);

  //rating
  app.post("/rating/setrating", rating.setRatingPorduct);
  app.post("/rating/getrating", rating.getRatingId);

  // WishList
  app.get("/wish-list/:userId", tryCatchAsync(wishList.getWishListByUser));
  app.post("/wish-list/new", tryCatchAsync(wishList.addProductToWishList));
  app.post("/wish-list/news", tryCatchAsync(wishList.addProductsToWhisList));
  app.delete("/wish-list/:id", tryCatchAsync(wishList.deleteProductToWishList));

  app.get("/promotion/all", tryCatchAsync(promotion.getPromotionsAsync));
  app.post("/promotion/news", tryCatchAsync(promotion.addPromotionsAsync));

  app.post(
    "/migrate-data", //productValidator.validateCreate,
    validUserMigrateMiddleware,
    tryCatchAsync(migrationHCT.applyMigrationAsync)
  );

  return app;
};

const router = express.Router();
const routes = initialRoutes(router);

module.exports = routes;
