const { AuditTrail } = require("../models");

const saveAudit = async (data) => {
    try {
        await AuditTrail.create({
            created_at: new Date(),

            user_id: data.user_id || null,
            username: data.username || null,
            role_name: data.role_name || null,

            module: data.module || null,
            menu_name: data.menu_name || null,

            action: data.action || null,

            record_id: data.record_id || null,

            description: data.description || null,

            before_data: data.before_data || null,
            after_data: data.after_data || null,

            ip_address: data.ip_address || null,

            browser: data.browser || null,

            operating_system: data.operating_system || null,

            session_id: data.session_id || null,

            http_method: data.http_method || null,

            endpoint: data.endpoint || null,

            response_code: data.response_code || null,

            duration_ms: data.duration_ms || null,

            status: data.status || "SUCCESS",

            source: data.source || "WEB",

            correlation_id: data.correlation_id || null,

            request_id: data.request_id || null,

            remarks: data.remarks || null
        });
    } catch (err) {
        console.error("Audit Error :", err.message);
    }
};

module.exports = {
    saveAudit
};