let datas = [];
function getData(event) {
    event.preventDefault();

    let title = document.getElementById('input-blog-title').value;
    let content = document.getElementById('input-blog-content').value;
    let image = document.getElementById("input-blog-image").files;

    let nodejs = document.getElementById("nodejs").checked == true ? `<img id="nodejs" src="./assets/icons/nodejs.png" alt="">` : "";
    let nextjs = document.getElementById("nextjs").checked == true ? `<img id="nextjs" src="./assets/icons/nextjs.png" alt="">` : "";
    let reactjs = document.getElementById("reactjs").checked == true ? `<img id="reactjs" src="./assets/icons/reactjs.png" alt="" style="width:28px;">` : "";
    let typerscript = document.getElementById("typescript").checked == true ? `<img id="typescript" src="./assets/icons/typescript.png" alt="">` : "";
    
    image  = URL.createObjectURL(image[0]);

    let data = {
        title,
        content,
        image,
        posted: new Date(),
        author: 'Admin'
    }
    console.log(data);

    datas.push(data);
    console.log(datas);
    showData();
}
const showData = () => {
    document.getElementById("contents").innerHTML = '';
    for(let i = 0; i < datas.length; i++) {
        document.getElementById("contents").innerHTML += `
        <div class="blog-list-item">
          <div class="blog-image">
            <img src="${datas[i].image}" alt="" />
          </div>
          <div class="blog-content">
            <div class="btn-group">
              <button class="btn-edit">Edit Post</button>
              <button class="btn-post">Post Blog</button>
            </div>
            <h1>
              <a href="blog-detail.html" target="_blank"
                >${datas[i].title}</a
              >
            </h1>
            <div class="detail-blog-content">
              ${createTime(datas[i].posted)} | ${datas[i].author}
            </div>
            <p>
              ${datas[i].content}
            </p>
            <div style="float:right; margin: 10px">
              <p style="font-size: 15px; color:grey">${getDuration(datas[i].posted)}</p>
            </div>
          </div>
        </div>`
    }
}

function createTime(time) {
    let date = new Date(time);
    let day = date.getDate();
    let monthindex = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][monthindex - 1];

    return `${day} / ${month} / ${year} ${hour}:${minute} WIB`;
   
}

const timePosting = "Fri Feb 24 2023 12:34:59 GMT+0900 (Eastern Indonesia Time)"
const getDuration= (time) => {
  const miliSecond = 1000;
  const distance = new Date() - new Date(time);
  
  const dayDistance = Math.floor(distance / ( 24 * 60 * 60 * miliSecond));
  if (dayDistance > 0) {
    return dayDistance + " days ago"
}else{
  const hourDistance = Math.floor(distance / ( 60*60*miliSecond));
  if (hourDistance != 1) {
    return hourDistance + " hours ago"
  }else{
  const minuteDistance = Math.floor(distance / ( 60*miliSecond));
  if (minuteDistance >= 1) {
    return minuteDistance + " minutes ago"
  }else{
    const secondDistance = Math.floor(distance / ( 60*miliSecond));
  if (secondDistance != 1) {
    return secondDistance + "second ago"
  }
  }
}
}

}
getDuration(timePosting);
setInterval(showData, 1000);