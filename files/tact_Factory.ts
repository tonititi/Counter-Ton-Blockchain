import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.wallet_code);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.wallet_code);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Slice;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address | null;
    custom_payload: Cell | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    query_id: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2309184031, 32);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2309184031) { throw Error('Invalid prefix'); }
    return { $$type: 'Mint' as const };
}

function loadTupleMint(source: TupleReader) {
    return { $$type: 'Mint' as const };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Slice;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeBuilder(src.owner_address.asBuilder());
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0;
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCell().asSlice();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeSlice(source.owner_address.asCell());
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type InitReferral = {
    $$type: 'InitReferral';
    referrer: Address;
}

export function storeInitReferral(src: InitReferral) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2966475482, 32);
        b_0.storeAddress(src.referrer);
    };
}

export function loadInitReferral(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2966475482) { throw Error('Invalid prefix'); }
    let _referrer = sc_0.loadAddress();
    return { $$type: 'InitReferral' as const, referrer: _referrer };
}

function loadTupleInitReferral(source: TupleReader) {
    let _referrer = source.readAddress();
    return { $$type: 'InitReferral' as const, referrer: _referrer };
}

function storeTupleInitReferral(source: InitReferral) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.referrer);
    return builder.build();
}

function dictValueParserInitReferral(): DictionaryValue<InitReferral> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInitReferral(src)).endCell());
        },
        parse: (src) => {
            return loadInitReferral(src.loadRef().beginParse());
        }
    }
}

export type Buy = {
    $$type: 'Buy';
    tonAmount: bigint;
    minOut: bigint;
    referrer: Address;
    referrerDl1: Address;
    referrerDl2: Address;
    treasury: Address;
    trader: Address;
}

export function storeBuy(src: Buy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2901976294, 32);
        b_0.storeInt(src.tonAmount, 257);
        b_0.storeInt(src.minOut, 257);
        b_0.storeAddress(src.referrer);
        let b_1 = new Builder();
        b_1.storeAddress(src.referrerDl1);
        b_1.storeAddress(src.referrerDl2);
        b_1.storeAddress(src.treasury);
        let b_2 = new Builder();
        b_2.storeAddress(src.trader);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBuy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2901976294) { throw Error('Invalid prefix'); }
    let _tonAmount = sc_0.loadIntBig(257);
    let _minOut = sc_0.loadIntBig(257);
    let _referrer = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _referrerDl1 = sc_1.loadAddress();
    let _referrerDl2 = sc_1.loadAddress();
    let _treasury = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _trader = sc_2.loadAddress();
    return { $$type: 'Buy' as const, tonAmount: _tonAmount, minOut: _minOut, referrer: _referrer, referrerDl1: _referrerDl1, referrerDl2: _referrerDl2, treasury: _treasury, trader: _trader };
}

function loadTupleBuy(source: TupleReader) {
    let _tonAmount = source.readBigNumber();
    let _minOut = source.readBigNumber();
    let _referrer = source.readAddress();
    let _referrerDl1 = source.readAddress();
    let _referrerDl2 = source.readAddress();
    let _treasury = source.readAddress();
    let _trader = source.readAddress();
    return { $$type: 'Buy' as const, tonAmount: _tonAmount, minOut: _minOut, referrer: _referrer, referrerDl1: _referrerDl1, referrerDl2: _referrerDl2, treasury: _treasury, trader: _trader };
}

function storeTupleBuy(source: Buy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tonAmount);
    builder.writeNumber(source.minOut);
    builder.writeAddress(source.referrer);
    builder.writeAddress(source.referrerDl1);
    builder.writeAddress(source.referrerDl2);
    builder.writeAddress(source.treasury);
    builder.writeAddress(source.trader);
    return builder.build();
}

function dictValueParserBuy(): DictionaryValue<Buy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuy(src)).endCell());
        },
        parse: (src) => {
            return loadBuy(src.loadRef().beginParse());
        }
    }
}

