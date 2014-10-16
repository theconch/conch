/// <reference path="../dt/jquery/jquery.d.ts" />
var Conch;
(function (Conch) {
    var LiveService = (function () {
        // @ngInject
        function LiveService($rootScope, ngToast) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.ngToast = ngToast;
            this.connected = false;
            this.index = 0;
            this.connect = function (deckName) {
                if (_this.connected)
                    return;
                _this.connection.hub.start().done(function () {
                    _this.connected = true;
                    _this.deckHub.server.control(_this.connection.hub.id, deckName);
                    _this.deckHub.server.move(deckName, _this.index);
                });
            };
            this.move = function (deckName, index) {
                _this.index = index;
                if (_this.connected) {
                    _this.deckHub.server.move(deckName, index);
                }
            };
            this.message = function (name, message) {
                _this.$rootScope.$apply(function () {
                    _this.ngToast.create({
                        content: name + " says:<br>" + message,
                        dismissButton: true,
                        dismissOnClick: true,
                        'class': "info"
                    });
                });
            };
            this.connection = $.connection;
            this.deckHub = this.connection.deck;
            this.deckHub.client.message = this.message;
        }
        return LiveService;
    })();
    Conch.LiveService = LiveService;
})(Conch || (Conch = {}));
var Conch;
(function (Conch) {
    var PresentService = (function () {
        // @ngInject
        function PresentService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        PresentService.prototype.getSlides = function () {
            var deferred = this.$q.defer();
            this.$http.get("slides", { cache: true }).success(function (dto) {
                deferred.resolve(dto.slides);
            }).error(function (data, status, headers) {
                deferred.reject(status);
            });
            return deferred.promise;
        };
        return PresentService;
    })();
    Conch.PresentService = PresentService;
})(Conch || (Conch = {}));
var Conch;
(function (Conch) {
    var DeckCtrl = (function () {
        // @ngInject
        function DeckCtrl($scope, $state, presentService) {
            $scope["deckCtrl"] = this;
            presentService.getSlides().then(function (slides) {
                $state.go("deck.slide", { name: slides[0].name });
            });
        }
        return DeckCtrl;
    })();
    Conch.DeckCtrl = DeckCtrl;
})(Conch || (Conch = {}));
var Conch;
(function (Conch) {
    var SlideCtrl = (function () {
        // @ngInject
        function SlideCtrl($scope, $state, $stateParams, presentService, liveService) {
            var _this = this;
            this.$state = $state;
            $scope["slideCtrl"] = this;
            liveService.connect("vNext");
            presentService.getSlides().then(function (slides) {
                _this.slides = slides;
                var index = _.findIndex(slides, function (s) {
                    return s.name === $stateParams.name;
                });
                if (index > -1) {
                    _this.currentIndex = index;
                    _this.slideTemplateUrl = slides[index].templateUrl;
                    liveService.move("vNext", index);
                }
            });
        }
        Object.defineProperty(SlideCtrl.prototype, "canGoPrevious", {
            get: function () {
                return this.currentIndex > 0;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SlideCtrl.prototype, "canGoNext", {
            get: function () {
                return !!(this.slides && this.slides[this.currentIndex + 1]);
            },
            enumerable: true,
            configurable: true
        });

        SlideCtrl.prototype.goPrevious = function () {
            this.go(this.currentIndex - 1);
        };

        SlideCtrl.prototype.goNext = function () {
            this.go(this.currentIndex + 1);
        };

        SlideCtrl.prototype.go = function (index) {
            this.$state.go(".", { name: this.slides[index].name });
        };
        return SlideCtrl;
    })();
    Conch.SlideCtrl = SlideCtrl;
})(Conch || (Conch = {}));
/// <reference path="../dt/angularjs/angular.d.ts" />
/// <reference path="../dt/lodash/lodash.d.ts" />
/// <reference path="../dt/angular-ui/angular-ui-router.d.ts" />
/// <reference path="models.ts" />
/// <reference path="liveservice.ts" />
/// <reference path="presentservice.ts" />
/// <reference path="deckctrl.ts" />
/// <reference path="slidectrl.ts" />
var Conch;
(function (Conch) {
    angular.module("presenter", ["ui.router", "ngToast"]).service("presentService", Conch.PresentService).service("liveService", Conch.LiveService).config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state("deck", {
            url: "/",
            templateUrl: "/partials/present/deck.html",
            controller: Conch.DeckCtrl
        }).state("deck.slide", {
            url: "{name}",
            templateUrl: "/partials/present/slide.html",
            controller: Conch.SlideCtrl
        });

        $urlRouterProvider.otherwise("/");
    });
})(Conch || (Conch = {}));
//# sourceMappingURL=presenter.js.map
