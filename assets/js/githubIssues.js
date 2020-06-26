
//get data
function getIssuesData() {
  $.ajax({
    url: Tari.issuesCachingURL,
    headers: { "Access-Control-Allow-Origin": "*" },
    success: function(res) {
      renderIssues(res);
    }
  });
}

function renderIssues(issuesData) {
  const githubIssues = Tari.githubIssues;
  githubIssues.forEach(repo => {
    let data = issuesData[repo.dataKey];
    let buckets = data.buckets;

    Object.keys(buckets).forEach(function(key) {
      renderTariIssues(buckets[key].data, `${repo.elementPrefix}-${key}`);

      renderSubtotalCount(
        buckets[key].total,
        `${repo.elementPrefix}-${key}-count`
      );

      renderCount(
        data.total,
        `${repo.elementPrefix}-count`,
        `${repo.elementPrefix}-view-all`
      );
    });
  });
}

function renderCount(count, countElement, linkElement) {
  let countContainer = document.getElementById(countElement);
  let countText = countContainer.querySelector(".issue-count-text");

  countText.innerHTML = count;

  let viewAllLink = document.getElementById(linkElement);
  viewAllLink.innerHTML = `View all ${count} issues on Github`;
}

function renderSubtotalCount(count, element) {
  let countContainer = document.getElementById(element);
  let countText = countContainer.querySelector(".sub-count");
  countText.innerHTML = count;
}

// render github issues
function renderTariIssues(data, containerID) {
  let pIssueContainer = document.getElementById(containerID);
  pIssueContainer.innerHTML = "";
  let ul = document.createElement("ul");
  ul.className = "issue-list";

  let now = new Date().toISOString();

  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      let li = document.createElement("li");
      li.className = "issue-container";
      ul.appendChild(li);

      let infoHolder = document.createElement("div");
      infoHolder.className = "issue-info";
      li.appendChild(infoHolder);

      let title = document.createElement("a");
      title.className = "issue-title";
      title.href = data[i].html_url;
      title.target = "_blank";
      title.innerHTML = data[i].title;

      infoHolder.appendChild(title);

      let tagline = document.createElement("div");
      tagline.className = "issue-tagline";
      tagline.innerHTML = `#${data[i].number} opened ${daysBetween(
        data[i].created_at,
        now
      )} days ago by ${data[i].user.login}`;

      infoHolder.appendChild(tagline);

      let issueBody = document.createElement("div");
      issueBody.className = "issue-body";

      //get length & trim if need be
      let body = data[i].body;
      if (body.length > 90) {
        body = body.substring(0, 90) + "...";
      }
      issueBody.innerHTML = body;

      infoHolder.appendChild(issueBody);

      let tagHolder = document.createElement("div");
      tagHolder.className = "tag-holder";

      let tags = data[i].labels;

      tags.forEach(renderTags);

      tags.forEach(function(tag) {
        tagHolder.appendChild(renderTags(tag));
      });

      infoHolder.appendChild(tagHolder);

      let viewIssueBtn = document.createElement("div");
      viewIssueBtn.className = "view-issue-btn";

      let viewIssueLink = document.createElement("a");
      viewIssueLink.className = "view-issue-link";
      viewIssueLink.href = data[i].html_url;
      viewIssueLink.target = "_blank";
      viewIssueLink.innerHTML = "View Issue";

      viewIssueBtn.appendChild(viewIssueLink);

      li.appendChild(viewIssueBtn);
    }
  } else {
    let pIssueContainer = document.getElementById(containerID);
    let noIssues = document.createElement("div");
    noIssues.className = "no-issues";
    noIssues.innerHTML = "No issues in this category currently.";
    pIssueContainer.appendChild(noIssues);
  }

  pIssueContainer.appendChild(ul);
}

function renderTags(tag) {
  let iTag = document.createElement("div");
  iTag.className = "issue-label";
  iTag.innerHTML = tag.name;
  iTag.style.backgroundColor = `#${tag.color}`;

  return iTag;
}

//handle tab switching

function tabSelected(element, tabContentElement) {
  $("div.tab-header").removeClass("active-header");
  $("div.tab-content").removeClass("active-tab");
  $("div.issue-holder").removeClass("active");
  $(element).addClass("active-header");
  $(tabContentElement).addClass("active-tab");

  switch (element) {
    case "#tab-one-h":
      $("#protocol-documentation-count").addClass("active");
      $("#protocol-documentation").addClass("active");
      break;
    case "#tab-two-h":
      $("#wallet-documentation-count").addClass("active");
      $("#wallet-documentation").addClass("active");
      break;
    default:
      break;
  }
}

//handle type nav for issues tabs
function categorySelected(element) {
  $("div.tab-nav-item").removeClass("active");
  $(element).addClass("active");

  $("div.issue-holder").removeClass("active");
  switch (element) {
    case "#protocol-documentation-count":
      $("#protocol-documentation").addClass("active");

      break;
    case "#protocol-tests-count":
      $("#protocol-tests").addClass("active");

      break;
    case "#protocol-other-count":
      $("#protocol-other").addClass("active");
      break;
    case "#wallet-documentation-count":
      $("#wallet-documentation").addClass("active");

      break;
    case "#wallet-tests-count":
      $("#wallet-tests").addClass("active");

      break;
    case "#wallet-other-count":
      $("#wallet-other").addClass("active");
      break;
    default:
      break;
  }
}

//get days between created @ and now
function daysBetween(date1String, date2String) {
  let d1 = new Date(date1String);
  let d2 = new Date(date2String);
  return Math.round((d2 - d1) / (1000 * 3600 * 24));
}

getIssuesData()
