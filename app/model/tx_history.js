
module.exports = app => {
  const { STRING, INTEGER, DATE, BIGINT } = app.Sequelize;

  const TxHistory = app.model.define('txhistory', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    address: STRING(100),
    txType: STRING(100),
    depositHash: STRING(100),
    bridgeHash: STRING(100),
    srcChain: STRING(100),
    destChain: STRING(100),
    asset: STRING(100),
    amount: STRING(100),
    fee: STRING(100),
    timestamp: STRING(100),
    created_at: DATE,
    updated_at: DATE,
  },
  {
    freezeTableName: true // 不自动将表名添加复数
  });

  return TxHistory;
};
