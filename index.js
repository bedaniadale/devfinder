

var results = document.querySelector(".ab-result")

var avatar = document.querySelector("#avatar")

var user_name = document.querySelector("#name")
var username = document.querySelector("#username")
var joined = document.querySelector("#joined")
var bio = document.querySelector("#bio")
var repos = document.querySelector("#repos")
var followers = document.querySelector("#followers")
var following = document.querySelector("#following")
var userlocation = document.querySelector("#location")
var social = document.querySelector("#social")
var git = document.querySelector("#git")

var searchBar = document.querySelector('#searchbar')
var searchButton = document.querySelector("#btn")

function convertDate(user) { 
    // 2023-01-25T06:10:01Z
    let myDate = user.split("T")[0].split("-")
    let month = ''; 
    switch(myDate[1]) { 
        case "01": 
            month = 'Jan'
            break 
        case "02": 
            month = 'Feb'
            break 
        case "03": 
            month = 'Mar' 
            break 
        case "04": 
            month = 'Apr' 
            break 
        case "05": 
            month = 'May'  
            break 
        case "06":
            month = 'Jun' 
            break 
        case "07": 
            month = 'Jul' 
            break; 
        case "08": 
            month = 'Aug'
            break; 
        case "09": 
            month = 'Sep' 
            break; 
        case "10": 
            month = 'Oct' 
            break; 
        case "11":
            month = 'Nov' 
            break;
        case "12": 
            month = 'Dec' 
    }

    return `${myDate[2]} ${month} ${myDate[0]} `
}

async function getUser(user)  {
    results.style.opacity = '0'
    let apiUrl = `https://api.github.com/users/${user}`
    let response = await fetch(apiUrl).then((res)=> {
        return res.json();
    })



    //getting data
    let avatarUrl = response.avatar_url
    let thisName = response.name == null ?  'Anonymous' : response.name
    let thisUname = `@${response.login}` 
    let thisJoined = response.created_at
    let thisBio = response.bio == null ?  'This profile has no bio' : response.bio 
    let thisRepos = response.public_repos
    let thisFollowers = response.followers
    let thisFollowing = response.following
    let thisLocation = response.location != null ?  response.location : 'n/a' 
    let thisSocial = response.twitter_username  != null ? `@${response.twitter_username}`: 'n/a'
    let thisGit = response.html_url.split("//")[1]

    //setting data
    avatar.src = avatarUrl
    user_name.innerHTML = thisName
    username.innerHTML  = thisUname
    joined.innerHTML = `Joined ${convertDate(thisJoined)}`
    bio.innerHTML = thisBio
    repos.innerHTML = thisRepos 
    followers.innerHTML = thisFollowers
    following.innerHTML = thisFollowing
    userlocation.innerHTML = thisLocation
    social.innerHTML = thisSocial
    git.innerHTML = thisGit

    //showing results 
    results.style.opacity = '1'



}

searchButton.addEventListener("click",() =>{ 
     if(searchBar.value) { 
        getUser(searchBar.value) 
        results.style.opacity = '1'
        return 
     }

     alert("Please input an username")
})