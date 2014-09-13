/// <reference path="../dt/jquery/jquery.d.ts" />
module Conch {

    export class LiveService {
        private connected = false;
        private connection: any;
        private deckHub: any;
        private index = 0;
        // @ngInject
        constructor(private $rootScope: ng.IRootScopeService, private ngToast: any) {
            this.connection = (<any>$).connection;
            this.deckHub = this.connection.deck;
            this.deckHub.client.message = this.message;
        }

        public connect = (deckName: string) => {
            if (this.connected) return;
            this.connection.hub.start()
                .done(() => {
                    this.connected = true;
                    this.deckHub.server.control(this.connection.hub.id, deckName);
                    this.deckHub.server.move(deckName, this.index);
                });
        };

        public move = (deckName: string, index: number) => {
            this.index = index;
            if (this.connected) {
                this.deckHub.server.move(deckName, index);
            }
        };

        private message = (name: string, message: string) => {
            this.$rootScope.$apply(() => {
                this.ngToast.create({
                    content: name + " says:<br>" + message,
                    dismissButton: true,
                    dismissOnClick: true,
                    'class': "info"
                });
            });
        };
    }
}