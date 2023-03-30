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
  app.post(
    "/promotion/news",
    validUserMigrateMiddleware,
    tryCatchAsync(promotion.addPromotionsAsync)
  );

  app.post(
    "/migrate-data", //productValidator.validateCreate,
    validUserMigrateMiddleware,
    tryCatchAsync(migrationHCT.applyMigrationAsync)
  );

  app.post("/test", (req, res) => {
    const responseAuth = {
      TransactionType: 1,
      Approved: false,
      TransactionIdentifier: "9d3dc2d9-819b-46e3-a013-3eefe07c8446",
      TotalAmount: 1.0,
      CurrencyCode: "340",
      CardBrand: "MasterCard",
      IsoResponseCode: "3D0",
      ResponseMessage: "3D-Secure+complete",
      RiskManagement: {
        ThreeDSecure: {
          Eci: "02",
          Cavv: "kHkBAGaAYwdYQHEHFIBjAAAAAAA=",
          Xid: "d543d03a-3f8a-41b5-9de4-ad6befa22662",
          AuthenticationStatus: "N",
          StatusReason: "19",
          ProtocolVersion: "2.1.0",
          FingerprintIndicator: "U",
          DsTransId: "69bb6660-c667-4ee1-b094-ca58f2a76992",
          ResponseCode: "3D0",
          CardholderInfo:
            "Additional+authentication+is+needed+for+this+transaction,+please+contact(Issuer+Name)+at+xxx+-+xxx+-+xxxx.",
        },
      },
      OrderIdentifier: "INT-9d3dc2d9-819b-46e3-a013-3eefe07c8446-Orc+3569",
      SpiToken:
        "2sexgbh1j752j2chp2nmsatwgd20n7sxmu5h7o4xz5gi4z2hpq-3plyg9wt7wz",
    };

    const result = JSON.stringify(responseAuth);

    let htmlResult = `<!DOCTYPE html>
            <html>
            <head>
                <title>Resultado de su orden</title>
            </head>
            <body style="display:flex;justify-content:center;align-items:center;">
                <div style="display:flex;justify-content:center;align-items:center;height:90vh;">
                    <p style="font-size:60px;text-align:center;">
                    Transacción <strong>exitosa</strong>
                    </p>
                </div>
                <script>
                    window.ReactNativeWebView.postMessage('${result}')
                </script>
            </body>
            </html>`;

    res.status(200).send(htmlResult);
  });
  return app;
};

const router = express.Router();
const routes = initialRoutes(router);

module.exports = routes;
