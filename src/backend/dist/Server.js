"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const tslib_1 = require("tslib");
const path_1 = require("path");
const di_1 = require("@tsed/di");
const common_1 = require("@tsed/common");
require("@tsed/platform-express"); // /!\ keep this import
require("@tsed/ajv");
require("@tsed/swagger");
const config_1 = require("./config");
const rest = tslib_1.__importStar(require("./controllers/rest/index"));
const pages = tslib_1.__importStar(require("./controllers/pages/index"));
let Server = class Server {
    app;
    settings;
};
tslib_1.__decorate([
    (0, di_1.Inject)(),
    tslib_1.__metadata("design:type", common_1.PlatformApplication)
], Server.prototype, "app", void 0);
tslib_1.__decorate([
    (0, di_1.Configuration)(),
    tslib_1.__metadata("design:type", Object)
], Server.prototype, "settings", void 0);
Server = tslib_1.__decorate([
    (0, di_1.Configuration)({
        ...config_1.config,
        acceptMimes: ['application/json'],
        httpPort: process.env.PORT || 8083,
        httpsPort: false,
        disableComponentsScan: true,
        mount: {
            '/rest': [...Object.values(rest)],
            '/': [...Object.values(pages)],
        },
        swagger: [
            {
                path: '/doc',
                specVersion: '3.0.1',
            },
        ],
        middlewares: [
            'cors',
            'cookie-parser',
            'compression',
            'method-override',
            'json-parser',
            { use: 'urlencoded-parser', options: { extended: true } },
        ],
        views: {
            root: (0, path_1.join)(process.cwd(), '../views'),
            extensions: {
                ejs: 'ejs',
            },
        },
        exclude: ['**/*.spec.ts'],
    })
], Server);
exports.Server = Server;
//# sourceMappingURL=Server.js.map
