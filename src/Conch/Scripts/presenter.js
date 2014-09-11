var Conch;
(function (Conch) {
    var PresentService = (function () {
        // @ngInject
        function PresentService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        PresentService.prototype.getSlides = function (deckName) {
            var deferred = this.$q.defer();
            this.$http.get("/present/" + deckName + "/slides", { cached: true }).success(function (dto) {
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
        function DeckCtrl($scope) {
            $scope["deckCtrl"] = this;
        }
        return DeckCtrl;
    })();
    Conch.DeckCtrl = DeckCtrl;
})(Conch || (Conch = {}));
var Conch;
(function (Conch) {
    var SlideCtrl = (function () {
        // @ngInject
        function SlideCtrl($scope, $stateParams, presentService) {
            var _this = this;
            $scope["slideCtrl"] = this;
            presentService.getSlides($stateParams.name).then(function (slides) {
                _this.slides = slides;
                var index = _.findIndex(slides, function (s) {
                    return s.name === $stateParams.name;
                });
                if (index > -1) {
                    _this.slideTemplateUrl = slides[index].templateUrl;
                    if (slides[index + 1]) {
                        _this.nextLink = "#/" + slides[index + 1].name;
                    }
                    if (index > 0) {
                        _this.previousLink = "#/" + slides[index - 1].name;
                    }
                }
            });
        }
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
