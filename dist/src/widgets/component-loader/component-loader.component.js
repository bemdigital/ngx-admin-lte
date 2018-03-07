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
/**
 * Component to dynamicly load other component
 */
var ComponentLoaderComponent = (function () {
    /**
     * Component initialisation
     * @param  {ComponentFactoryResolver} _factoryResolver
     */
    function ComponentLoaderComponent(_factoryResolver) {
        this._factoryResolver = _factoryResolver;
        /**
         * class of the component to load
         * @type {Class}
         */
        this.class_component = null;
        /**
         * data to pass to component
         * @type {Class}
         */
        this.data = null;
        /**
         * component reference
         * @type {number|string}
         */
        this.componentRef = null;
    }
    /**
     * Lifecycle hook OnInit
     */
    ComponentLoaderComponent.prototype.ngOnInit = function () {
        // Build the child component
        var factory = this._factoryResolver.resolveComponentFactory(this.class_component);
        this.componentRef = this.viewContainerRef.createComponent(factory);
        // then give some data
        this.setComponentData(this.data);
    };
    /**
     * Lifecycle hook OnChanges, on modification of data send it to the child
     * @param  {any} changes new data changes (and old ones, in same object)
     */
    ComponentLoaderComponent.prototype.ngOnChanges = function (changes) {
        this.setComponentData(changes);
    };
    /**
     * Send data to the inner component
     * @param  {any} changes Data to send
     */
    ComponentLoaderComponent.prototype.setComponentData = function (changes) {
        if (this.componentRef) {
            // send data to component
            Object.assign(this.componentRef.instance, changes);
            // trigger component ngOnChange
            this.componentRef.instance.ngOnChanges(changes);
        }
    };
    /**
     * Lifecycle hook OnDestroy
     * @return {[type]} [description]
     */
    ComponentLoaderComponent.prototype.ngOnDestroy = function () {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ComponentLoaderComponent.prototype, "class_component");
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ComponentLoaderComponent.prototype, "data");
    __decorate([
        core_1.ViewChild('destination', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', Object)
    ], ComponentLoaderComponent.prototype, "viewContainerRef");
    ComponentLoaderComponent = __decorate([
        core_1.Component({
            selector: 'app-component-loader',
            encapsulation: core_1.ViewEncapsulation.None,
            template: '<ng-container #destination ></ng-container>'
        }), 
        __metadata('design:paramtypes', [(typeof ComponentFactoryResolver !== 'undefined' && ComponentFactoryResolver) || Object])
    ], ComponentLoaderComponent);
    return ComponentLoaderComponent;
})();
exports.ComponentLoaderComponent = ComponentLoaderComponent;
//# sourceMappingURL=component-loader.component.js.map