export type BuyCall = {
    $$type: 'BuyCall';
    tonAmount: bigint;
    minOut: bigint;
    referrer: Address;
    jetton: Address;
}

export function storeBuyCall(src: BuyCall) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2899486129, 32);
        b_0.storeInt(src.tonAmount, 257);
        b_0.storeInt(src.minOut, 257);
        b_0.storeAddress(src.referrer);
        let b_1 = new Builder();
        b_1.storeAddress(src.jetton);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBuyCall(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2899486129) { throw Error('Invalid prefix'); }
    let _tonAmount = sc_0.loadIntBig(257);
    let _minOut = sc_0.loadIntBig(257);
    let _referrer = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _jetton = sc_1.loadAddress();
    return { $$type: 'BuyCall' as const, tonAmount: _tonAmount, minOut: _minOut, referrer: _referrer, jetton: _jetton };
}

function loadTupleBuyCall(source: TupleReader) {
    let _tonAmount = source.readBigNumber();
    let _minOut = source.readBigNumber();
    let _referrer = source.readAddress();
    let _jetton = source.readAddress();
    return { $$type: 'BuyCall' as const, tonAmount: _tonAmount, minOut: _minOut, referrer: _referrer, jetton: _jetton };
}

function storeTupleBuyCall(source: BuyCall) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tonAmount);
    builder.writeNumber(source.minOut);
    builder.writeAddress(source.referrer);
    builder.writeAddress(source.jetton);
    return builder.build();
}

function dictValueParserBuyCall(): DictionaryValue<BuyCall> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuyCall(src)).endCell());
        },
        parse: (src) => {
            return loadBuyCall(src.loadRef().beginParse());
        }
    }
}

export type SellCall = {
    $$type: 'SellCall';
    referrer: Address;
    jetton: Address;
    jettonAmount: bigint;
    minTonOut: bigint;
}

export function storeSellCall(src: SellCall) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3845534568, 32);
        b_0.storeAddress(src.referrer);
        b_0.storeAddress(src.jetton);
        b_0.storeInt(src.jettonAmount, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.minTonOut, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSellCall(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3845534568) { throw Error('Invalid prefix'); }
    let _referrer = sc_0.loadAddress();
    let _jetton = sc_0.loadAddress();
    let _jettonAmount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _minTonOut = sc_1.loadIntBig(257);
    return { $$type: 'SellCall' as const, referrer: _referrer, jetton: _jetton, jettonAmount: _jettonAmount, minTonOut: _minTonOut };
}

function loadTupleSellCall(source: TupleReader) {
    let _referrer = source.readAddress();
    let _jetton = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    let _minTonOut = source.readBigNumber();
    return { $$type: 'SellCall' as const, referrer: _referrer, jetton: _jetton, jettonAmount: _jettonAmount, minTonOut: _minTonOut };
}

function storeTupleSellCall(source: SellCall) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.referrer);
    builder.writeAddress(source.jetton);
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.minTonOut);
    return builder.build();
}

function dictValueParserSellCall(): DictionaryValue<SellCall> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSellCall(src)).endCell());
        },
        parse: (src) => {
            return loadSellCall(src.loadRef().beginParse());
        }
    }
}

export type Sell = {
    $$type: 'Sell';
    referrerDl1: Address;
    referrerDl2: Address;
    treasury: Address;
    trader: Address;
    jettonAmount: bigint;
    minTonOut: bigint;
    referrer: Address;
}

export function storeSell(src: Sell) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(996885798, 32);
        b_0.storeAddress(src.referrerDl1);
        b_0.storeAddress(src.referrerDl2);
        b_0.storeAddress(src.treasury);
        let b_1 = new Builder();
        b_1.storeAddress(src.trader);
        b_1.storeInt(src.jettonAmount, 257);
        b_1.storeInt(src.minTonOut, 257);
        let b_2 = new Builder();
        b_2.storeAddress(src.referrer);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSell(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 996885798) { throw Error('Invalid prefix'); }
    let _referrerDl1 = sc_0.loadAddress();
    let _referrerDl2 = sc_0.loadAddress();
    let _treasury = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _trader = sc_1.loadAddress();
    let _jettonAmount = sc_1.loadIntBig(257);
    let _minTonOut = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _referrer = sc_2.loadAddress();
    return { $$type: 'Sell' as const, referrerDl1: _referrerDl1, referrerDl2: _referrerDl2, treasury: _treasury, trader: _trader, jettonAmount: _jettonAmount, minTonOut: _minTonOut, referrer: _referrer };
}

