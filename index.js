// ==UserScript==
// @name       Slack Grid Plus
// @author     http://github.com/gunar
// @version    1.0
// ==/UserScript==

(function() {
  'use strict';

  function getQueryParams(url) {
    const vars = []
    let hash
    const hashes = url.slice(url.indexOf('?') + 1).split('&')
    for (let i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=')
      vars[hash[0]] = hash[1]
    }
    return vars
  }

  function goToMessage(ev) {
    ev.preventDefault();
    const anchor = ev.target
    const url = $(anchor).data('referer-original-href')
    if (!url || !url.match(/\/\/[^.]+.slack.com\/archives/g) || url.includes(window.location.origin)) return
    const id = TS.utility.getChannelNameFromUrl(url)
    const ts = Number(TS.utility.getPathFromSlackUrl(url)[2].substr(1))/1000000
    const url_vars = getQueryParams(url)

    // No thread_ts given, so we're linking to a message
    if (!url_vars.thread_ts) return TS.client.ui.tryToJump(id, ts)

    // We are linking to a thread reply
    const model_ob = TS.shared.getModelObById(url_vars.cid)
    TS.ui.replies.openConversation(model_ob, url_vars.thread_ts)
  }

  $(document).on('click', 'a[data-referer-original-href*=".slack.com/archives"]', goToMessage)
})();
