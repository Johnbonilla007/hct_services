const httpCode = require('../commons/httpStatusCode.enum');
const {
  isValidObj,
  unrealized,
  isValidArray,
} = require('../commons/utilities');
const info = require('../commons/Info.enum');
const messages = require('../commons/resources/messages');

const { Affiliate, WishList, Product } = require('../infrastructure/models');

const include = [
  {
    model: WishList,

    include: [
      {
        model: Product,
      },
    ],
  },
];

const addProductToWishList = async (req, res, next) => {
  const { userId, productUid } = req.body;

  if (!userId || !productUid || productUid <= 0)
    return next({
      code: httpCode.BAD_REQUEST,
      message: messages.userId_producId_required,
    });

  const product = await Product.findOne({ where: { uid: productUid } });

  if (!isValidObj(product))
    return next({
      code: httpCode.BAD_REQUEST,
      message: messages.productNotExist,
    });

  const affiliate = await Affiliate.findOne({
    where: { uid: userId },
  });

  if (!isValidObj(affiliate))
    return next({ code: httpCode.BAD_REQUEST, message: messages.userNotExist });

  const whishList = await affiliate.getWishLists({
    where: {
      userId: affiliate.uid,
      productId: product.id,
    },
    attributes: ['userId', 'productId'],
  });

  if (whishList && whishList.length)
    return next({
      code: httpCode.OK,
      title: info.ADVERTENCIA,
      message: messages.productAlreadyWhisList,
    });

  await WishList.create({
    userId: affiliate.uid,
    productId: product.id,
  });

  next({ code: httpCode.OK, message: messages.savedToWishList });
};

const addProductsToWhisList = async (req, res, next) => {
  const { userId, productIds } = req.body;

  if (!userId || !isValidArray(productIds))
    return next({
      code: httpCode.BAD_REQUEST,
      message: 'El campo de usuario y lista de productos es requerido.',
    });

  const affiliate = await Affiliate.findOne({ where: { uid: userId } });

  if (!isValidObj(affiliate))
    return next({ code: httpCode.BAD_REQUEST, message: messages.userNotExist });

  const wishList = await affiliate.getWishLists({});

  const productIdsToCreate = productIds
    .filter(id =>
      isValidArray(wishList) ? !wishList.some(w => w.productId === id) : true,
    )
    .map(id => ({ userId, productId: id }));

  if (!isValidArray(productIdsToCreate))
    return next({
      code: httpCode.OK,
      title: info.ADVERTENCIA,
      message: 'Los productos ya están asignados al usuario.',
    });

  await WishList.bulkCreate(productIdsToCreate);

  next({
    code: httpCode.OK,
    message: 'Los productos fueron asignados al usuario.',
  });
};

const getWishListByUser = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId)
    return next({
      code: httpCode.BAD_REQUEST,
      message: messages.userId_required,
    });

  const affiliate = await Affiliate.findOne({
    include,
    where: { uid: userId },
  });

  if (!isValidObj(affiliate))
    return next({
      code: httpCode.OK,
      title: info.ADVERTENCIA,
      message: messages.userNotExist,
    });

  const { WishLists, ...item } = unrealized(affiliate);

  const response = {
    ...item,
    wishList: WishLists ? WishLists.map(s => s.Product) : [],
  };

  next({ code: httpCode.OK, message: messages.foundData, response });
};

const deleteProductToWishList = async (req, res, next) => {
  const { id } = req.params;

  if (!id || id <= 0)
    return next({ code: httpCode.BAD_REQUEST, message: messages.id_required });

  const product = await WishList.findOne({ where: { productId: id } });

  if (!isValidObj(product)) next('');

  product.destroy();

  next({ code: httpCode.OK, message: messages.deletedProdutToWishList });
};

module.exports = wishList = {
  addProductToWishList,
  getWishListByUser,
  deleteProductToWishList,
  addProductsToWhisList,
};
