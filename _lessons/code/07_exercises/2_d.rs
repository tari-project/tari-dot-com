Component::new(state)
.with_access_rules(
    ComponentAccessRules::new().add_method_rule("withdraw", AccessRule::AllowAll), // TODO: allow anyone to call the "withdraw" method
)
.create()