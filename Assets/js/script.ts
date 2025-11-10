const mainEle = document.getElementById('main');
const navItems = document.querySelectorAll(' .item');
const ntnShowMore = document.querySelector(' .show-more');
window.onload = async () => {
    
    let defaultTab = 'personal-info';
    if (location.hash){
        defaultTab = location.hash.replace("#",'');
    }
    // tim` the .item co # roi them vao 'active'
   const currentTab = document.querySelector(`.item[href="#${defaultTab}"]`);
    if (currentTab)
    {
        currentTab.classList.add('active'); 
    }
await loadTab(defaultTab);
};

navItems.forEach((navItem) => {
    (navItem as HTMLElement).onclick = async () => {

       event.preventDefault();
        
        let tabId = navItem.getAttribute('href')?.replace('#', '');
        
        if (tabId)
        {
        //remove
        navItems.forEach(nav => nav.classList.remove('active'))
        //add vao
        navItem.classList.add('active');
         await loadTab(tabId || '');
        }
        else {
            ntnShowMore?.classList.toggle('active');
             
        }
       
    };
});
const tabData = {
  'personal-info': '',
  'project': '',
  'skills': ''
};

async function loadTab(tabId: string) {
  if (!tabId) return;
  if (!tabData[tabId]) {
    const req = await fetch(`/tabs/${tabId}.html`);
    tabData[tabId] = await req.text();
  }

  if (mainEle) {
    mainEle.innerHTML = tabData[tabId];
  }
}