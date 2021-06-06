/* eslint-disable func-names */

/* eslint-disable no-magic-numbers */
export default function (sequelize, DataTypes) {
  const attributes = {
    productId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'product_id',
    },
    productName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      comment: null,
      field: 'product_name',
    },
    productSlug: {
      type: DataTypes.STRING(25),
      allowNull: false,
      comment: null,
      field: 'product_slug',
    },
    sku: {
      type: DataTypes.STRING(25),
      allowNull: true,
      comment: null,
      field: 'sku',
    },
    brandId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: null,
      field: 'brand_id',
    },
  };

  const options = {
    tableName: 'product',
    timestamps: false,
    underscored: true,
  };

  return sequelize.define('product', attributes, options);
}
