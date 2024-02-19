---
layout: document
title: Tari | Launchpad
permalink: /launchpad-guide/
class: subpage blog
---

# Installing and running Tari Launchpad

## Step 1 - ⚓️ Docker ⚓️

Docker is a tool that packages software into standardized units called containers that have everything the software 
needs to run including libraries, system tools, code, and runtime.

Launchpad uses [Docker](https://www.docker.com/) to install, configure, and manage the 6 different services that
make up the Tari Layer One suite.

So if you don't have it on your machine, you need to install Docker before you can run Tari Launchpad.
You can download it from the docker website:

- [Docker for Mac](https://docs.docker.com/docker-for-mac/install/)
- [Docker for Windows](https://docs.docker.com/docker-for-windows/install/)
- [Docker for Linux](https://docs.docker.com/engine/install/)

Download the installer for your platform and follow the installation instructions. Once Docker is installed and
running, you can ignore it.

## Step 2 - ⬇️ Download Tari Launchpad ⬇️

You can download the Tari Launchpad from the [Launchpad download page]({{ site.baseurl }}/launchpad).

## Step 3 - 🚀️ Run Tari Launchpad ️🚀️

First unzip the downloaded archive. It's typically called `tari_launchpad_cli-v{ver}-{network}-{platform}.zip`.

You can usually run Tari Launchpad by double-clicking the extracted binary file.

<img src="/assets/launchpad/miner1p.webp" alt="Mining made easy" class="responsive-image">

<div class="note warning">
  On <b>MacOs</b> you may get a complaint that the file is from an unidentified developer. In this case, you 
  need to right-click the file and select "Open" from the context menu. A dialog box will ask if you're sure you want 
  to open the file.
  
  <p>Click "Open" to continue.</p>
</div>

You will be greeted by the Tari Launchpad dashboard.

<img src="/assets/launchpad/dashboard.png" alt="Tari Launchpad Dashboard" class="responsive-image">

## Step 4 - ⚙️ Configure launchpad ⚙️

### Copy your wallet's emoji id

Firstly, you need to copy your Tari wallet address into the "Wallet payment address" field. 

Depending on the Tari wallet you're using, grab a copy of your wallet's emoji id using the instructions from 
the relevant section below, then transfer the copied emoji id to the machine running Tari Launchpad.

You can do this by emailing the emoji id to yourself, send yourself an IM, or via any other suitable method.

On your launchpad machine, copy the emoji id into your clipboard, and then select the _Wallet payment address_ field
and hit **enter** so that it turns **yellow**. You can then paste the emoji id into the field using CTRL-V (or CMD-V 
on a Mac). 

Hit **enter** again to accept the changes. The input box changes back to **purple**.
      
#### From Tari Aurora

If you use the [Tari Aurora mobile wallet](https://aurora.tari.com), 
you can find your wallet address by clicking on the big emoji icon on Aurora's home screen, then tap
on your emoji id to expand it, and then tap "Copy emoji id".

The following video shows you how to copy your emoji id to your phone's clipboard.
             
<div align="center">
  <iframe width="560" height="315"  src="https://www.youtube.com/embed/Tg-uKtk5uPw?si=SOYa1rPzD_KRY9Tf" 
    title="Receiving Minotari" 
    allow="autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowfullscreen>
  </iframe>
</div>


#### From Minotari console wallet
If you use the [Tari CLI wallet](https://tari.com/download), your wallet address printed on the "Receive" tab, as 
shown below:

<img src="/assets/launchpad/console-wallet.png" alt="Console wallet Emoji ID" class="responsive-image">               

### (Optional) Monero mining address

Follow the same procedure you used to copy your Tari wallet address to copy your Monero mining address from your
Monero wallet to Launchpad.

If you don't have a Monero address, that's okay. You can still mine Tari without it.

## Step 5 - ⛏️ Mine! ⛏️

<div class="note">
  The first time you start mining, launchpad has to download and synchronize with the Tari blockchain.
  <br/>This can take up to an hour, so grab a ☕️ and hang tight.
</div>

### Merge mining with Monero

Hit the "M" key to start merge mining with Monero.

You'll see the `xmrig` and `MM proxy` containers fire up, and you should see `xmrig` taking up 50% - 100% of your CPU.

### Mining Tari SHA3X

Hit the "T" key to start mining Tari SHA3X.

You'll see the `Sha3Miner` container fire up, and it will taking up 50% - 100% of your CPU.

## Step 6 - 📈️ Profit 📈️

If you find a block, it will reflect in your wallet a few seconds after the block is found.
Be patient. Depending on your luck, and how many other miners are on the network, it can take a anything from a few
minutes to a few days to find a block.

<img src="/assets/launchpad/miner2p.webp" alt="Mining made easy" class="responsive-image">

# 🎬️ Tari Launchpad Video Guide 🎬️

We're still getting this ready for you, so please check back SOON™️

<img src="/assets/img/filming_mining.jpg" alt="Filming mining" class="responsive-image"/>
