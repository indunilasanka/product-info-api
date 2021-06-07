export default function (sequelize, DataTypes) {
  const attributes = {
    brandId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'brand_id',
    },
    brandName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: null,
      field: 'brand_name',
    },
  };

  const options = {
    tableName: 'brand',
    timestamps: false,
    underscored: true,
  };

  return sequelize.define('brand', attributes, options);
}
