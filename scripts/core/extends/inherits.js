(function addFunctionMethods() {
    // http://www.crockford.com/javascript/inheritance.html

    // First, the method method, which adds an instance method to a class.
    // This adds a public method to the Function.prototype, so all functions get it by Class Augmentation.
    // It takes a name and a function, and adds them to a function's prototype object.
    // It returns this.
    Function.prototype.method = function method(name, func) {
        this.prototype[name] = func;
        return this;
    };

    // Next comes the inherits method, which indicates that one class inherits from another.
    // It should be called after both classes are defined, but before the inheriting class's methods are added.
    // Again, we augment Function. We make an instance of the parent class and use it as the new prototype. We also correct
    // the constructor field, and we add the uber method to the prototype as well.
    // The uber method looks for the named method in its own prototype. This is the function to invoke in the case of
    // Parasitic Inheritance or Object Augmentation. If we are doing Classical Inheritance, then we need to
    // find the function in the parent's prototype.
    // The return statement uses the function's apply method to invoke the function, explicitly setting this and passing
    // an array of parameters. The parameters (if any) are obtained from the arguments array. Unfortunately, the
    // arguments array is not a true array, so we have to use apply again to invoke the array slice method.
    Function.method('inherits', function inherits(Parent) {
        var d = {}, p = (this.prototype = new Parent());
        this.method('uber', function uber(name) {
            if (!d.hasOwnProperty(name)) {
                d[name] = 0;
            }
            var f, r, t = d[name], v = Parent.prototype;
            if (t) {
                while (t) {
                    v = v.constructor.prototype;
                    t -= 1;
                }
                f = v[name];
            } else {
                f = p[name];
                if (f === this[name]) {
                    f = v[name];
                }
            }
            d[name] += 1;
            r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
            d[name] -= 1;
            return r;
        });
        return this;
    });

    // The swiss method loops through the arguments. For each name, it copies a member from the parent's prototype to the
    // new class's prototype.
    Function.method('swiss', function swiss(Parent) {
        var i, l = arguments.length;
        for (i = 1; i < l; i += 1) {
            var name = arguments[i];
            this.prototype[name] = Parent.prototype[name];
        }
        return this;
    });

}());