function loadTupleSell(source: TupleReader) {
    let _referrerDl1 = source.readAddress();
    let _referrerDl2 = source.readAddress();
    let _treasury = source.readAddress();
    let _trader = source.readAddress();
    let _jettonAmount = source.readBigNumber();
    let _minTonOut = source.readBigNumber();
    let _referrer = source.readAddress();
    return { $$type: 'Sell' as const, referrerDl1: _referrerDl1, referrerDl2: _referrerDl2, treasury: _treasury, trader: _trader, jettonAmount: _jettonAmount, minTonOut: _minTonOut, referrer: _referrer };
}

function storeTupleSell(source: Sell) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.referrerDl1);
    builder.writeAddress(source.referrerDl2);
    builder.writeAddress(source.treasury);
    builder.writeAddress(source.trader);
    builder.writeNumber(source.jettonAmount);
    builder.writeNumber(source.minTonOut);
    builder.writeAddress(source.referrer);
    return builder.build();
}

function dictValueParserSell(): DictionaryValue<Sell> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSell(src)).endCell());
        },
        parse: (src) => {
            return loadSell(src.loadRef().beginParse());
        }
    }
}

export type RefReward = {
    $$type: 'RefReward';
    totalFee: bigint;
    level: bigint;
}

export function storeRefReward(src: RefReward) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2612053845, 32);
        b_0.storeInt(src.totalFee, 257);
        b_0.storeUint(src.level, 8);
    };
}

export function loadRefReward(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2612053845) { throw Error('Invalid prefix'); }
    let _totalFee = sc_0.loadIntBig(257);
    let _level = sc_0.loadUintBig(8);
    return { $$type: 'RefReward' as const, totalFee: _totalFee, level: _level };
}

function loadTupleRefReward(source: TupleReader) {
    let _totalFee = source.readBigNumber();
    let _level = source.readBigNumber();
    return { $$type: 'RefReward' as const, totalFee: _totalFee, level: _level };
}

function storeTupleRefReward(source: RefReward) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalFee);
    builder.writeNumber(source.level);
    return builder.build();
}

function dictValueParserRefReward(): DictionaryValue<RefReward> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRefReward(src)).endCell());
        },
        parse: (src) => {
            return loadRefReward(src.loadRef().beginParse());
        }
    }
}

export type ClaimToken = {
    $$type: 'ClaimToken';
    owner: Address;
}

export function storeClaimToken(src: ClaimToken) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3448293312, 32);
        b_0.storeAddress(src.owner);
    };
}

export function loadClaimToken(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3448293312) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    return { $$type: 'ClaimToken' as const, owner: _owner };
}

function loadTupleClaimToken(source: TupleReader) {
    let _owner = source.readAddress();
    return { $$type: 'ClaimToken' as const, owner: _owner };
}

function storeTupleClaimToken(source: ClaimToken) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserClaimToken(): DictionaryValue<ClaimToken> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimToken(src)).endCell());
        },
        parse: (src) => {
            return loadClaimToken(src.loadRef().beginParse());
        }
    }
}

export type BounceRefReward = {
    $$type: 'BounceRefReward';
}

export function storeBounceRefReward(src: BounceRefReward) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1581473893, 32);
    };
}

export function loadBounceRefReward(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1581473893) { throw Error('Invalid prefix'); }
    return { $$type: 'BounceRefReward' as const };
}

function loadTupleBounceRefReward(source: TupleReader) {
    return { $$type: 'BounceRefReward' as const };
}

