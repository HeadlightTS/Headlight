/// <reference path="../typings/index.d.ts" />

import { Signal } from '../src/signal/Signal';
import { Receiver } from '../src/receiver/Receiver';


describe('Signal.', () => {
    type THandlerArg = number;

    let signal: Signal<THandlerArg>;

    beforeEach(() => {
        signal = new Signal<THandlerArg>();
    });

    it('Creates properly.', () => {
        chai.assert.instanceOf(signal, Signal);
    });

    describe('Dispatches properly.', () => {
        it('Always.', () => {
            let arg: THandlerArg = 0;
            
            const r = new Receiver();

            signal.on((a: THandlerArg) => {
                arg += a;
            }, r);

            signal.dispatch(1);

            chai.assert.isNumber(arg);
            chai.assert.equal(arg, 1);

            signal.dispatch(5);

            chai.assert.equal(arg, 6);
            chai.assert.isTrue(signal.hasReceiver(r));
        });

        it('Once.', () => {
            let arg: THandlerArg = 0
            
            const r = new Receiver();

            signal.once((a: THandlerArg) => {
                arg += a;
            }, r);

            signal.dispatch(1);

            chai.assert.isNumber(arg);
            chai.assert.equal(arg, 1);

            signal.dispatch(5);

            chai.assert.equal(arg, 1);
            chai.assert.isFalse(signal.hasReceiver(r));
        });
    });

    describe('Stops dispatching.', () => {
        it('All.', () => {
            let arg1: THandlerArg = 0,
                arg2: THandlerArg = 0;

            signal.on((a: THandlerArg) => {
                arg1 += a;
            }, new Receiver());

            signal.on((a: THandlerArg) => {
                arg2 += a;
            }, new Receiver());

            signal.dispatch(1);

            chai.assert.equal(arg1, 1);
            chai.assert.equal(arg2, 1);

            signal.off();
            signal.dispatch(5);

            chai.assert.equal(arg1, 1);    
            chai.assert.equal(arg2, 1);    
        });

        it('By handler.', () => {
            let arg1: THandlerArg = 0,
                arg2: THandlerArg = 0;
                
            const handler = (a: THandlerArg) => {
                    arg1 += a;
                };

            signal.on(handler, new Receiver());

            signal.on((a: THandlerArg) => {
                arg2 += a;
            }, new Receiver());

            signal.dispatch(1);

            chai.assert.equal(arg1, 1);
            chai.assert.equal(arg2, 1);

            signal.off({
                handler: handler
            });
            signal.dispatch(5);

            chai.assert.equal(arg1, 1);    
            chai.assert.equal(arg2, 6);    
        });

        it('By receiver.', () => {
            let arg1: THandlerArg = 0,
                arg2: THandlerArg = 0;
                
            const receiver = new Receiver();

            signal.on((a: THandlerArg) => {
                arg1 += a;
            }, receiver);

            signal.on((a: THandlerArg) => {
                arg2 += a;
            }, new Receiver());

            signal.dispatch(1);

            chai.assert.equal(arg1, 1);
            chai.assert.equal(arg2, 1);

            signal.off({
                receiver: receiver
            });
             
            signal.dispatch(5);

            chai.assert.equal(arg1, 1);    
            chai.assert.equal(arg2, 6);    
        });

        it('By handler and receiver.', () => {
            let arg1: THandlerArg = 0,
                arg2: THandlerArg = 0,
                arg3: THandlerArg = 0;
                
            const receiver = new Receiver(),
                handler = (a: THandlerArg) => {
                    arg1 += a;
                };


            signal.on(handler, receiver);

            signal.on((a: THandlerArg) => {
                arg2 += a;
            }, receiver);

            signal.on((a: THandlerArg) => {
                arg3 += a;
            }, new Receiver());

            signal.dispatch(1);

            chai.assert.equal(arg1, 1);
            chai.assert.equal(arg2, 1);
            chai.assert.equal(arg3, 1);

            signal.off({
                handler: handler,
                receiver: receiver
            });

            signal.off({
                receiver: new Receiver(),
                handler: () => { const b = 0; } 
            });

            signal.dispatch(5);

            chai.assert.equal(arg1, 1);    
            chai.assert.equal(arg2, 6);    
            chai.assert.equal(arg3, 6);    
        });
    });

    

    
});
