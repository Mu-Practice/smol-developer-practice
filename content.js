```javascript
let comments = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'getComments') {
    chrome.storage.sync.get(['comments'], function(result) {
      comments = result.comments || [];
      sendResponse({comments: comments});
    });
  } else if (request.message === 'addComment') {
    comments.push(request.comment);
    chrome.storage.sync.set({comments: comments}, function() {
      sendResponse({status: 'Comment added'});
    });
  }
  return true;
});

window.addEventListener('load', () => {
  chrome.runtime.sendMessage({message: 'getComments'}, function(response) {
    comments = response.comments;
  });
});
```