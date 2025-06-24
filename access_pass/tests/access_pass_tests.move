#[test_only]
module access_pass::access_pass_tests;

use access_pass::access_pass::{Self as accesspass, AccessPass};
use sui::test_scenario::{Self, next_tx};
use std::string;


#[test]
fun mint_and_unlock_pass() {

    let sender = @0xA;
    let mut scenario = test_scenario::begin(sender);

    next_tx(&mut scenario, sender);
    {
        accesspass::mint_pass(string::utf8(b"VIP Access"), test_scenario::ctx(&mut scenario));
    };

    next_tx(&mut scenario, sender);
    { 
        let pass = test_scenario::take_from_address<AccessPass>(&scenario, sender);
        accesspass::unlock_secret(&pass, test_scenario::ctx(&mut scenario));
        test_scenario::return_to_address<AccessPass>(sender, pass);
    };

    test_scenario::end(scenario);
}

#[test]
#[ext(should_abort(code = 0))] 
fun unlock_should_fail_if_wrong_owner() {
    let sender = @0xA;
    let not_owner = @0xB;

    let mut scenario = test_scenario::begin(sender);

    next_tx(&mut scenario, sender);
    {
        accesspass::mint_pass(string::utf8(b"Private"), test_scenario::ctx(&mut scenario));
    };

    next_tx(&mut scenario, not_owner);
    {
        let pass = test_scenario::take_from_address<AccessPass>(&scenario, sender);
        accesspass::unlock_secret(&pass, test_scenario::ctx(&mut scenario));
        test_scenario::return_to_address<AccessPass>(sender, pass);
    };

    test_scenario::end(scenario);

}
