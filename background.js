chrome.runtime.onInstalled.addListener(() => {
  // Opcja dla Cambridge Dictionary
  chrome.contextMenus.create({
    id: "lookupCambridge",
    title: "Szukaj w Cambridge Dictionary",
    contexts: ["selection"]
  });

  // Option for Collins Dictionary
  chrome.contextMenus.create({
    id: "lookupCollins",
    title: "Search in Collins Dictionary",
    contexts: ["selection"]
  });

  // Opcja dla Forvo
  chrome.contextMenus.create({
    id: "lookupForvo",
    title: "Search in Forvo",
    contexts: ["selection"]
  });

  // Opcja dla https://www.diki.pl/
  chrome.contextMenus.create({
    id: "lookupDiki",
    title: "Search in Diki",
    contexts: ["selection"]
  });


});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedText = info.selectionText.trim();
  if (selectedText.length > 0) {
    let url = "";
    if (info.menuItemId === "lookupCambridge") {
      url = "https://dictionary.cambridge.org/dictionary/english/" + encodeURIComponent(selectedText);
      url = url.replace(/%2B/g, "-");
    } else if (info.menuItemId === "lookupCollins") {
      url = "https://www.collinsdictionary.com/dictionary/english/" + encodeURIComponent(selectedText);
      url = url.replace(/%2B/g, "-");
      url = url.replace(/%20/g, "-");
    } else if (info.menuItemId === "lookupForvo") {
      url = "https://pl.forvo.com/search/" + encodeURIComponent(selectedText) + "/";
    } else if (info.menuItemId === "lookupDiki") {
      url = "https://diki.pl/slownik-angielskiego?q=" + encodeURIComponent(selectedText);
      url = url.replace(/%20/g, "+");
    }


    if (url) {
      chrome.tabs.create({ url: url });
    }
  }
});

