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
    var MessageCtrl = (function () {
        // @ngInject
        function MessageCtrl($scope, $modalInstance) {
            this.$modalInstance = $modalInstance;
            this.message = {};
            $scope["messageCtrl"] = this;
        }
        MessageCtrl.prototype.send = function () {
            this.$modalInstance.close(this.message);
        };
        return MessageCtrl;
    })();
    Conch.MessageCtrl = MessageCtrl;
})(Conch || (Conch = {}));
var Conch;
(function (Conch) {
    var WatchCtrl = (function () {
        // @ngInject
        function WatchCtrl($scope, $state, $timeout, $modal, presentService) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.$timeout = $timeout;
            this.$modal = $modal;
            this.move = function (index) {
                _this.$scope.$apply(function () {
                    _this.currentIndex = index;
                    _this.slideTemplateUrl = _this.slides[index].templateUrl;
                });
            };
            this.message = function () {
                _this.$modal.open({
                    controller: Conch.MessageCtrl,
                    templateUrl: "/partials/watch/message.html"
                }).result.then(function (message) {
                    _this.deckHub.server.message("vNext", message.name, message.message);
                });
            };
            $scope["watchCtrl"] = this;
            this.connection = $.connection;
            this.deckHub = this.connection.deck;
            this.deckHub.client.move = this.move;

            presentService.getSlides().then(function (slides) {
                _this.slides = slides;
                _this.currentIndex = 0;
                _this.slideTemplateUrl = slides[0].templateUrl;
                _this.connection.hub.start().done(function () {
                    _this.deckHub.server.join(_this.connection.hub.id, "vNext").done(_this.move);
                });
            });
        }
        return WatchCtrl;
    })();
    Conch.WatchCtrl = WatchCtrl;
})(Conch || (Conch = {}));
/// <reference path="../dt/angularjs/angular.d.ts" />
/// <reference path="../dt/lodash/lodash.d.ts" />
/// <reference path="../dt/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../dt/angular-ui/angular-ui-router.d.ts" />
/// <reference path="models.ts" />
/// <reference path="presentservice.ts" />
/// <reference path="messagectrl.ts" />
/// <reference path="watchctrl.ts" />
var Conch;
(function (Conch) {
    angular.module("watcher", ["ui.router", "ui.bootstrap"]).service("presentService", Conch.PresentService).config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state("watch", {
            url: "/",
            templateUrl: "/partials/watch/watch.html",
            controller: Conch.WatchCtrl
        });

        $urlRouterProvider.otherwise("/");
    });
})(Conch || (Conch = {}));
//# sourceMappingURL=watch.js.map
