module Conch {
    export class DeckCtrl {
        // @ngInject
        constructor($scope: ng.IScope, $state: ng.ui.IStateService, presentService: PresentService) {
            $scope["deckCtrl"] = this;
            presentService.getSlides()
                .then(slides => {
                    $state.go("deck.slide", { name: slides[0].name });
                });
        }
    }
}