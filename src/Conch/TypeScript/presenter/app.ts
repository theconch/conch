/// <reference path="../dt/angularjs/angular.d.ts" />
/// <reference path="../dt/lodash/lodash.d.ts" />
/// <reference path="../dt/angular-ui/angular-ui-router.d.ts" />

/// <reference path="models.ts" />
/// <reference path="liveservice.ts" />
/// <reference path="presentservice.ts" />
/// <reference path="deckctrl.ts" />
/// <reference path="slidectrl.ts" />

module Conch {
    angular.module("presenter", ["ui.router","ngToast"])
        .service("presentService", PresentService)
        .service("liveService", LiveService)
        .config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
            $stateProvider
                .state("deck", {
                    url: "/",
                    templateUrl: "/partials/present/deck.html",
                    controller: DeckCtrl
                })
                .state("deck.slide", {
                    url: "{name}",
                    templateUrl: "/partials/present/slide.html",
                    controller: SlideCtrl
                });

            $urlRouterProvider.otherwise("/");
        });
}