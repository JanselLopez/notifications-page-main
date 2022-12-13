class Notification{
 constructor(user,time){
    this.desc = "followed you"
    this.user = user
    this.time = time
 }
}
class NGroup extends Notification{
    constructor(user,time, group){
        super(user,time)
        super.desc = "has joined your group"
        this.group = group
     }
}
class NPost extends Notification{
    constructor(user,time, post){
        super(user,time)
        super.desc = "reacted to your recent post"
        this.post = post
     }
}
class NMessage extends Notification{
    constructor(user,time, message){
        super(user,time)
        super.desc = "sent you a private message"
        this.message = message
     }
}
class NPhoto extends Notification{
    constructor(user,time, photo){
        super(user,time)
        super.desc = "commented on your picture"
        this.photo = photo
    }
}

var users=[
    "Angela Gray",
    "Anna Kim",
    "Jacob Thompson",
    "Kimberly Smith",
    "Mark Webber",
    "Nathan Peterson",
    "Rizky Hasanuddin"
]
var circles = document.getElementsByClassName("red_circle")
var counter = document.getElementById("counter")
var notificationsSection = document.getElementById("notifications_section")
var articles = document.getElementsByTagName("article")
var stack = []
const NOTIFICATION_TYPES = 5

function addNotification(){
    let notification = getNotification(getRandomNumber(NOTIFICATION_TYPES))
    let article =  document.createElement('article')
    article.innerHTML = 
    `<img class="image_profile" src="assets/images/avatar-${getPhoto(notification.user)}.webp" alt="photo" width="60px">
    <div>
    <div class="header_notification">
    <p style="margin-bottom: 0px;">
    <strong class="interactive_text">${notification.user}</strong>
    <span class="alpha06"> ${notification.desc} </span> 
    <strong class="interactive_text">${(notification instanceof NGroup?notification.group:"")}</strong>
    <strong class="alpha06">${(notification instanceof NPost?notification.post:"")}</strong>
    </p><span class="red_circle"></span></div>
    <p class="time">${notification.time}</p>
    ${
        notification instanceof NMessage?`<p class="message alpha06">
        ${notification.message}
        </p>`:""
    }
    </div>
    ${
    notification instanceof NPhoto?`<img class="publish_photo" src="assets/images/image-chess.webp">`:""
    }`
    stack.unshift(article)
    
    notificationsSection.prepend(article)
    counter.innerText = +counter.innerText +1
}

function markAllAsRead(){
    for(let i = 0;i<circles.length;i++)
       circles[i].style.display = "none"

    for(let i =0;i<articles.length;i++){
        articles[i].style.backgroundColor = "transparent"
        articles[i].style.boxShadow = "0px 0px 0px"
    }
    counter.innerText = 0
}
function getPhoto(name) {
    return name.replace(" ","-").toLowerCase()
}
function getRandomNumber(size){
    return Math.floor(Math.random()*(size))
}

function getNotification(n){
    var user = users[getRandomNumber(users.length)]
    switch(n){
        case 0: return new Notification(user, "5m ago")
        case 1: return new NGroup(user, "1 day ago", "Chess Club")
        case 2: return new NMessage(user, "5 days ago", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit reiciendis distinctio, natus molestias voluptatibus nesciunt alias. Pariatur, delectus nostrum veritatis ratione cumque nemo. Alias similique veniam optio, maiores placeat modi.")
        case 3: return new NPhoto(user,"1 week ago","image-chess")
        case 4: return new NPost(user,"1m ago","My first tournament!")
    }
}