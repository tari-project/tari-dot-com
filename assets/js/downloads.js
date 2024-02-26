let OS = "";
const networks = []
let options = [{
  os: "linux",
  arch: [],
  network: [],
},
{
  os: "windows",
  arch: [],
  network: [],
},
{
  os: "osx",
  arch: [],
  network: [],
}
];
let currentNetwork = networks[0];
let pastNetwork = networks[0];
let networkUrlData = {};
let currentOS = "";
let currentArch = "";
const pageLocation = window.location.href.split("/")[3];
const fileLocation = pageLocation === "launchpad" ? "launchpad/current" : "current";

function getArchValues() {
  options.forEach(({os, arch}) => {
    let selectElement = document.getElementById(`${os}ArchID`) || "";

    if (selectElement !== "") {
      for (let i = 0; i < selectElement.options.length; i++) {
        let optionValue = selectElement.options[i].value;
        arch.push(optionValue);
      }
      currentArch = arch[0];
    }
  });
}
getArchValues();

function getNetworkValues() {
  options.forEach(({os, network}) => {
    let selectElement = document.getElementById(`${os}NetworkID`) || "";

    if (selectElement !== "") {
      for (let i = 0; i < selectElement.options.length; i++) {
        let optionValue = selectElement.options[i].value;
        network.push(optionValue);
      }
    }
  });
  networks.push(...options[0].network);
  pastNetwork = networks[0];
}
getNetworkValues();

function ignoreFolders(data, foldersToIgnore) {
  return Object.entries(data).reduce((acc, [os, binaries]) => {
    const filteredBinaries = binaries.filter(binary => {
      return !foldersToIgnore.some(folder => binary.path.includes(folder));
    });
    acc[os] = filteredBinaries;
    return acc;
  }, {});
}

function filterByNetwork(network) {
  $(".bin-row").addClass("hide");
  currentOS === "libWallet" ? $(".bin-row").removeClass("hide") : $(`.${network}`).removeClass("hide");
  network === "all-networks" && $(".bin-row").removeClass("hide");
}

function downloadSelection() {
  $(`#${currentOS}NetworkID`).on("change", function() {
      var selectedValue = $(this).val();
      currentNetwork = selectedValue;
      setDownloadLink(currentOS, currentNetwork, currentArch);
  });

  $(`#${currentOS}ArchID`).on("change", function() {
      var selectedValue = $(this).val();
      currentArch = selectedValue;
      setDownloadLink(currentOS, currentNetwork, currentArch);
  });
}

function setDownloadLink(dlos, dlnetwork, dlarch) {
  if (
    networkUrlData[dlos] &&
    networkUrlData[dlos][dlnetwork] &&
    networkUrlData[dlos][dlnetwork][dlarch]
  ) {
    currentOS = dlos;
    currentNetwork = dlnetwork;
    currentArch = dlarch;
    networkUrlData[dlos][dlnetwork][dlarch].button.href = networkUrlData[dlos][dlnetwork][dlarch].url;
    networkUrlData[dlos][dlnetwork][dlarch].checksumDiv.innerHTML = networkUrlData[dlos][dlnetwork][dlarch].checksum;
    $(`#${currentOS}DL`).text(`Download for ${dlos === "osx" ? "Mac" : dlos === "windows" ? "Windows" : "Linux"}`);
    $(`#${currentOS}DL`).removeClass("disabled");
  } else {
    $(`#${currentOS}DL`).text("Download Unavailable");
    $(`#${currentOS}DL`).addClass("disabled");
  }
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

  // set default select values when switching OS
  $(`#${currentOS}NetworkID`).val(networks[0]);
  $(`#${currentOS}ArchID`).val(options.find(option => option.os === currentOS).arch[0]);

  // get values from select elements
  downloadSelection();

  // filter past versions by network
  filterByNetwork(pastNetwork);

  // set download link to latest version
  setDownloadLink(currentOS, networks[0], options.find(option => option.os === currentOS).arch[0]);
}

function removeClass(elems) {
  for (let i = 0; i < elems.length; i++) {
    elems[i].classList.remove("active");
  }
}

