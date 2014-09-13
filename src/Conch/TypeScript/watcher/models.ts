module Conch {

    export interface Slide {
        name: string;
        title: string;
        templateUrl: string;
    }

    export interface SlideList {
        slides: Slide[];
    }

}