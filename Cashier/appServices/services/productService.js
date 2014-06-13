(function () {
    "use strict";

    /**
     * @constructor
     */
    function ProductService($q) {
        this.getProducts = function () {
            var defer = $q.defer();

            var products = [
                { id: 1, name: 'Holzfällersteaks (je kg)', price: 3.33 },
                { id: 2, name: 'Griechenland Aprikosen "Tyrinthos" (je kg)', price: 1.99 },
                { id: 3, name: 'Niederlande Salatgurke', price: 0.29 },
                { id: 4, name: 'Président Madrigal (je 100g)', price: 0.69 },
                { id: 5, name: 'Rama', price: 0.99 },
                { id: 6, name: 'Müllermilch', price: 0.65 },
                { id: 7, name: 'Kerrygold Irische Butter', price: 1.29 },
                { id: 8, name: 'Dr. Oetker Crème fraîche', price: 0.59 },
                { id: 9, name: 'Danone Actimel Drink', price: 2.22 },
                { id: 10, name: 'Lavazza Crema E Aroma', price: 10.99 },
                { id: 11, name: 'Tassimo Caffè Crema', price: 3.79 },
                { id: 12, name: 'iglo Feine Landschnitzel Wiender Art', price: 3.49 },
                { id: 13, name: 'Lagnese Cornetto Schokolade', price: 1.99 },
                { id: 14, name: 'McCain Chef Frites', price: 1.11 },
                { id: 15, name: 'Catsan Hygiene-Streu', price: 6.99 }
            ];

            defer.resolve(products);

            return defer.promise;
        };
    }

    app.module.service('productService', ProductService);
})();