function storeTupleBounceRefReward(source: BounceRefReward) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserBounceRefReward(): DictionaryValue<BounceRefReward> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBounceRefReward(src)).endCell());
        },
        parse: (src) => {
            return loadBounceRefReward(src.loadRef().beginParse());
        }
    }
}

export type CreateEvent = {
    $$type: 'CreateEvent';
    content: Cell;
    jetton: Address;
    creator: Address;
}

export function storeCreateEvent(src: CreateEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3423593101, 32);
        b_0.storeRef(src.content);
        b_0.storeAddress(src.jetton);
        b_0.storeAddress(src.creator);
    };
}

export function loadCreateEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3423593101) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    let _jetton = sc_0.loadAddress();
    let _creator = sc_0.loadAddress();
    return { $$type: 'CreateEvent' as const, content: _content, jetton: _jetton, creator: _creator };
}

function loadTupleCreateEvent(source: TupleReader) {
    let _content = source.readCell();
    let _jetton = source.readAddress();
    let _creator = source.readAddress();
    return { $$type: 'CreateEvent' as const, content: _content, jetton: _jetton, creator: _creator };
}

function storeTupleCreateEvent(source: CreateEvent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    builder.writeAddress(source.jetton);
    builder.writeAddress(source.creator);
    return builder.build();
}

function dictValueParserCreateEvent(): DictionaryValue<CreateEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCreateEvent(src.loadRef().beginParse());
        }
    }
}

export type CompleteEvent = {
    $$type: 'CompleteEvent';
    jetton: Address;
}

export function storeCompleteEvent(src: CompleteEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1031653633, 32);
        b_0.storeAddress(src.jetton);
    };
}

export function loadCompleteEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1031653633) { throw Error('Invalid prefix'); }
    let _jetton = sc_0.loadAddress();
    return { $$type: 'CompleteEvent' as const, jetton: _jetton };
}

function loadTupleCompleteEvent(source: TupleReader) {
    let _jetton = source.readAddress();
    return { $$type: 'CompleteEvent' as const, jetton: _jetton };
}

function storeTupleCompleteEvent(source: CompleteEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.jetton);
    return builder.build();
}

function dictValueParserCompleteEvent(): DictionaryValue<CompleteEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompleteEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCompleteEvent(src.loadRef().beginParse());
        }
    }
}

export type TradeEvent = {
    $$type: 'TradeEvent';
    tonAmount: bigint;
    jettonAmount: bigint;
    jetton: Address;
    virtualTonReserve: bigint;
    virtualTokenReserve: bigint;
    trader: Address;
    isBuy: boolean;
    balance: bigint;
}

export function storeTradeEvent(src: TradeEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1903324553, 32);
        b_0.storeInt(src.tonAmount, 257);
        b_0.storeInt(src.jettonAmount, 257);
        b_0.storeAddress(src.jetton);
        let b_1 = new Builder();
        b_1.storeInt(src.virtualTonReserve, 257);
        b_1.storeInt(src.virtualTokenReserve, 257);
        b_1.storeAddress(src.trader);
        b_1.storeBit(src.isBuy);
        let b_2 = new Builder();
        b_2.storeInt(src.balance, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTradeEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1903324553) { throw Error('Invalid prefix'); }
    let _tonAmount = sc_0.loadIntBig(257);
    let _jettonAmount = sc_0.loadIntBig(257);
    let _jetton = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _virtualTonReserve = sc_1.loadIntBig(257);
    let _virtualTokenReserve = sc_1.loadIntBig(257);
    let _trader = sc_1.loadAddress();
    let _isBuy = sc_1.loadBit();
    let sc_2 = sc_1.loadRef().beginParse();
    let _balance = sc_2.loadIntBig(257);
    return { $$type: 'TradeEvent' as const, tonAmount: _tonAmount, jettonAmount: _jettonAmount, jetton: _jetton, virtualTonReserve: _virtualTonReserve, virtualTokenReserve: _virtualTokenReserve, trader: _trader, isBuy: _isBuy, balance: _balance };
}

