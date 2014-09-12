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
                $state.go(".slide", { name: slides[0].name });
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
        function SlideCtrl($scope, $state, $stateParams, presentService) {
            var _this = this;
            this.$state = $state;
            $scope["slideCtrl"] = this;
            presentService.getSlides().then(function (slides) {
                _this.slides = slides;
                var index = _.findIndex(slides, function (s) {
                    return s.name === $stateParams.name;
                });
                if (index > -1) {
                    _this.currentIndex = index;
                    _this.slideTemplateUrl = slides[index].templateUrl;
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
                return !!this.slides[this.currentIndex + 1];
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
/// <reference path="presentservice.ts" />
/// <reference path="deckctrl.ts" />
/// <reference path="slidectrl.ts" />
var Conch;
(function (Conch) {
    angular.module("presenter", ["ui.router"]).service("presentService", Conch.PresentService).config(function ($stateProvider) {
        $stateProvider.state("deck", {
            url: "/",
            templateUrl: "/partials/present/deck.html",
            controller: Conch.DeckCtrl
        }).state("deck.slide", {
            url: "{name}",
            templateUrl: "/partials/present/slide.html",
            controller: Conch.SlideCtrl
        });
    });
})(Conch || (Conch = {}));
//# sourceMappingURL=presenter.js.map
