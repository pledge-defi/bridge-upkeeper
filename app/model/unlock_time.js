module.exports = app => {
    const {INTEGER, STRING} = app.Sequelize;

    const UnlockTime = app.model.define('unlock_time', {
            id: {type: INTEGER, primaryKey: true, autoIncrement: true},
            next_time: INTEGER(11),
            created_at: STRING,
            updated_at: STRING,
        },
        {
            freezeTableName: true // 不自动将表名添加复数
        });

    return UnlockTime;
};
