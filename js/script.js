'use strict';
function titleClickHandler(event){
    
    
  
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  /* add class 'active' to the clicked link */
  event.preventDefault();
  const clickedElement = this;
  clickedElement.classList.add('active');


  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }    

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  
  /* add class 'active' to the correct article */

    
  targetArticle.classList.add('active');
}
  
 



function generateTitleLinks(customSelector = ''){
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
 

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html='';
  for (let article of articles) {
    
    /* get the article id */
    const articleId=article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  

    /* get the title from the title element */
     
   
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
    /* insert link into titleList */
    html=html +linkHTML;
    

  }   
  titleList.innerHTML = html;

  

  /*insert listener to end*/ 
  
  const links = document.querySelectorAll('.titles a');
  

  for(let link of links){
    link.addEventListener('click', titleClickHandler);}

}
  

generateTitleLinks();
function calculateTagsParams(tags){
  const params = {max:0, min:99999};
 for(let tag in tags){
   if(tags[tag]> params.max){
     params.max = tags[tag];}
   if(tags[tag]<params.min){
     params.min = tags[tag];}
   
   
   console.log(tag + 'is used'+tags[tag] + 'times');
 
 }
  
return params;

}

const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-'; 

function calculateTagClass( count , params) {
const normalizedCount = count - params.min;
const normalizedMax = params.max - params.min;
const percentage = normalizedCount / normalizedMax;
const classNumber = Math.floor(percentage * (optCloudClassCount - 1)+1);

return optCloudClassPrefix + classNumber;
}

function generateTags(){
  const optArticleTagsSelector='.post-tags .list';
  const optArticleSelector = '.post';
  const optTagsListSelector='.tags.list';
 
   /* [NEW] create a new variable allTags with an empty object moduł 6.3 array zmienaimy na object */
   let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for (let article of articles) {
  /* find tags wrapper */
    const TagsWrapper = article.querySelector(optArticleTagsSelector);
    TagsWrapper.innerHTML='';
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    
  
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
  
      /* generate HTML of the link */
      const HTMLlink = '<li><a href="#tag-' + tag + '"><span>'+ tag +'</span></a></li> ';
      

      /* add generated code to html variable */
      html=html + HTMLlink;

      /* [NEW] check if this link is NOT already in allTags  to rowniez zmieniamy*/
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag]=1;
      } else{

      allTags[tag]++;  
      }
      



    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    TagsWrapper.innerHTML=html;
    
    /* END LOOP: for every article: */
  }
   /* [NEW] find list of tags in right column */
   const tagList = document.querySelector(optTagsListSelector);
   

   /*new create variable for all links HTML code*/
   const tagsParams = calculateTagsParams(allTags);
   console.log('tagsParams:', tagsParams);
   let allTagsHTML='';

   /*New START LOOP:for each tag in allTags*/
   for(let tag in allTags){
     const HTMLlink='<li><a href="#tag-' + tag + '"><span>'+ tag +'('+allTags[tag]+')</span></a></li>';/*alltags[tag] dodales do srodka linka zeby cyfra wystepowala kolo wyrazu!!!*/
     
     /* nowa linia dla dodania klasy i funkcji CalculateTagClass*/
     const tagLinkHTML = calculateTagClass(allTags[tag],tagsParams) +
    '<li><a href="#tag-' + tag + '"><span>'+ tag +'('+allTags[tag]+')</span></a></li>';
    console.log(tagLinkHTML);
     
    /*new generate code of a link and add it to allTagsHTML*/
   allTagsHTML+= HTMLlink;
   
   /*NEW end loop: for each tag in allTags*/ 
  }
  /*NEW add html from allTagsHTML to tagList*/
  tagList.innerHTML = allTagsHTML;

 
}
generateTags();

function tagClickHandler(event){
  
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');
  

  /* find all tag links with class active */
  const TagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let TagLink of TagsLinks){
    /* remove class active */
    TagLink.classList.remove('.active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allLinksTag = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let TagLink of allLinksTag) {
    /* add class active */
    TagLink.classList.add('.active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');}
function addClickListenersToTags(){
  const allTagLinks = '.list-horizontal li a';
  
  /* find all links to tags */
  const links = document.querySelectorAll(allTagLinks);
  /* START LOOP: for each link */
  for (let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  } 
}

addClickListenersToTags();

function generateAuthors(){
  const optArticleSelector = '.post';
  const optArticleWrapper = '.post-author';
  /*find articles*/
  const Articles = document.querySelectorAll(optArticleSelector);


  /*create a loop for every article*/
  for (let Articlelink of Articles){
  /*find  wrapper author-name and put innerHTML='' */
    const Wrapper = Articlelink.querySelector(optArticleWrapper);
    Wrapper.innerHTML='';
    /* make html variable with empty string */
    let html ='';
    /* get author-name from data-authors attribute */
    const getAuthorName = Articlelink.getAttribute('data-author');
  
  
    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + getAuthorName + '"><span>' + getAuthorName + '</span></a></li>';
  
  
    /* add generated code to html variable */
    html=html + linkHTML;
  
    /* insert HTML of all the links into the tags wrapper */
    Wrapper.innerHTML=html;
    /* END LOOP: for every article: */

  }
}
generateAuthors();

function AuthorClickHandler(event){
/* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement= this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href=clickedElement.getAttribute('href');

  /* make a new constant "author" and extract tag from the "href" constant */
  const author= href.replace('#author-','');

  /* find all authors links with class active */
  const AuthorsLinks=document.querySelectorAll('a.active[href^="#author"]');
  /* START LOOP: for each active tag link */
  for(let link of AuthorsLinks){
    /* remove class active */
    link.classList.remove('.active');
  /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const allAuthorlinks=document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */
  for(let authorlink of allAuthorlinks){
    /* add class active */
    authorlink.classList.add('.active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="'+ author +'"]');}

function addClickListenersToAuthors(){
  const AuthorsPosition= '.post-author li a';
  /* find all links to authors */
  const LinksAuthors=document.querySelectorAll(AuthorsPosition);


  /* START LOOP: for each link */
  for(let link of LinksAuthors){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click',AuthorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
 