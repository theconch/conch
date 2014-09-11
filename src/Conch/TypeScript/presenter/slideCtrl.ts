module Conch {

    export interface SlideStateParams {
        name: string;
    }

    export class SlideCtrl {
        private slides: Slide[];
        private currentIndex: number;
        public slideTemplateUrl: string;
        public nextLink: string;
        public previousLink: string;

        // @ngInject
        constructor($scope: ng.IScope, $stateParams: SlideStateParams, presentService: PresentService) {
            $scope["slideCtrl"] = this;
            presentService.getSlides($stateParams.name)
                .then(slides => {
                    this.slides = slides;
                    var index = _.findIndex(slides, s => s.name === $stateParams.name);
                    if (index > -1) {
                        this.slideTemplateUrl = slides[index].templateUrl;
                        if (slides[index + 1]) {
                            this.nextLink = "#/" + slides[index + 1].name;
                        }
                        if (index > 0) {
                            this.previousLink = "#/" + slides[index - 1].name;
                        }
                    }
                });
        }
    }
}