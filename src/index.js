import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: 'reactjs',
      videos: [],
      status: null ,
      linkurl: '',
      comment: '',
      commentsList: [],
      statusgo: 'Like',
      value: false
    };
  }


setSearchValue = (event) => {

this.setState({
  search: event.target.value
})
console.log(this.state.search)
}
searchVideo = async () => {
    this.setState({
    status: "Please Wait",
    value: false
  })
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${this.state.search}&type=video&videoDefinition=high&key=AIzaSyCRpGjlMMaW9oOzPtyuIYqs64Av_WMiRdA`);
const myJson = await response.json();
console.log("myJson " , myJson);
if(myJson.items.length == 0) {
  this.setState({
    value: true
  })
}
this.setState({
  videos: myJson.items
})
console.log(this.state.videos)
  this.setState({
    status: "Wait"
  })
}
showMostPopularVideos = async () => {
  this.setState({
    status: 'wait'
  })
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=15&regionCode=IN&key=AIzaSyDAyYIU0uRJadfSwFyYvrEhv86RfTGuqnM`);
const myJson = await response.json();
console.log("myJson " , myJson);
this.setState({
  videos: myJson.items,
  status: "wait"
})
console.log(this.state.videos)
this.setState({
  linkurl: this.state.videos[0].id.videoId
})
console.log("linkurl" , this.state.linkurl)
}
componentDidMount() {
  this.showMostPopularVideos()
  console.log("videos" , this.state.videos)
}
setCurrentUrl = (id) => {

  this.setState({
    linkurl: id
  })
}
setComment = (event) => {
  this.setState({
    comment: event.target.value
  })
}
addComment = () => {
  this.setState({
    commentsList: [...this.state.commentsList, this.state.comment],
    comment: ''
  })
}
likeButton = () => {
  if(this.state.statusgo == "Like"){
  this.setState({
    statusgo: 'Liked'
  })
  } else {
      this.setState({
    statusgo: 'Like'
  })
  }

}



  render() {
    let videos = this.state.videos.map(eachVideo => (
<img src={eachVideo.snippet.thumbnails.high.url} style={{ height: '300px', cursor:'pointer'}} onClick={()=> this.setCurrentUrl(eachVideo.id.videoId)} />
        ))
    return (
    
      <div >
        <input  style={{ marginLeft:"450px",width:"430px"}} placeholder="Search" onChange={this.setSearchValue} />
        <button  onClick={this.searchVideo}>Search</button>
        <br/>
      <div>
      <hr/>
      
{this.state.value ? (<h1>Nothing there</h1>): (
  <iframe src={`https://www.youtube.com/embed/${this.state.linkurl}`} style={{height: '350px', width: '850px', float : 'left'}}/>
)}


      </div>
      <br/>
     
        <br/>
        <br/>
        <br/>
        <div style={{ width: '410px', marginTop:"-60px", float : 'right'}}>
        {this.state.status == "Wait" ? (<h1>Loading...</h1>) : (videos) }
        </div>
         <div style={{display: 'block', float: 'left'}}>
    <button  style={ {
  marginLeft: "775px" ,backgroundColor:" red",padding:'12px'}}onClick={this.likeButton}>{this.state.statusgo}</button>
{this.state.commentsList.map(eachComment => (
  <li>{eachComment}</li>
))}
         <h3> Comments</h3>
    <input style ={{outline: 0 ,border: '0',
    borderBottom: '2px solid #484a56',width:'300px'}} onChange={this.setComment} placeholder= "upgrad" value={this.state.comment}/>

    <input  style ={{outline: 0,
    border: '0',
    borderBottom: '2px solid #484a56',
    marginLeft:"45px", width:'300px'}}onChange={this.setComment} placeholder="Best Education Content" value={this.state.comment}/> 
    <br/><br/>
    <button  style={{marginLeft:'580px', width:'120px'}}onClick={this.addComment}> Comment</button>
    <button onClick={this.addComment} style={{marginLeft:"20px" ,width:'120px'}}> Cancel</button>
    

      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));