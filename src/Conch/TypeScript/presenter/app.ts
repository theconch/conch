/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../../bower_components/dt-angular-ui/angular-ui.d.ts" />

module Conch {
    angular.module("presenter", ["ui.bootstrap", "ui.router"])
        .config(($stateProvider: ng.ui.IStateProvider) => {
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
        });
}