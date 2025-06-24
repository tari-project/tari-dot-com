---
layout: post
title: Tari Protocol Discussion 35
date: 2019-05-7 20:00
author: Tari Team
thumbnail: assets/img/posts/protocol-discussion-35.png
lead: Config files for Tari
class: subpage
---

On Thursday, the Tari community discussed the config strategy. Below is the TL;DR on Thursday's conversation (full transcript included below):

- Use config-rs
- Use TOML file format
- Use clap-rs for command line integration

Join us for our next discussion on Freenode in #tari-dev.

Discussion times proposed by the Tari community:

**Mondays: 6pm CAT (12pm EST)**

**Thursdays: 11am CAT (5am EST)**

To keep up with the latest Tari developments, you can follow the project on [Twitter](https://twitter.com/tari).

### Transcript of Thursday’s discussion

```
17:55 <Blackwolfsa>  Hi everyone, I thought we could talk about configs a bit, anyone have any options on them
18:02 <simian_za>  ini files?
18:02 <simian_za>  :P
18:04 <Hansie>  Do you want the configs to be cleverly handled? Or are we talking about binary dumps?
18:07 <Blackwolfsa>  Clearly
18:08 <stanimal>  Hi there, so suppose we need to go over: how would people want to deploy and use the Tari software as well as what format to use for configuration files (options are YAML, TOML and JSON - no not ini :P)
18:08 <Blackwolfsa>  I was thinking of using config-rs for the config handling, it can deseriliase to a struct, and do hahsmaps
18:09 <Blackwolfsa>  We could have multiple configs as well
18:09 <Blackwolfsa>  And it does uni for simian
18:09 <Blackwolfsa>  :P
18:09 <Blackwolfsa>  Ini
18:09 <simian_za>  Woot!
18:12 <neonknight64>  If more than one format is used, then samples for each type should be provided.
18:13 <Blackwolfsa>  As far as I know it works on a key value lookup. It even supports multiple formats at the same time if you want to be crazy
18:13 <simian_za>  Should probably just settle on one and run with it. Yaml and toml is better than json I think
18:15 <stanimal>  I suggest the precedence for configuration would be command line flags (for some config items perhaps), configuration file(s) and then environment variables - running software in docker would imply it's good to support environment variables, although configuration solely through environment variables may be unwieldy and it's completely fine to use
18:15 <stanimal>  a configuration file with docker
18:15 <stanimal>  As for the format, we want a format which supports comments - which leaves JSON out
18:16 <simian_za>  Agreed on that hierarchy
18:16 <simian_za>  So yaml vs toml? Opinions?
18:18 <Hansie>  stanimal: Can use of environment variables be seamlessly done between Linux/macOS and Windows using these tools?
18:18 <stanimal>  I think TOML is the best option, as it's very readable, it doesn't break randomly if you have a mistake in your indentation somewhere like yaml, you can nest keys in sections
18:19 <stanimal>  Hansie: Environment variables will have cross platform support with standard rust
18:19 <Hansie>  I was wondering about nesting...
18:19 <simian_za>  Also toml is used for rust so only have become familiar with one syntax
18:21 <Hansie>  "Tom's Obvious, Minimal Language"
18:21 <stanimal>  Technically, we could probably decide on the format by looking at the file extension and using the correct deserializer - but I'm hesitant to support multiple formats as that usually results in a mess
18:21 <Hansie>  I tend to agree with that stanimal
18:25 <neonknight64>  A single format that supports comments seem like the best choice. TOML ftw
18:26 <stanimal>  One thing YAML does is allows you to reference other keys in the configuration file (albeit with a somewhat ugly syntax) which could help DRY it up - AFAIK toml doesnt support this, but I somehow doubt that this will be needed in the config files
18:31 <Hansie>  Balckwolfsa, config-rs seems pretty solid.
18:31 <Hansie>  Blackwolfsa ^
18:32 <stanimal>  Agreed - looks great
18:32 <Blackwolfsa>  So looks like to toml has majority
18:33 <stanimal>  What about a command line handler - I've used https://github.com/clap-rs/clap in the past
clap-rs/clap
A full featured, fast Command Line Argument Parser for Rust - clap-rs/clap
18:34 <stanimal>  Seems to have minimal required dependencies 👍
18:34 <simian_za>  This is going to sound wrong but +1 for the Clap
18:35 <stanimal>  😆I've love to have the clap...
18:35 <stanimal>  ...in our project
18:36 <Blackwolfsa>  We need the clap
18:38 <Hansie>  Yip, looks great as well
18:52 <stanimal>  There's an issue for this: https://github.com/tari-project/tari/issues/250 - nice one to take if you're looking to start contributing. A good PR could be to add some code to base_layer to read from a given config file and deserialize to an empty config struct
Tari config file · Issue #250 · tari-project/tari
Design and build an easy to use and configure ConfigurationFile. Maybe there's a crate that can do this for us? TOML, YAML, JSON? Discuss
18:54 <Blackwolfsa>  Looking at the examples that would be a very easy issue if you want to contribute
```
