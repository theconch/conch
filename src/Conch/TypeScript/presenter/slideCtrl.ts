module Conch {

    export class SlideCtrl {
        // @ngInject
        constructor($scope: ng.IScope) {
            $scope["slideCtrl"] = this;
        }
    }
}