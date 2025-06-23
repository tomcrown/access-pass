module access_pass::access_pass;

use std::string::{Self, String};


public struct AccessPass has key, store {
    id: UID,
    owner: address,
    label: String 
}


public fun mint_pass(label: String, ctx: &mut TxContext): AccessPass{
    let sender = tx_context::sender(ctx);
    AccessPass{
        id: object::new(ctx),
        owner: sender,
        label
    }
}