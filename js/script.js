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
  console.log(articles);
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
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);}

}
  

generateTitleLinks();

function generateTags(){
  const optArticleTagsSelector='.post-tags .list';
  const optArticleSelector = '.post';
  
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
      const HTMLlink = '<li><a href="#tag-' + tag + '"><span>'+ tag +'</span></a></li> &nbsp';
      

      /* add generated code to html variable */
      html=html + HTMLlink;


    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    TagsWrapper.innerHTML=html;
    
    /* END LOOP: for every article: */
  }
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
  /*find articles*/
const findAllArticles = document.querySelectorAll(optArticleSelector);

  /*create a loop for every article*/

  /*find  wrapper author-name and put innerHTML='' */

  /* make html variable with empty string */
  
  /* get author-name from data-authors attribute */
  
  /* generate HTML of the link */

  /* add generated code to html variable */

  /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */

}