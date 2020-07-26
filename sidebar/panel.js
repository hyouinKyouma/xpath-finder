var myWindowId;
const content1 = document.querySelector("#content1");
const content2 = document.querySelector("#content2");
const opt = document.getElementById("attributeXpath");
let tabActive = {isActive:true}


/*
Make the content box editable as soon as the user mouses over the sidebar.
*/
// window.addEventListener("mouseover", () => {
//   contentBox.setAttribute("contenteditable", true);
// });

content1.addEventListener("click", function(){
  tabActive.isActive = true
  console.log("tabActive", tabActive.isActive)
  // set it to empty
  let contentToStore = {attVal:''};
  browser.storage.local.set(contentToStore);
  event.preventDefault();
})

content2.addEventListener("click", function(){
  tabActive.isActive = false
  console.log("tabActive", tabActive.isActive)
  // browser.tabs.query({windowId: myWindowId, active: true}).then((tabs) => {
    // console.log("myWindowId",myWindowId)
    // console.log("active",active)
    let contentToStore = {attVal:''};
    contentToStore.attVal = opt.value;
    // console.log("contentToStore[tabs[0].url]",contentToStore[tabs[0].url])
    browser.storage.local.set(contentToStore);
  // });
  event.preventDefault();
})

// if(tabActive.isActive == false){
opt.addEventListener("change", function(){
  if(tabActive.isActive === true){
    console.log(opt.value)
  }else{
    console.log("NaN")
  }
});
  


/*
When the user mouses out, save the current contents of the box.
*/
// window.addEventListener("mouseout", () => {
//   contentBox.setAttribute("contenteditable", false);
//   browser.tabs.query({windowId: myWindowId, active: true}).then((tabs) => {
//     let contentToStore = {};
//     console.log("contentToStore+++",contentToStore[tabs[0].url])
//     console.log("contentToStore--++--->>",contentToStore)
//     console.log("contentBox.textContent==+++=>", contentBox.textContent)
//     contentToStore[tabs[0].url] = contentBox.textContent;
//     browser.storage.local.set(contentToStore);
//     // window.localStorage.setItem('name', 'Obaseki Nosa');

//   });
// });

/*
Update the sidebar's content.

1) Get the active tab in this sidebar's window.
2) Get its stored content.
3) Put it in the content box.
*/
function updateContent() {
  browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
      console.log("myWindowId",myWindowId)
      return browser.storage.local.get(tabs[0].url);
    })
    .then((storedInfo) => {
      opt.value = storedInfo[Object.keys(storedInfo)[0]];
    });
}


/*
Update content when a new tab becomes active.
*/
// browser.tabs.onActivated.addListener(updateContent);

/*
Update content when a new page is loaded into a tab.
*/
// browser.tabs.onUpdated.addListener(updateContent);

/*
When the sidebar loads, get the ID of its window,
and update its content.
*/
// browser.windows.getCurrent({populate: true}).then((windowInfo) => {
//   myWindowId = windowInfo.id;
//   updateContent();
// });


