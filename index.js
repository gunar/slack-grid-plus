// ==UserScript==
// @name       Slack Grid Plus
// @author     http://github.com/gunar
// @version    1.0
// ==/UserScript==

(function() {
  'use strict';
  setInterval(() => {
    $('a').each(function(index) {
      if (!this.href.match(/\/\/[^.]+.slack.com\/archives/g) || this.href.includes(window.location.origin)) return
      // this.style.border = '1px solid red'
      this.onclick = ev => {
        ev.preventDefault();
        const anchor = ev.target
        const id = TS.utility.getChannelNameFromUrl(anchor.href)
        TS.channels.displayChannel({ id })
        const ts = Number(TS.utility.getPathFromSlackUrl(anchor.href)[2].substr(1))/1000000
        setTimeout(() => {
          TS.client.ui.scrollMsgsSoMsgIsInView(ts, true, true, true)
        }, 500)
      }
    })
  }, 500)
})();
