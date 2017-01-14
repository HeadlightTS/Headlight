import { Signal } from '../src/signal/Signal'

describe('Signal.', () => {
    let signal: Signal<any>;

    beforeEach(() => {
        signal = new Signal<any>();
    });

    it('Creates.', () => {
        chai.assert.instanceOf(signal, Signal);
        chai.assert.equal('s', signal.cid.charAt(0));;
    });
});
