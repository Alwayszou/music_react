
import React from 'react';
import { Carousel } from 'antd';
import { list } from '../api/'
import axios from 'axios';
require('../css/main.css')


class AppComponent extends React.Component {
  	render() {
    	return (
    		<div>
	    		<TopFixed/>
	    		<Recommd/>
	    		<SongSheet/>
    		</div>
    	);
  	}
}

function TopFixed(){
	return(
		<section className="topFixed">
			<div id="search_title" className="wy_b_red">
				<div className="flex flex-vertical-middle title_warp">
					<i className="iconfont f26 c-white">&#xe64f;</i>
					<div className="flex-1 index_search_warp flex">
						<i className="iconfont f16" id="search_icon">&#xe600;</i>
						<input type="search" id="index_search" placeholder="搜索音乐、歌词、电台" className="f12"/>
					</div>
					<i className="iconfont f26 c-white" >&#xe6ed;</i>
					<span className="f22 c-white">取消</span>
				</div>
			</div>
			<Tabs/>
		</section>
	);
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
					this.setState({sheetList:res.data.playlists});
				}
			})
	}
	render() {
		let list = this.state.sheetList;
		let listItems = list.map((v) =>
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
