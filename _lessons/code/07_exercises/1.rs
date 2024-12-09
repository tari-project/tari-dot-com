use tari_template_lib::prelude::*;

#[template]
mod template {
    use super::*;

    /// Defines the component state
    pub struct Monerokon {
        counter: u32,
    }

    impl Monerokon {
        /// Construct the component with no args
        pub fn new() -> Component<Self> {
            let state = Self {
                // TODO: Initialize component with a zero counter value
            };

            // Create the component
            Component::new(state).create()
        }

        pub fn counter(&self) -> u32 {
            todo!("Implement method to return the counter value")
        }

        pub fn increase(&mut self) {
            todo!("Mutate some state! Increase the counter value by 1")
        }
    }
}