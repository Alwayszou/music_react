
import React from 'react';
import { Carousel } from 'antd'
import axios from 'axios'
import ReactPullToRefresh from 'react-pull-to-refresh'
require('../css/main.css')


class AppComponent extends React.Component {
	constructor(){
		super();
		this.state = {
			show:false
		}
	}
	setStateShow(obj){
		this.setState(obj)
	}
	handleRefresh(){

	}
  	render() {
    	return (
    		<div>
    			<TopFixed show={this.state.show} setStateShow={this.setStateShow.bind(this)}/>
    			<ReactPullToRefresh onRefresh={this.handleRefresh}>
				{!this.state.show&&
					<div>
						<Recommd/>
		    			<SongSheet/>
		    		</div>
				}
				</ReactPullToRefresh>	
    		</div>
    	);
  	}
}

class TopFixed extends React.Component {
	constructor(){
		super();
		this.state = {
			list:{
				searchList:[],
				singerArr:[]
			}
		}
	}
	setSearchList(obj){
		this.setState({list:obj})
	}
	showFalse(){
		this.props.setStateShow({show:false});
		this.refs.search.setkey();
	}
	render(){
		return(
			<section className="topFixed">
				<div id="search_title" className="wy_b_red">
					<div className="flex flex-vertical-middle title_warp">
						<i className="iconfont f26 c-white">&#xe64f;</i>
						<div className="flex-1 index_search_warp flex">
							<i className="iconfont f16" id="search_icon">&#xe600;</i>
							<Search  ref="search" {...this.props} setSearchList={this.setSearchList.bind(this)}/>
						</div>
						{!this.props.show&&
							<i className="iconfont f26 c-white" >&#xe6ed;</i>
						}
						
						{this.props.show&&
							<span className="f22 c-white" onClick={this.showFalse.bind(this)}>取消</span>
						}
					</div>
				</div>
				{!this.props.show&&
					<Tabs/>
				}
				{this.props.show&&
					<SearchResult list={this.state.list} />
				}			
			</section>
		);
	}
}

class Search extends React.Component {
	constructor(){
		super();
		this.state = {
			key:'',
			searchList:[],
			singer:[]
		}
	}
	setkey(){
		this.setState({key:''})
	}
	searchList(key){
		if (!key||key==" "){
			return;
		} 
		this.props.setStateShow({show:true});
		let ops = {
			params:{
				type:'search',
				s:key
			}		
		}
		axios.get('https://api.imjad.cn/cloudmusic/',ops)
			.then((res)=>{
				if (res.data.code===200) {
					let singerArr = [];
					for(let i in res.data.result.songs){
						let name = '';
						for(let index in res.data.result.songs[i].ar){
							name = name + res.data.result.songs[i].ar[index].name + '/';
							name = name.substring(0,name.length-1)
						}
						singerArr.push(name);
					}
					this.props.setSearchList({searchList:res.data.result.songs,singer:singerArr});
				}
			})
	}
	handleChange(event){
		this.setState({key: event.target.value});
		this.searchList(event.target.value);
	}
	render(){
		return(
			<input type="search" id="index_search" placeholder="搜索音乐、歌词、电台" className="f12" value={this.state.key} onInput={this.handleChange.bind(this)}/>
		);
	}
}

class SearchResult extends React.Component {
	render(){
		let res = this.props.list;
		let resultItems = res.searchList.map((v,i) =>
			<div className="flex flex-vertical-middle songItem" key={i}>
		    	<div className="songIndex f18">{i+1}</div>
				<div className="flex-1 itemBorder">
					<div className="f18">{v.name}</div>
					<div className="c-6 singInfo">{ res.singer[i] }-{v.al.name}</div>
				</div>
		    </div>
		  );
		return(
			<section id="search">
				{resultItems}
			</section>
		);
	}
}

class Tabs extends React.Component{
	constructor(){
		super();
		this.state = {
			tabs_active:0
		}
	}
	getTabsIndex(index){
		this.setState({tabs_active:index});
	}
	render(){
		const tabs = ['个性推荐','歌单','主播电台','排行榜'];
		let tabsChange = {
			'width': 100/tabs.length + '%',
			'transform': 'translateX(' + 100*this.state.tabs_active + '%)',
			'WebkitTransform': '-webkit-translateX(' + 100*this.state.tabs_active + '%)'
		}
		let tabItems = tabs.map((tabs,index) =>
			<div className="flex-1 tx-c" key={index} onClick={this.getTabsIndex.bind(this,index)}>
		    	<span className="tabs_item" className={index==this.state.tabs_active?'item_active':''}>{tabs}</span>
		    </div>
		  );
		return(
			<div className="flex tabs_warp">
				{tabItems}
				<span className="tabs_active_border" style={tabsChange}></span>
			</div>
		);
	}
}

function Recommd(){
	return(
		<section id="recommd" className="mtf">
			<Slider/>
		</section>
	)
}

// function LoadMore() {
// 	return(

// 	)
// }

function Slider(){
	return(
		<Carousel autoplay>
		    <div>
		    	<img src="http://p4.music.126.net/rBwLOBIBrPgUCSNFKQDQOA==/19032546276883246.jpg" className="w100"/>
		    </div>
		    <div>
		    	<img src="http://p3.music.126.net/KE__Tj0gIz5ZWbZVDNhp9w==/19104014532705101.jpg" className="w100"/>
		    </div>
		</Carousel>
	);
}

function ModuleTitle(props) {
	return(
		<div id="modules_title" className="flex">
		<div>{props.name}</div>
		<div className="flex-1 more">更多></div>
	</div>
	);
}

class SongSheet extends React.Component{
	constructor(){
		super();
		this.state = {
			sheetList:[]
		}
		this.getSongSheetList()
	}
	getSongSheetList(){
		let ops = {
			params: {
				type: 'topPlayList',
				limit:'6'
			}
		}					
		axios.get('http://musicapi.duapp.com/api.php',ops)
			.then((res)=>{
				if (res.data.code===200) {
					let list =res.data.playlists;
					for(let i in list){
						if (list[i].playCount>=10000) {
							list[i].playCount = parseInt(list[i].playCount/10000)+'万';
						}
					}
					this.setState({sheetList:res.data.playlists});
				}
			})
	}
	render() {
		let list = this.state.sheetList;
		let listItems = list.map((v,index) =>
			<div className="single_sheet" key={v.id}>
		    	<div className="playCount">{v.playCount}</div>
				<img src={v.coverImgUrl+'?param=230y230'}/>
				<span className="sheet_name">{v.name}</span>
		    </div>
		  );
		return(
			<div>
				<ModuleTitle name="推荐歌单"/>
				<div id="sheet" className="overh">
					{listItems}			
				</div>
			</div>
		);
	}
}

export default AppComponent;
