```javascript
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({comments: {}}, function() {
        console.log("The comment storage is initialized.");
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "getComments") {
            chrome.storage.sync.get(['comments'], function(result) {
                sendResponse({comments: result.comments});
            });
            return true;
        } else if (request.action === "addComment") {
            chrome.storage.sync.get(['comments'], function(result) {
                let comments = result.comments;
                if (!comments[request.url]) {
                    comments[request.url] = [];
                }
                comments[request.url].push(request.comment);
                chrome.storage.sync.set({comments: comments}, function() {
                    sendResponse({status: "Comment added"});
                });
            });
            return true;
        }
    }
);
```