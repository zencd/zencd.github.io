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
// window.addEventListener("focus", function() { console.log("Page got focus") });
startLP();

document.body.addEventListener('keyup', function(e) {
    const h1 = document.querySelector('h1')
    const slug = h1 ? h1.getAttribute('data-slug') : ''
    if (e.code == 'KeyE') {
        fetch('/edit?slug=' + slug);
    } else if (e.code == 'KeyY') {
        fetch('/ready?slug=' + slug);
    }
});