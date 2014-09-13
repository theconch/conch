module Conch {

    export class WatchCtrl {
        private slides: Slide[];
        private currentIndex: number;
        public slideTemplateUrl: string;
        private connection: any;
        private deckHub: any;

        // @ngInject
        constructor(private $scope: ng.IScope, private $state: ng.ui.IStateService, private $timeout: ng.ITimeoutService, private $modal: ng.ui.bootstrap.IModalService, presentService: PresentService) {
            $scope["watchCtrl"] = this;
            this.connection = (<any>$).connection;
            this.deckHub = this.connection.deck;
            this.deckHub.client.move = this.move;

            presentService.getSlides()
                .then(slides => {
                    this.slides = slides;
                    this.currentIndex = 0;
                    this.slideTemplateUrl = slides[0].templateUrl;
                    this.connection.hub.start()
                        .done(() => {
                            this.deckHub.server.join(this.connection.hub.id, "vNext").done(this.move);
                        });
                });

        }

        private move = (index) => {
            this.$scope.$apply(() => {
                this.currentIndex = index;
                this.slideTemplateUrl = this.slides[index].templateUrl;
            });
        };

        public message = () => {
            this.$modal.open({
                controller: MessageCtrl,
                templateUrl: "/partials/watch/message.html"
            }).result.then((message: any) => {
                this.deckHub.server.message("vNext", message.name, message.message);
                });
        };
    }
}