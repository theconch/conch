module Conch {
    export class MessageCtrl {
        public message: any = {};
        // @ngInject
        constructor($scope: ng.IScope, private $modalInstance: ng.ui.bootstrap.IModalServiceInstance) {
            $scope["messageCtrl"] = this;
        }

        public send() {
            this.$modalInstance.close(this.message);
        }
    }
}