"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestInterceptor = void 0;
const requestInterceptor = (req, res, next) => {
    // console.table(`=> 403 GET /admin/events/123?abc=true {pass:123456}`)
    console.table(`=> ${res.statusCode} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
    next();
};
exports.requestInterceptor = requestInterceptor;
