/*
executed on the dev profile
*/

(function() {
    async function startLP() {
      let doReload = false
      let cnt = 0
      let errCnt = 0
      while (true) {
        try {
          cnt++
          console.log('long polling fetch', cnt)
          let resp = await fetch('/lp');
          //console.log("response.ok: " + resp.ok);
          errCnt = 0
          if (resp.status == 200) {
            doReload = true
            break
          }
        } catch(e) {
          //console.log('startLP', e);
          await new Promise(r => setTimeout(r, 2000));
          if (errCnt++ >= 5) {
            console.info('too many errors, breaking LP');
            break
          }
        }
      }
      if (doReload) {
        console.log("reloading");
        window.location.reload();
      }
    }

    document.body.addEventListener('keydown', function(e) {
        const h1 = document.querySelector('h1')
        const slug = h1 ? h1.getAttribute('data-slug') : ''
        const anyMod = e.metaKey || e.shiftKey || e.ctrlKey || e.altKey;
        if (e.code == 'KeyE' && !anyMod) {
            fetch('/edit?slug=' + slug);
        } else if (e.code == 'KeyY' && !anyMod) {
            fetch('/ready?slug=' + slug);
        } else if (e.code == 'KeyR' && !anyMod) {
            fetch('/restart');
        }
    });

    function addDevProfileVisual() {
        const $div = document.createElement('div')
        $div.setAttribute('style', 'position: fixed; top: 0; left: 0; z-index: 1000; background: #440; color: orange; padding: 10px;')
        $div.innerHTML = '<a href="https://sovietgroove.com/">DEV</a>'
        document.body.appendChild($div)
    }

    // window.addEventListener("focus", function() { console.log("Page got focus") });
    startLP();
    addDevProfileVisual()
})()
