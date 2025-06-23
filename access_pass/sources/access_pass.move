module access_pass::access_pass;

use std::string::{String};


public struct AccessPass has key, store {
    id: UID,
    owner: address,
    label: String 
}

const EAccessDeclined: u64 = 0;

#[allow(lint(self_transfer))]
public fun mint_pass(label: String, ctx: &mut TxContext) {
    let sender = tx_context::sender(ctx);
    let pass =  AccessPass{
        id: object::new(ctx),
        owner: sender,
        label
    };
    transfer::public_transfer(pass, sender)
}


public entry fun unlock_secret(pass: &AccessPass, ctx: &mut TxContext) {
    let sender = tx_context::sender(ctx);
    assert!(pass.owner == sender, EAccessDeclined);
}


