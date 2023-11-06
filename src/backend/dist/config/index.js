"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const envs_1 = require("./envs");
const index_1 = tslib_1.__importDefault(require("./logger/index"));
const pkg = JSON.parse((0, fs_1.readFileSync)('./package.json', { encoding: 'utf8' }));
exports.config = {
    version: pkg.version,
    envs: envs_1.envs,
    logger: index_1.default,
    // additional shared configuration
};
//# sourceMappingURL=index.js.map
