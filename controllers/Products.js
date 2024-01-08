import products from "../models/products.js";

export const addProducts = async (req, res) => {
  const productData = req.body;
  const { name, description, category, price, quantity, brand, merchantId } =
    productData;
  var img = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };
  const newProduct = new products({
    name,
    description,
    category,
    price,
    initialQuantity: quantity,
    quantity,
    brand,
    img,
    merchantId,
  });
  try {
    await newProduct.save();
    return res.status(200).json("Added a new product successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Couldn't added a new product");
  }
};

export const getProductsOfMerchant = async (req, res) => {
  const { merchantId } = req.query;
  try {
    const productList = await products
      .find({
        merchantId: merchantId,
        isActive: true,
      })
      .lean();
    return res.status(200).json(productList);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { merchantId, productId } = req.query;
  try {
    const existingProduct = await products.findOneAndUpdate(
      {
        merchantId,
        _id: productId,
      },
      { isActive: false }
    );
    if (!existingProduct) return res.status(404).json("Product not found");

    return res.status(200).json("Product deleted sucessfully");
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const productList = await products.find({ isActive: true }).lean();
    return res.status(200).json(productList);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { productId } = req.query;
  try {
    const productList = await products.findOne({
      isActive: true,
      _id: productId,
    });
    return res.status(200).json(productList);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

export const getProductsByCategory = async (req, res) => {
  const { id: category } = req.params;
  try {
    if (category === "all") {
      const productsList = await products.find({ isActive: true }).lean();
      return res.status(200).json(productsList);
    } else {
      const productsList = await products
        .find({
          category: category,
          isActive: true,
        })
        .lean();
      return res.status(200).json(productsList);
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

export const updateProduct = async (req, res) => {
  const { merchantId, productId, description, quantity } = req.body;
  try {
    const updatedProduct = await products
      .findOneAndUpdate(
        { merchantId, _id: productId },
        { description, quantity },
        { new: true }
      )
      .lean();
    if (!updatedProduct) return res.status(404).json("Product not found");
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
