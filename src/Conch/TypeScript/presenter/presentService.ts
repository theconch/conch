module Conch {

    export class PresentService {
        // @ngInject
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
        }

        public getSlides(deckName: string) {
            var deferred = this.$q.defer<Slide[]>();
            this.$http.get("/present/" + deckName + "/slides", { cached: true })
                .success((dto: SlideList) => {
                    deferred.resolve(dto.slides);
                })
                .error((data, status, headers) => {
                    deferred.reject(status);
                });
            return deferred.promise;
        }
    }

}