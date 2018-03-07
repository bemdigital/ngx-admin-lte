var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var Observable_1 = require('rxjs/Observable');
var RestService = (function () {
    function RestService(http) {
        this.http = http;
        this.modelName = 'to-configure';
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    RestService.prototype.setApiUrl = function (url) {
        this.serverWithApiUrl = url;
    };
    // HELPERS
    RestService.prototype.getAllFromLS = function (maxtime) {
        if (maxtime === void 0) { maxtime = 0; }
        var json = localStorage.getItem('rest_all_' + this.modelName);
        if (json) {
            var obj = JSON.parse(json);
            if (obj && (obj.date < (Date.now() - maxtime))) {
                return obj;
            }
        }
    };
    RestService.prototype.getFromCache = function (id) {
        if (this.lastGetAll) {
            return this.lastGetAll.find(function (unit) { return unit.id === id; });
        }
        else {
            return null;
        }
    };
    RestService.prototype.getActionUrl = function () {
        return this.serverWithApiUrl + this.modelName + '/';
    };
    // REST functions
    RestService.prototype.getAll = function () {
        var _this = this;
        return this.http.get(this.getActionUrl(), { headers: this.headers })
            .map(function (response) {
            // getting an array having the same name as the model
            var data = response.json()[_this.modelName];
            // transforming the array from indexed to associative
            var tab = data.records.map(function (elem) {
                var unit = {};
                // using the columns order and number to rebuild the object
                data.columns.forEach(function (champ, index) {
                    unit[champ] = elem[index];
                });
                return unit;
            });
            _this.lastGetAll = tab;
            var obj = {
                data: tab,
                date: Date.now()
            };
            localStorage.setItem('rest_all_' + _this.modelName, JSON.stringify(obj));
            return tab;
        })
            .catch(this.handleError);
    };
    RestService.prototype.get = function (id) {
        var _this = this;
        return this.http.get(this.getActionUrl() + id, { headers: this.headers })
            .map(function (response) {
            var data = response.json();
            _this.lastGet = data;
            return data;
        })
            .catch(this.handleError);
    };
    RestService.prototype.add = function (item) {
        var toAdd = JSON.stringify(item);
        return this.http.post(this.getActionUrl(), toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    RestService.prototype.addAll = function (tab) {
        var toAdd = JSON.stringify(tab);
        return this.http.post(this.getActionUrl(), toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    RestService.prototype.update = function (id, itemToUpdate) {
        return this.http.put(this.getActionUrl() + id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    RestService.prototype.delete = function (id) {
        return this.http.delete(this.getActionUrl() + id, { headers: this.headers })
            .catch(this.handleError);
    };
    RestService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    RestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof Http !== 'undefined' && Http) || Object])
    ], RestService);
    return RestService;
})();
exports.RestService = RestService;
//# sourceMappingURL=rest.service.js.map