function loadTupleTradeEvent(source: TupleReader) {
    let _tonAmount = source.readBigNumber();
    let _jettonAmount = source.readBigNumber();
    let _jetton = source.readAddress();
    let _virtualTonReserve = source.readBigNumber();
    let _virtualTokenReserve = source.readBigNumber();
    let _trader = source.readAddress();
    let _isBuy = source.readBoolean();
    let _balance = source.readBigNumber();
    return { $$type: 'TradeEvent' as const, tonAmount: _tonAmount, jettonAmount: _jettonAmount, jetton: _jetton, virtualTonReserve: _virtualTonReserve, virtualTokenReserve: _virtualTokenReserve, trader: _trader, isBuy: _isBuy, balance: _balance };
}

function storeTupleTradeEvent(source: TradeEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tonAmount);
    builder.writeNumber(source.jettonAmount);
    builder.writeAddress(source.jetton);
    builder.writeNumber(source.virtualTonReserve);
    builder.writeNumber(source.virtualTokenReserve);
    builder.writeAddress(source.trader);
    builder.writeBoolean(source.isBuy);
    builder.writeNumber(source.balance);
    return builder.build();
}

function dictValueParserTradeEvent(): DictionaryValue<TradeEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTradeEvent(src)).endCell());
        },
        parse: (src) => {
            return loadTradeEvent(src.loadRef().beginParse());
        }
    }
}

export type ClaimEvent = {
    $$type: 'ClaimEvent';
    jetton: Address;
    user: Address;
    balance: bigint;
}

export function storeClaimEvent(src: ClaimEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2391411747, 32);
        b_0.storeAddress(src.jetton);
        b_0.storeAddress(src.user);
        b_0.storeInt(src.balance, 257);
    };
}

export function loadClaimEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2391411747) { throw Error('Invalid prefix'); }
    let _jetton = sc_0.loadAddress();
    let _user = sc_0.loadAddress();
    let _balance = sc_0.loadIntBig(257);
    return { $$type: 'ClaimEvent' as const, jetton: _jetton, user: _user, balance: _balance };
}

function loadTupleClaimEvent(source: TupleReader) {
    let _jetton = source.readAddress();
    let _user = source.readAddress();
    let _balance = source.readBigNumber();
    return { $$type: 'ClaimEvent' as const, jetton: _jetton, user: _user, balance: _balance };
}

function storeTupleClaimEvent(source: ClaimEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.jetton);
    builder.writeAddress(source.user);
    builder.writeNumber(source.balance);
    return builder.build();
}

