---
layout: lesson
title: Exploring Tari Template Library
date: 2024-05-27 12:00
author: Marcin Papież
thumbnail: learn-the-tari-codebase.png
lead: A Guide to Building Token Management Components
subtitle:
class: subpage
---

This guide delves into the **Tari Template Lib** library, showcasing how to build robust components for token management. We will start with warmup exercise and then we will explore three exercises, each focusing on a different type of resource: fungible tokens, non-fungible tokens (NFTs), and confidential tokens. Through these exercises, you will learn how to initialize components, manage state, and implement essential functionalities like withdrawals and minting, ensuring a comprehensive understanding of token management in blockchain applications.

### Prerequisites

- Basic understanding of Rust syntax and programming concepts.
- Basic familiarity with blockchain principles and token standards, including fungible and non-fungible tokens (NFTs).

## Exercise 1: Basic Counter Component

In this exercise, you will be working with a simple component named **Monerokon** using the **tari_template_lib** library. The component has a single piece of state, a **counter** of type `u32`. Follow these steps to complete the exercise:

1. Initialize component with a zero counter value
2. Implement the counter method to return the current value of the **counter**.
3. Implement the increase method to increment the counter value by 1.

{% include rustpen.html code="07_exercises/1.rs" %}

{% include toggle-solution.html id="1_a"
header="Toggle step 1"
code="07_exercises/1_a.rs"
%}

{% include toggle-solution.html id="1_b"
header="Toggle step 2"
code="07_exercises/1_b.rs"
%}

{% include toggle-solution.html id="1_c"
header="Toggle step 3"
code="07_exercises/1_c.rs"
%}

## Exercise 2: Fungible Resource

Implement functionalities to manage a Fungible Resource Token. The component will have two vaults: a **supply_vault** and a **fee_vault**. Users can withdraw tokens from the **supply_vault** by paying a flat **FEE**. Follow these steps to complete the exercise:

1. Define the **supply_vault** and the **fee_vault**.
2. Create a fungible resource using the **ResourceBuilder::fungible()** method. Define define initial supply.
3. Initialize the **supply_vault** from the fungible resource **bucket** and initialize the **fee_vault** as an empty **XTR** vault.
4. Add access rule which allows anyone to call the **withdraw** method
5. Implement the **get_balance** method: Create a function that returns the balance of the **supply_vault**.
6. Implement the **withdraw** method: Create a function that verifies if the fee amount is adequate, deposits it into the **fee_vault**, withdraws the requested amount from the **supply_vault**, and returns the withdrawn tokens as a **Bucket**.

{% include rustpen.html code="07_exercises/2.rs" %}

{% include toggle-solution.html id="2_a"
header="Toggle step 1"
code="07_exercises/2_a.rs"
%}

{% include toggle-solution.html id="2_b"
header="Toggle step 2"
code="07_exercises/2_b.rs"
%}

{% include toggle-solution.html id="2_c"
header="Toggle step 3"
code="07_exercises/2_c.rs"
%}

{% include toggle-solution.html id="2_d"
header="Toggle step 4"
code="07_exercises/2_d.rs"
%}

{% include toggle-solution.html id="2_e"
header="Toggle step 5"
code="07_exercises/2_e.rs"
%}

{% include toggle-solution.html id="2_f"
header="Toggle step 6"
code="07_exercises/2_f.rs"
%}

## Exercise 3: Non-Fungible Resource

Implement functionalities to manage a Non-Fungible Token (NFT) resource. The component allows to withdraw a requested token from vault, mint an NFT and deposit it into **nft_vault**. Follow these steps to complete the exercise:

1. Create a Non-Fungible resource with two NFTs in a new vault named **nft_vault**
2. In **withdraw** method, withdraw requested token from the **nft_vault** and return the **Bucket**
3. In **mint_non_fungible** method, mint an NFT providing **MyData** struct **data** and deposit it in the **nft_vault**

{% include rustpen.html code="07_exercises/3.rs" %}

{% include toggle-solution.html id="3_a"
header="Toggle step 1"
code="07_exercises/3_a.rs"
%}

{% include toggle-solution.html id="3_b"
header="Toggle step 2"
code="07_exercises/3_b.rs"
%}

{% include toggle-solution.html id="3_c"
header="Toggle step 3"
code="07_exercises/3_c.rs"
%}

## Exercise 4: Confidential Resource

Implement functionalities to manage a Confidential Token resource. The component allows the withdrawal of confidential tokens after verifying a flat fee is paid, depositing the fee into **fee_vault**. The **mint_confidential** method mints new confidential tokens and deposits them into **confidential_vault**. Follow these steps to complete the exercise:

1. Create a confidential resource with an initial supply. Create and set **confidential_vault** and empty **fee_vault**
2. In **withdraw** method, withdraw from confidential vault and return the **Bucket**.
3. In **mint_confidential** method, mint confidential tokens and deposit them in the **confidential_vault**

{% include rustpen.html code="07_exercises/4.rs" %}

{% include toggle-solution.html id="4_a"
header="Toggle step 1"
code="07_exercises/4_a.rs"
%}

{% include toggle-solution.html id="4_b"
header="Toggle step 2"
code="07_exercises/4_b.rs"
%}

{% include toggle-solution.html id="4_c"
header="Toggle step 3"
code="07_exercises/4_c.rs"
%}

## We're done, what's next?

I hope you have gained valuable hands-on experience through these exercises. I encourage you to continue your learning journey by exploring more advanced topics and developing innovative, secure blockchain applications. Here are some recommended resources to help you delve deeper into the Tari Universe:

* [`Tari Dan Repository`](https://github.com/tari-project/tari-dan)
* [`Tari Labs`](https://tlu.tarilabs.com/)