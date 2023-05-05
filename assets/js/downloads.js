let OS = "";
const networks = ["mainnet", "testnet", "nextnet"]
let currentNetwork = "mainnet";
let pastNetwork = "mainnet";
let networkUrlData = {}
let currentOS = "";

function filterByNetwork(network) {
  $(".bin-row").addClass("hide");
  currentOS === "libWallet" ? $(".bin-row").removeClass("hide") : $(`.${network}`).removeClass("hide");
  network === "all-networks" && $(".bin-row").removeClass("hide");
}

function setDownloadLink() {
  networkUrlData[currentOS][currentNetwork].button.href = networkUrlData[currentOS][currentNetwork].url;
  networkUrlData[currentOS][currentNetwork].checksumDiv.innerHTML = networkUrlData[currentOS][currentNetwork].checksum;
}

function getOS() {
    let platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }

  OS = os;
}
getOS();


function selectedOs(element, cardElement) {
  let el = document.getElementById(element);
  let cardEl = document.getElementById(cardElement);
  let oldActiveBtn = document.getElementsByClassName("tab-button");
  let oldActive = document.getElementsByClassName("download-content");

  removeClass(oldActive);
  removeClass(oldActiveBtn);

  el.classList.add("active");
  cardEl.classList.add("active");

  $('.chip').removeClass("active-chip");
  $(`.past #${pastNetwork}.chip`).addClass("active-chip");

  switch (element) {
    case "ubuntu-btn":
      currentOS = "linux";
      break;
    case "windows-btn":
      currentOS = "windows";
      break;
    case "mac-btn":
      currentOS = "osx";
      break;
    case "support-btn":
      currentOS = "libWallet";
      break;
    default:
      currentOS = "linux";
  }
  $(`.current #${currentNetwork}.chip`).addClass("active-chip");
  filterByNetwork(pastNetwork);
  setDownloadLink();
}

function removeClass(elems) {
  for (let i = 0; i < elems.length; i++) {
    elems[i].classList.remove("active");
  }
}

jQuery(document).ready(function ($) {
  $(`.current #${currentNetwork}.chip`).addClass("active-chip");
  $(`.past #${pastNetwork}.chip`).addClass("active-chip");

  getS3Data();
  //get data
  function getS3Data() {
    $.ajax({
      url: Tari.s3BucketURL,
      headers: { "Access-Control-Allow-Origin": "*" },
      success: function (res) {
        groupDataByOs(res);
        setLatest(res);
        setDownloadLink();
      },
    });
  }

  function groupDataByOs(data) {
    renderBinaries(data["current/linux"], "linux");
    renderBinaries(data["current/windows"], "windows");
    renderBinaries(data["current/osx"], "osx");
    renderBinaries(data["current/libwallet"], "libWallet");
  }

  function renderBinaries(data, os) {
    let rawOs = os.replace("current/", "");
    let binContainer = document.getElementById(`${rawOs}BinID`);
    const dateOptions = { weekday: "long", month: "short", day: "numeric" };

    binContainer.innerHTML = data
      // The url comparison is to sort the zip/sha256 files.
       .sort((a, b) =>  {
        if (os === "libWallet") {
          return a.lastModified > b.lastModified || (a.lastModified == b.lastModified && a.url < b.url) ? -1 : 1
        } else {
          const pathA = a.path.split("/").pop();
          const pathB = b.path.split("/").pop();
          return pathA > pathB || (pathA == pathB && a.lastModified > b.lastModified) ? -1 : 1
        }
       })
      .map((binary, index) => {
        const lastMod = new Date(binary.lastModified);
        const formattedDate = lastMod.toLocaleString(undefined, dateOptions);
        const formattedTime = lastMod.getHours() + ":" + lastMod.getMinutes();
        const altClass = index % 2 ? "" : "alt-colour";
        const path = binary.path.split("/").pop();
    
        let networkClass = "";
        if (binary.path.includes("stagenet")) {
          networkClass = "stagenet";
        } else if (binary.path.includes("mainnet")) {
          networkClass = "mainnet";
        } else if (binary.path.includes("testnet")) {
          networkClass = "testnet";
        } else if (binary.path.includes("nextnet")) {
          networkClass = "nextnet";
        }

        return `<div class="bin-row ${altClass} ${networkClass} all-networks hide">
              <div class="bin-row-item bin-left" scope="row">
                <a href="${binary.url}">
                  ${path}
                </a>
                </div>
              <div class="bin-row-item bin-right">${formattedDate} at ${formattedTime}</div>
            </div>`;
      })
      .join("");
      filterByNetwork(pastNetwork);
  }


  function setLatest(data) {
  
    Object.keys(data).forEach((os) => {
      let rawOs = os.replace("current/", "");
      if (rawOs === os) {
        return;
      }
      if (rawOs !== "libwallet") {

        networks.forEach((network) => {
        let nets = data[os].filter((key) => key.path.includes(network));
        if(nets.length > 0) {
        let btn = document.getElementById(`${rawOs}DL`);
        let checkSumDiv = document.getElementById(`${rawOs}CSID`);


        let sha256 = "";
        // The url comparison is to sort the zip/sha256 files.
        let latest = nets.reduce((a, b) => a.lastModified > b.lastModified || (a.lastModified == b.lastModified && a.url < b.url) ? a : b)
        let checksum = latest.sha256;
        

        if (checksum) {
          sha256 = checksum.split(" ")[0];
        }
        
        latest.checksum = checksum ? `SHA256: ${sha256}` : ""

        latest.button = btn;
        latest.checksumDiv = checkSumDiv;

        if(!networkUrlData[rawOs]) {
          networkUrlData[rawOs] = {}
        }

        if(!networkUrlData[rawOs][network]) {
          networkUrlData[rawOs][network] = {}
        }

        networkUrlData[rawOs][network] = latest;
      }
    });
  }
});
}

  function setInitialActive(os) {
    switch (os) {
      case "Mac OS":
        $("#mac-btn").addClass("active");
        $("#mac").addClass("active");
        currentOS = "osx";
        break;
      case "Windows":
        $("#windows-btn").addClass("active");
        $("#windows").addClass("active");
        currentOS = "windows";
        break;
      default:
        $("#ubuntu-btn").addClass("active");
        $("#ubuntu").addClass("active");
        currentOS = "linux";
        break;
    }
  }
  setInitialActive(OS);

  $(".current .chip").click(function() {
    currentNetwork = $(this).attr("id");
    $(".current .chip").removeClass("active-chip");
    $(this).addClass("active-chip");  
    setDownloadLink();
  });

  $(".past .chip").click(function() {
      pastNetwork = $(this).attr("id");
      $(".past .chip").removeClass("active-chip");
      $(this).addClass("active-chip");
      filterByNetwork(pastNetwork);
  });

});