function dictValueParserClaimEvent(): DictionaryValue<ClaimEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimEvent(src)).endCell());
        },
        parse: (src) => {
            return loadClaimEvent(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type BondingCurveData = {
    $$type: 'BondingCurveData';
    virtualTonReserve: bigint;
    virtualTokenReserve: bigint;
    complete: boolean;
    liquidityAdded: boolean;
    jettonCreator: Address;
    tokenDebt: bigint;
    myJettonWalletAddress: Address;
}

export function storeBondingCurveData(src: BondingCurveData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.virtualTonReserve, 257);
        b_0.storeInt(src.virtualTokenReserve, 257);
        b_0.storeBit(src.complete);
        b_0.storeBit(src.liquidityAdded);
        b_0.storeAddress(src.jettonCreator);
        let b_1 = new Builder();
        b_1.storeInt(src.tokenDebt, 257);
        b_1.storeAddress(src.myJettonWalletAddress);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBondingCurveData(slice: Slice) {
    let sc_0 = slice;
    let _virtualTonReserve = sc_0.loadIntBig(257);
    let _virtualTokenReserve = sc_0.loadIntBig(257);
    let _complete = sc_0.loadBit();
    let _liquidityAdded = sc_0.loadBit();
    let _jettonCreator = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _tokenDebt = sc_1.loadIntBig(257);
    let _myJettonWalletAddress = sc_1.loadAddress();
    return { $$type: 'BondingCurveData' as const, virtualTonReserve: _virtualTonReserve, virtualTokenReserve: _virtualTokenReserve, complete: _complete, liquidityAdded: _liquidityAdded, jettonCreator: _jettonCreator, tokenDebt: _tokenDebt, myJettonWalletAddress: _myJettonWalletAddress };
}

function loadTupleBondingCurveData(source: TupleReader) {
    let _virtualTonReserve = source.readBigNumber();
    let _virtualTokenReserve = source.readBigNumber();
    let _complete = source.readBoolean();
    let _liquidityAdded = source.readBoolean();
    let _jettonCreator = source.readAddress();
    let _tokenDebt = source.readBigNumber();
    let _myJettonWalletAddress = source.readAddress();
    return { $$type: 'BondingCurveData' as const, virtualTonReserve: _virtualTonReserve, virtualTokenReserve: _virtualTokenReserve, complete: _complete, liquidityAdded: _liquidityAdded, jettonCreator: _jettonCreator, tokenDebt: _tokenDebt, myJettonWalletAddress: _myJettonWalletAddress };
}

function storeTupleBondingCurveData(source: BondingCurveData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.virtualTonReserve);
    builder.writeNumber(source.virtualTokenReserve);
    builder.writeBoolean(source.complete);
    builder.writeBoolean(source.liquidityAdded);
    builder.writeAddress(source.jettonCreator);
    builder.writeNumber(source.tokenDebt);
    builder.writeAddress(source.myJettonWalletAddress);
    return builder.build();
}

function dictValueParserBondingCurveData(): DictionaryValue<BondingCurveData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBondingCurveData(src)).endCell());
        },
        parse: (src) => {
            return loadBondingCurveData(src.loadRef().beginParse());
        }
    }
}

export type ReferralData = {
    $$type: 'ReferralData';
    owner: Address;
    referrer: Address;
    isInitializedByFactory: boolean;
    factory: Address;
}

export function storeReferralData(src: ReferralData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.referrer);
        b_0.storeBit(src.isInitializedByFactory);
        b_0.storeAddress(src.factory);
    };
}

export function loadReferralData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _referrer = sc_0.loadAddress();
    let _isInitializedByFactory = sc_0.loadBit();
    let _factory = sc_0.loadAddress();
    return { $$type: 'ReferralData' as const, owner: _owner, referrer: _referrer, isInitializedByFactory: _isInitializedByFactory, factory: _factory };
}

function loadTupleReferralData(source: TupleReader) {
    let _owner = source.readAddress();
    let _referrer = source.readAddress();
    let _isInitializedByFactory = source.readBoolean();
    let _factory = source.readAddress();
    return { $$type: 'ReferralData' as const, owner: _owner, referrer: _referrer, isInitializedByFactory: _isInitializedByFactory, factory: _factory };
}

function storeTupleReferralData(source: ReferralData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.referrer);
    builder.writeBoolean(source.isInitializedByFactory);
    builder.writeAddress(source.factory);
    return builder.build();
}

function dictValueParserReferralData(): DictionaryValue<ReferralData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReferralData(src)).endCell());
        },
        parse: (src) => {
            return loadReferralData(src.loadRef().beginParse());
        }
    }
}

export type OutputTokenAmountReturn = {
    $$type: 'OutputTokenAmountReturn';
    amountOut: bigint;
    tax: bigint;
    remainNativeAmount: bigint;
}

export function storeOutputTokenAmountReturn(src: OutputTokenAmountReturn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.amountOut, 257);
        b_0.storeInt(src.tax, 257);
        b_0.storeInt(src.remainNativeAmount, 257);
    };
}

export function loadOutputTokenAmountReturn(slice: Slice) {
    let sc_0 = slice;
    let _amountOut = sc_0.loadIntBig(257);
    let _tax = sc_0.loadIntBig(257);
    let _remainNativeAmount = sc_0.loadIntBig(257);
    return { $$type: 'OutputTokenAmountReturn' as const, amountOut: _amountOut, tax: _tax, remainNativeAmount: _remainNativeAmount };
}