jQuery(document).ready(function ($) {
  $(`.past #${pastNetwork}.chip`).addClass("active-chip");

  getS3Data();
  // get data
  function getS3Data() {
    $.ajax({
      url: Tari.s3BucketURL,
      headers: { "Access-Control-Allow-Origin": "*" },
      success: function (res) {
        const foldersToIgnore = ["diag-utils"];
        const data = ignoreFolders(res, foldersToIgnore);
        const filteredKeys = Object.keys(data).filter(key => key.startsWith(fileLocation));
        const filteredData = {};
        filteredKeys.forEach(key => {
          filteredData[key] = data[key];
        });
        groupDataByOs(filteredData);
        setLatest(filteredData);
        setDownloadLink(currentOS, networks[0], options.find(option => option.os === currentOS).arch[0]);
        console.log("filteredData", filteredData);
      },
    });
  }

  function groupDataByOs(data) {
    renderBinaries(data[`${fileLocation}/linux`], "linux");
    renderBinaries(data[`${fileLocation}/windows`], "windows");
    renderBinaries(data[`${fileLocation}/osx`], "osx");
  }

  function renderBinaries(data, os) {
    let rawOs = os.replace(`${fileLocation}/`, "");
    let binContainer = document.getElementById(`${rawOs}BinID`);
    const dateOptions = { weekday: "short", month: "short", day: "numeric" };

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

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
        const formattedSize = formatFileSize(binary.size);

        let networkClass = "";
        for (let i = 0; i < networks.length; i++) {
          if (binary.path.includes(networks[i])) {
            networkClass = networks[i];
          }
        }

        return `<div class="bin-row ${altClass} ${networkClass} all-networks hide">
              <div class="bin-row-item bin-left" scope="row">
                <a href="${binary.url}">
                  ${path}
                </a>
                </div>
              <div class="bin-row-item bin-right">${formattedDate} at ${formattedTime}</div>
              <div class="bin-row-item bin-right">${formattedSize}</div>
            </div>`;
      })
      .join("");
      filterByNetwork(pastNetwork);
  }

  function setLatest(data) {
    // filter by os
    Object.keys(data).forEach((os) => {
      let rawOs = os.replace(`${fileLocation}/`, "");
      if (rawOs === os) {
        return;
      }
      if (rawOs !== "libwallet") {
  
        // filter by network
        networks.forEach((network) => {
          let nets = data[os].filter((key) => key.path.includes(network));
  
          // filter by architecture
          if (nets.length > 0) {
            let btn = document.getElementById(`${rawOs}DL`);
            let checkSumDiv = document.getElementById(`${rawOs}CSID`);
  
            let filteredUrls = {};
            options.forEach(({ os: archOs, arch: archList }) => {
              if (rawOs === archOs) {
  
                let filteredNetWithoutSha256 = nets.filter(net => !net.url.endsWith(".sha256"));
  
                archList.forEach((archItem) => {
                  let filteredNet = filteredNetWithoutSha256.filter((net) => net.path.includes(archItem));
                  if (filteredNet.length > 0) {
                    let latest = filteredNet.reduce((a, b) => a.lastModified > b.lastModified || (a.lastModified == b.lastModified && a.url < b.url) ? a : b);
                    filteredUrls[archItem] = latest;
                  }
                });
              }
            });
  
            // create object for each arch/network
            Object.keys(filteredUrls).forEach((arch) => {
              let latest = filteredUrls[arch];
              let sha256 = "";
              let checksum = latest.sha256;
  
              if (checksum) {
                sha256 = checksum.split(" ")[0];
              }
  
              latest.checksum = checksum ? `SHA256: ${sha256}` : "";
              latest.button = btn;
              latest.checksumDiv = checkSumDiv;
              latest.arch = arch;
  
              if (!networkUrlData[rawOs]) {
                networkUrlData[rawOs] = {};
              }
  
              if (!networkUrlData[rawOs][network]) {
                networkUrlData[rawOs][network] = {};
              }
  
              networkUrlData[rawOs][network][arch] = latest;

            });
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

  $(".past .chip").click(function() {
      pastNetwork = $(this).attr("id");
      $(".past .chip").removeClass("active-chip");
      $(this).addClass("active-chip");
      filterByNetwork(pastNetwork);
  });

  // get values from select elements
  downloadSelection();

});
