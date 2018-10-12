"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request-promise");
var Auth0Wrapper = /** @class */ (function () {
    function Auth0Wrapper() {
    }
    Object.defineProperty(Auth0Wrapper.prototype, "isAuthenticated", {
        get: function () { return !!this.token; },
        enumerable: true,
        configurable: true
    });
    Auth0Wrapper.prototype.getToken = function () { return this.token; };
    Auth0Wrapper.prototype.createOptions = function (body) {
        return {
            headers: { 'Authorization': 'Bearer ' + this.token },
            json: true,
            body: body,
        };
    };
    Auth0Wrapper.prototype.authenticateToken = function (token, apiIUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.apiUrl = apiIUrl;
                this.token = token;
                return [2 /*return*/];
            });
        });
    };
    Auth0Wrapper.prototype.authenticate = function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.apiUrl = settings.auth0AuthExtensionUrl;
                        credentials = {
                            client_id: settings.auth0ClientId,
                            client_secret: settings.auth0ClientSecret,
                            audience: 'urn:auth0-authz-api',
                            grant_type: 'client_credentials'
                        };
                        return [4 /*yield*/, request.post({
                                uri: settings.auth0Url + '/oauth/token',
                                form: credentials,
                                json: true,
                            })];
                    case 1:
                        result = _a.sent();
                        this.token = result.access_token;
                        return [2 /*return*/];
                }
            });
        });
    };
    // PRIVATE HELPERS
    Auth0Wrapper.prototype.get = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get(this.apiUrl + url, this.createOptions())];
                    case 1:
                        response = _a.sent();
                        // console.log('RESPONSE', response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    Auth0Wrapper.prototype.post = function (url, body) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post(this.apiUrl + url, this.createOptions(body))];
                    case 1:
                        response = _a.sent();
                        // console.log('RESPONSE', response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    Auth0Wrapper.prototype.put = function (url, body) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.put(this.apiUrl + url, this.createOptions(body))];
                    case 1:
                        response = _a.sent();
                        // console.log('RESPONSE', response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    Auth0Wrapper.prototype.patch = function (url, body) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.patch(this.apiUrl + url, this.createOptions(body))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    Auth0Wrapper.prototype.delete = function (url, body) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.delete(this.apiUrl + url, this.createOptions(body))];
                    case 1:
                        response = _a.sent();
                        // console.log('RESPONSE', response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // PERMISSIONS
    Auth0Wrapper.prototype.getPermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('/permissions')];
                    case 1: return [2 /*return*/, (_a.sent()).permissions];
                }
            });
        });
    };
    Auth0Wrapper.prototype.getPermission = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('/permissions/' + id)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth0Wrapper.prototype.createPermission = function (permission) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.post('/permissions', {
                        name: permission.name,
                        description: permission.description,
                        applicationType: permission.applicationType,
                        applicationId: permission.applicationId,
                    })];
            });
        });
    };
    Auth0Wrapper.prototype.updatePermission = function (permission) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.put('/permissions/' + permission._id, {
                        name: permission.name,
                        description: permission.description,
                        applicationType: permission.applicationType,
                        applicationId: permission.applicationId,
                    })];
            });
        });
    };
    Auth0Wrapper.prototype.deletePermission = function (permission) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof permission !== 'string')
                    permission = permission._id;
                return [2 /*return*/, this.delete('/permissions/' + permission)];
            });
        });
    };
    // ROLES
    Auth0Wrapper.prototype.getRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('/roles')];
                    case 1: return [2 /*return*/, (_a.sent()).roles];
                }
            });
        });
    };
    Auth0Wrapper.prototype.getRole = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('/roles/' + id)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth0Wrapper.prototype.createRole = function (role) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('/roles', {
                            name: role.name,
                            description: role.description,
                            applicationType: role.applicationType,
                            applicationId: role.applicationId,
                            permissions: role.permissions,
                        })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth0Wrapper.prototype.updateRole = function (role) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.put('/roles/' + role._id, {
                            name: role.name,
                            description: role.description,
                            applicationType: role.applicationType,
                            applicationId: role.applicationId,
                            permissions: role.permissions,
                        })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth0Wrapper.prototype.deleteRole = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.delete('/roles/' + id)];
            });
        });
    };
    // USERS
    Auth0Wrapper.prototype.getUserRoles = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("/users/" + id + "/roles")];
            });
        });
    };
    Auth0Wrapper.prototype.addRoleForUser = function (id, roles) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof roles === 'string')
                    roles = [roles];
                return [2 /*return*/, this.patch("/users/" + id + "/roles", roles)];
            });
        });
    };
    Auth0Wrapper.prototype.removeRoleFromUser = function (id, roles) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof roles === 'string')
                    roles = [roles];
                return [2 /*return*/, this.delete("/users/" + id + "/roles", roles)];
            });
        });
    };
    Auth0Wrapper.prototype.getUserGroups = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.get("/users/" + id + "/groups")];
            });
        });
    };
    Auth0Wrapper.prototype.addGroupForUser = function (id, groups) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof groups === 'string')
                    groups = [groups];
                return [2 /*return*/, this.patch("/users/" + id + "/groups", groups)];
            });
        });
    };
    Auth0Wrapper.prototype.removeGroupFromUser = function (id, group) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.delete("/groups/" + group + "/members", [id])];
            });
        });
    };
    // GROUPS
    Auth0Wrapper.prototype.getGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('/groups')];
                    case 1: return [2 /*return*/, (_a.sent()).groups];
                }
            });
        });
    };
    Auth0Wrapper.prototype.getGroup = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('/groups/' + id)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth0Wrapper.prototype.createGroup = function (group) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post('/groups', {
                            name: group.name,
                            description: group.description,
                        })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth0Wrapper.prototype.updateGroup = function (group) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.put('/groups/' + group._id, {
                            name: group.name,
                            description: group.description,
                        })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth0Wrapper.prototype.deleteGroup = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.delete('/groups/' + id)];
            });
        });
    };
    return Auth0Wrapper;
}());
exports.Auth0Wrapper = Auth0Wrapper;
//# sourceMappingURL=Auth0Wrapper.js.map