function loadTupleOutputTokenAmountReturn(source: TupleReader) {
    let _amountOut = source.readBigNumber();
    let _tax = source.readBigNumber();
    let _remainNativeAmount = source.readBigNumber();
    return { $$type: 'OutputTokenAmountReturn' as const, amountOut: _amountOut, tax: _tax, remainNativeAmount: _remainNativeAmount };
}

function storeTupleOutputTokenAmountReturn(source: OutputTokenAmountReturn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amountOut);
    builder.writeNumber(source.tax);
    builder.writeNumber(source.remainNativeAmount);
    return builder.build();
}

function dictValueParserOutputTokenAmountReturn(): DictionaryValue<OutputTokenAmountReturn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOutputTokenAmountReturn(src)).endCell());
        },
        parse: (src) => {
            return loadOutputTokenAmountReturn(src.loadRef().beginParse());
        }
    }
}

export type OutputTonAmountReturn = {
    $$type: 'OutputTonAmountReturn';
    amountOut: bigint;
    tax: bigint;
}

export function storeOutputTonAmountReturn(src: OutputTonAmountReturn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.amountOut, 257);
        b_0.storeInt(src.tax, 257);
    };
}

export function loadOutputTonAmountReturn(slice: Slice) {
    let sc_0 = slice;
    let _amountOut = sc_0.loadIntBig(257);
    let _tax = sc_0.loadIntBig(257);
    return { $$type: 'OutputTonAmountReturn' as const, amountOut: _amountOut, tax: _tax };
}

function loadTupleOutputTonAmountReturn(source: TupleReader) {
    let _amountOut = source.readBigNumber();
    let _tax = source.readBigNumber();
    return { $$type: 'OutputTonAmountReturn' as const, amountOut: _amountOut, tax: _tax };
}

function storeTupleOutputTonAmountReturn(source: OutputTonAmountReturn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amountOut);
    builder.writeNumber(source.tax);
    return builder.build();
}

function dictValueParserOutputTonAmountReturn(): DictionaryValue<OutputTonAmountReturn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOutputTonAmountReturn(src)).endCell());
        },
        parse: (src) => {
            return loadOutputTonAmountReturn(src.loadRef().beginParse());
        }
    }
}

export type DeployCurveParams = {
    $$type: 'DeployCurveParams';
    content: Cell;
}

export function storeDeployCurveParams(src: DeployCurveParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(5444227, 32);
        b_0.storeRef(src.content);
    };
}

export function loadDeployCurveParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 5444227) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'DeployCurveParams' as const, content: _content };
}

function loadTupleDeployCurveParams(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'DeployCurveParams' as const, content: _content };
}

function storeTupleDeployCurveParams(source: DeployCurveParams) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserDeployCurveParams(): DictionaryValue<DeployCurveParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployCurveParams(src)).endCell());
        },
        parse: (src) => {
            return loadDeployCurveParams(src.loadRef().beginParse());
        }
    }
}

 type Factory_init_args = {
    $$type: 'Factory_init_args';
    treasury: Address;
}

function initFactory_init_args(src: Factory_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.treasury);
    };
}

async function Factory_init(treasury: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initFactory_init_args({ $$type: 'Factory_init_args', treasury })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Factory_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    1039: { message: `cannot self refer` },
    2944: { message: `not factory` },
    4429: { message: `Invalid sender` },
    5306: { message: `invalid value for claim` },
    8685: { message: `complete` },
    16059: { message: `Invalid value` },
    16266: { message: `insufficient jetton balance` },
    17598: { message: `!complete` },
    18668: { message: `Can't Mint Anymore` },
    23951: { message: `Insufficient gas` },
    33172: { message: `ValueMustBeGreaterThanZero` },
    34036: { message: `no token to claim` },
    34744: { message: `ExceedsSlipage` },
    35772: { message: `!liquidityAdded` },
    41223: { message: `only factory can create` },
    42708: { message: `Invalid sender!` },
    43422: { message: `Invalid value - Burn` },
    58268: { message: `value too low` },
    62972: { message: `Invalid balance` },
}

