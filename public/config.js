'use strict';

angular.module('materialApp')
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
    function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/login');
    $urlRouterProvider.when('/settings', '/settings/default');

    $stateProvider
    .state('welcome', {
        abstract: true,
        templateUrl: 'modules/common/welcome.client.view.html',        
    })
    .state('welcome.branding', {
        url: '/',
        templateUrl: 'modules/common/branding.client.view.html',
    })
    .state('welcome.login', {
        url: '/login',
        templateUrl: 'modules/users/login.client.view.html',
        controller: 'loginController',
        data: {
            contentClass: 'login-content'
        }
    })
    .state('welcome.register', {
        url: '/register',
        templateUrl: 'modules/users/register.client.view.html',
        controller: 'registerController',
        data: {
            contentClass: 'register-content'
        }
    })
    .state('store', {
        url: '/store',
        templateUrl: 'modules/common/store.client.view.html',
        controller: 'storeController'        
    })
    .state('home', {
        abstract: true,
        templateUrl: 'modules/home/home.client.view.html',
        controller: 'homeController'
    })
    .state('home.activate', {
        url: '/activate',
        templateUrl: 'modules/activate/activate.client.view.html'
    })
    .state('home.dashboard', {
    	url: '/dashboard',
        templateUrl: 'modules/dashboard/dashboard.client.view.html'
    })
    .state('home.order', {
        url: '/orders',
        templateUrl: 'modules/order/order.client.view.html'
    })
    .state('home.orderDetail', {
        url: '/orders/:orderId',
        templateUrl: 'modules/order/orderDetail.client.view.html'
    })
    .state('home.customer', {
        url: '/customers',
        templateUrl: 'modules/customer/customer.client.view.html'
    })
    .state('home.customerDetail', {
        url: '/customers/:customerId',
        templateUrl: 'modules/customer/customerDetail.client.view.html'
    })    
    .state('home.category', {
        url: '/categories',
        templateUrl: 'modules/category/category.client.view.html',
        controller: 'categoryController'
    })
    .state('home.createCategory', {
        url: '/categories/create',
        templateUrl: 'modules/category/createCategory.client.view.html',
        controller: 'createCategoryController'
    })
    .state('home.editCategory', {
        url: '/categories/edit/:categoryId',
        templateUrl: 'modules/category/editCategory.client.view.html',
        controller: 'editCategoryController'
    })
    .state('home.categoryDetails', {
        url: '/categories/:categoryId',
        templateUrl: 'modules/category/categoryDetails.client.view.html',
        controller: 'categoryController'
    })
    .state('home.product', {
        url: '/products',
        templateUrl: 'modules/product/listProduct.client.view.html'
    })
    .state('home.createProduct', {
        url: '/products/create',
        templateUrl: 'modules/product/createProduct.client.view.html',
        controller: 'createProductController'
    })
    .state('home.attribute', {
        url: '/attributes',
        templateUrl: 'modules/attribute/attribute.client.view.html'
    })
    .state('home.files', {
        url: '/files',
        templateUrl: 'modules/files/files.client.view.html',
        controller: 'filesController'
    })
    .state('home.listFiles', {
        url: '/files/list',
        templateUrl: 'modules/files/listFiles.client.view.html',
        controller: 'listFilesController'
    }) 
    .state('home.design', {
        url: '/design',
        templateUrl: 'modules/design/design.client.view.html'
    })
    .state('home.report', {
        url: '/reports',
        templateUrl: 'modules/report/report.client.view.html'
    })
    .state('home.settings', {
        abstract: true,
        url: '/settings',
        template: '<ui-view></ui-view>'
    })
    .state('home.settings.notifications', {
        url: '/notifications',
        templateUrl: 'modules/settings/notifications/notification.client.view.html'
    })
    .state('home.settings.default', {
        url: '/default'
    })
    .state('home.settings.termsAndConditions', {
        url: '/termsAndConditions'
    })
    .state('home.settings.paymentGateway', {
        url: 'paymentGateway'
    })
    
}]);


angular.module('materialApp')
.run(['$rootScope', function($rootScope) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        if(toState.data && toState.data.contentClass) {
            $rootScope.contentClass = toState.data.contentClass;
        } else {
            $rootScope.contentClass = '';
        }
    });    
}]);
