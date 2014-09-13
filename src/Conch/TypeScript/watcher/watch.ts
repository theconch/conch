/// <reference path="../dt/angularjs/angular.d.ts" />
/// <reference path="../dt/lodash/lodash.d.ts" />
/// <reference path="../dt/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../dt/angular-ui/angular-ui-router.d.ts" />

/// <reference path="models.ts" />
/// <reference path="presentservice.ts" />
/// <reference path="messagectrl.ts" />
/// <reference path="watchctrl.ts" />

module Conch {
    angular.module("watcher", ["ui.router", "ui.bootstrap"])
        .service("presentService", PresentService)
        .config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
            $stateProvider
                .state("watch", {
                    url: "/",
                    templateUrl: "/partials/watch/watch.html",
                    controller: WatchCtrl
                });

            $urlRouterProvider.otherwise("/");
        });
}