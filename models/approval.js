module.exports = (sequelize, DataTypes) => {
  const Approval = sequelize.define('approval', {
    application_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    approval_note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    approved_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_final_approve: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
        is_final_reject: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_by: {
      type: DataTypes.STRING,
    },
    updated_by: {
      type: DataTypes.STRING,
    },
    created_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'approval',
    schema: 'mobile',
    timestamps: false,
  });

  return Approval;
};
