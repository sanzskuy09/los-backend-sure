module.exports = (sequelize, DataTypes) => {
    const AuditTrail = sequelize.define(
        "AuditTrail",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },

            created_at: {
                type: DataTypes.DATE,
                allowNull: false
            },

            user_id: {
                type: DataTypes.BIGINT
            },

            username: {
                type: DataTypes.STRING(100)
            },

            role_name: {
                type: DataTypes.STRING(100)
            },

            module: {
                type: DataTypes.STRING(100)
            },

            menu_name: {
                type: DataTypes.STRING(100)
            },

            action: {
                type: DataTypes.STRING(30)
            },

            record_id: {
                type: DataTypes.STRING(100)
            },

            description: {
                type: DataTypes.TEXT
            },

            before_data: {
                type: DataTypes.JSONB
            },

            after_data: {
                type: DataTypes.JSONB
            },

            ip_address: {
                type: DataTypes.STRING(100)
            },

            browser: {
                type: DataTypes.STRING(255)
            },

            operating_system: {
                type: DataTypes.STRING(255)
            },

            session_id: {
                type: DataTypes.STRING(255)
            },

            http_method: {
                type: DataTypes.STRING(20)
            },

            endpoint: {
                type: DataTypes.STRING(255)
            },

            response_code: {
                type: DataTypes.INTEGER
            },

            duration_ms: {
                type: DataTypes.INTEGER
            },

            status: {
                type: DataTypes.STRING(20)
            },

            source: {
                type: DataTypes.STRING(50)
            },

            correlation_id: {
                type: DataTypes.UUID
            },

            request_id: {
                type: DataTypes.UUID
            },
            created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
},
            remarks: {
                type: DataTypes.TEXT
            }
        },
        {
            tableName: "audit_trail",
            timestamps: false,
            schema: "mobile",
            freezeTableName: true
        }
    );

    return AuditTrail;
};