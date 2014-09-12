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
        constructor($scope: ng.IScope, private $state: ng.ui.IStateService, $stateParams: SlideStateParams, presentService: PresentService) {
            $scope["slideCtrl"] = this;
            presentService.getSlides()
                .then(slides => {
                    this.slides = slides;
                    var index = _.findIndex(slides, s => s.name === $stateParams.name);
                    if (index > -1) {
                        this.currentIndex = index;
                        this.slideTemplateUrl = slides[index].templateUrl;
                    }
                });
        }

        public get canGoPrevious() {
            return this.currentIndex > 0;
        }

        public get canGoNext() {
            return !!this.slides[this.currentIndex + 1];
        }

        public goPrevious() {
            this.go(this.currentIndex - 1);
        }

        public goNext() {
            this.go(this.currentIndex + 1);
        }

        private go(index: number) {
            this.$state.go(".", { name: this.slides[index].name });
        }
    }
}