const Factory_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Mint","header":2309184031,"fields":[]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"InitReferral","header":2966475482,"fields":[{"name":"referrer","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Buy","header":2901976294,"fields":[{"name":"tonAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minOut","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrerDl1","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrerDl2","type":{"kind":"simple","type":"address","optional":false}},{"name":"treasury","type":{"kind":"simple","type":"address","optional":false}},{"name":"trader","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BuyCall","header":2899486129,"fields":[{"name":"tonAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minOut","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SellCall","header":3845534568,"fields":[{"name":"referrer","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTonOut","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Sell","header":996885798,"fields":[{"name":"referrerDl1","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrerDl2","type":{"kind":"simple","type":"address","optional":false}},{"name":"treasury","type":{"kind":"simple","type":"address","optional":false}},{"name":"trader","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minTonOut","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RefReward","header":2612053845,"fields":[{"name":"totalFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"level","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"ClaimToken","header":3448293312,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BounceRefReward","header":1581473893,"fields":[]},
    {"name":"CreateEvent","header":3423593101,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"creator","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CompleteEvent","header":1031653633,"fields":[{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TradeEvent","header":1903324553,"fields":[{"name":"tonAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jettonAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"virtualTonReserve","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"virtualTokenReserve","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"trader","type":{"kind":"simple","type":"address","optional":false}},{"name":"isBuy","type":{"kind":"simple","type":"bool","optional":false}},{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ClaimEvent","header":2391411747,"fields":[{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BondingCurveData","header":null,"fields":[{"name":"virtualTonReserve","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"virtualTokenReserve","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"complete","type":{"kind":"simple","type":"bool","optional":false}},{"name":"liquidityAdded","type":{"kind":"simple","type":"bool","optional":false}},{"name":"jettonCreator","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenDebt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"myJettonWalletAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ReferralData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":false}},{"name":"isInitializedByFactory","type":{"kind":"simple","type":"bool","optional":false}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"OutputTokenAmountReturn","header":null,"fields":[{"name":"amountOut","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tax","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"remainNativeAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"OutputTonAmountReturn","header":null,"fields":[{"name":"amountOut","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tax","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DeployCurveParams","header":5444227,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
]

const Factory_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getBondingCurveInit","arguments":[{"name":"creator","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"getReferrer","arguments":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const Factory_getterMapping: { [key: string]: string } = {
    'balance': 'getBalance',
    'getBondingCurveInit': 'getGetBondingCurveInit',
    'getReferrer': 'getGetReferrer',
}

const Factory_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"DeployCurveParams"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BuyCall"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SellCall"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Factory implements Contract {
    
    static async init(treasury: Address) {
        return await Factory_init(treasury);
    }
    
    static async fromInit(treasury: Address) {
        const init = await Factory_init(treasury);
        const address = contractAddress(0, init);
        return new Factory(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Factory(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Factory_types,
        getters: Factory_getters,
        receivers: Factory_receivers,
        errors: Factory_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DeployCurveParams | BuyCall | SellCall | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployCurveParams') {
            body = beginCell().store(storeDeployCurveParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BuyCall') {
            body = beginCell().store(storeBuyCall(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SellCall') {
            body = beginCell().store(storeSellCall(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetBondingCurveInit(provider: ContractProvider, creator: Address, content: Cell) {
        let builder = new TupleBuilder();
        builder.writeAddress(creator);
        builder.writeCell(content);
        let source = (await provider.get('getBondingCurveInit', builder.build())).stack;
        const result = loadTupleStateInit(source.readTuple());
        return result;
    }
    
    async getGetReferrer(provider: ContractProvider, user: Address, referrer: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(user);
        builder.writeAddress(referrer);
        let source = (await provider.get('getReferrer', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}