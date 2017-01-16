/// <reference path="../typings/index.d.ts" />

import { Signal } from '../src/signal/Signal';
import { Receiver } from '../src/receiver/Receiver';


describe('Receiver.', () => {
    let receiver: Receiver;

    beforeEach(() => {
        receiver = new Receiver();
    });

    it('Creates properly.', () => {
        chai.assert.instanceOf(receiver, Receiver);
    });

    describe('Receives signal.', () => {
        it('Always', () => {
            let arg = 0,
                signal = new Signal<number>();

            receiver.receive((a) => {
                arg += a;
            }, signal);

            signal.dispatch(1);

            chai.assert.equal(arg, 1);

            signal.dispatch(5);

            chai.assert.equal(arg, 6);
            chai.assert.isTrue(signal.hasReceiver(receiver));
        });

        it('Once.', () => {
            let arg = 0,
                signal = new Signal<number>();

            receiver.receiveOnce((a) => {
                arg += a;
            }, signal);

            signal.dispatch(1);

            chai.assert.equal(arg, 1);

            signal.dispatch(5);

            chai.assert.equal(arg, 1);
            chai.assert.isFalse(signal.hasReceiver(receiver));
        });

        describe('Stops receiving.', () => {
            it('All.', () => {
                let arg1 = 0,
                    arg2 = 0,
                    signal1 = new Signal<number>(),
                    signal2 = new Signal<number>();

                receiver.receive((a) => {
                    arg1 += a;
                }, signal1);

                receiver.receive((a) => {
                    arg2 += a;
                }, signal2);

                receiver.stopReceiving();

                signal1.dispatch(1);
                signal2.dispatch(1);

                chai.assert.equal(arg1, 0);
                chai.assert.equal(arg2, 0);

                chai.assert.isFalse(signal1.hasReceiver(receiver));
                chai.assert.isFalse(signal2.hasReceiver(receiver));
            });

            it('Very signal.', () => {
                let arg1 = 0,
                    arg2 = 0,
                    signal1 = new Signal<number>(),
                    signal2 = new Signal<number>();

                receiver.receive((a) => {
                    arg1 += a;
                }, signal1);

                receiver.receive((a) => {
                    arg2 += a;
                }, signal2);

                receiver.stopReceiving({
                    signal: signal1
                });

                signal1.dispatch(1);
                signal2.dispatch(1);

                chai.assert.equal(arg1, 0);
                chai.assert.equal(arg2, 1);

                chai.assert.isFalse(signal1.hasReceiver(receiver));
                chai.assert.isTrue(signal2.hasReceiver(receiver));
            });

            it('Very handler.', () => {
                let arg1 = 0,
                    arg2 = 0,
                    arg3 = 0,
                    signal1 = new Signal<number>(),
                    signal2 = new Signal<number>(),
                    h1 = (a) => {
                        arg1 += a;
                    },
                    h2 = (a) => {
                        arg1 += a;
                    },
                    h3 = (a) => {
                        arg2 += a;
                    };

                receiver.receive(h1, signal1);
                receiver.receive(h2, signal2);
                receiver.receive(h3, signal2);

                receiver.stopReceiving({
                    handler: h2
                });

                signal1.dispatch(1);
                signal2.dispatch(1);

                chai.assert.equal(arg1, 1);
                chai.assert.equal(arg2, 1);

                chai.assert.isTrue(signal1.hasReceiver(receiver));
                chai.assert.isTrue(signal2.hasReceiver(receiver));

                receiver.stopReceiving({
                    handler: h3
                });

                chai.assert.isFalse(signal2.hasReceiver(receiver));
            });

            it('Very handler and very receiver.', () => {
                let arg1 = 0,
                    arg2 = 0,
                    arg3 = 0,
                    signal1 = new Signal<number>(),
                    signal2 = new Signal<number>(),
                    h1 = (a) => {
                        arg1 += a;
                    },
                    h2 = (a) => {
                        arg1 += a;
                    },
                    h3 = (a) => {
                        arg2 += a;
                    };

                receiver.receive(h1, signal1);
                receiver.receive(h2, signal2);
                receiver.receive(h3, signal2);

                receiver.stopReceiving({
                    handler: h2,
                    signal: signal2
                });

                signal1.dispatch(1);
                signal2.dispatch(1);

                chai.assert.equal(arg1, 1);
                chai.assert.equal(arg2, 1);

                chai.assert.isTrue(signal1.hasReceiver(receiver));
                chai.assert.isTrue(signal2.hasReceiver(receiver));

                receiver.stopReceiving({
                    handler: h3,
                    signal: signal2
                });

                chai.assert.isFalse(signal2.hasReceiver(receiver));
            });

            
        });
        

    });
});
