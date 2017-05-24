
import React from 'react'
import axios from 'axios'
require('../css/list.css')

class ListComponent extends React.Component {
	constructor(){
		super();
		this.state = {
			playlist:{
				creator:{},
				tracks:[]
			},
			singer:[]
		}
	}
	componentWillMount(){
		this.getListInfo();
	}
	getListInfo(){
		let ops = {
			params:{
				type:'playlist',
				id:this.props.location.state.id
			}
		}
		axios.get('https://api.imjad.cn/cloudmusic/',ops)
			.then((res)=>{
				if (res.data.code==200){
					let singer = [];
					for(let i in res.data.playlist.tracks){
						let name = '';
						for(let index in res.data.playlist.tracks[i].ar){
							name = name + res.data.playlist.tracks[i].ar[index].name + '/';
							name = name.substring(0,name.length-1)
						}
						singer.push(name);
					}
					this.setState({playlist:res.data.playlist,singer:singer});
				}
			})
	}
	render(){
		let background = {
			backgroundImage:`url(${this.props.location.state.url})`
		}
		return(
			<div>
				<div id="mask"></div>
				<div id="sheetBg" style={background}></div>
				<SheetInfo {...this.props} {...this.state}/>
				<SongList  {...this.state}/>
			</div>
		);
	}
}

class SheetInfo extends React.Component {
	render(){
		return(
			<section id="sheetInfo" className="flex">
				<div className="flex-1 tx-c">
					<img src={this.props.location.state.url} className="sheetImg"/>
				</div>
				<div className="flex-1">
					<div className="sheetName mb20 f16 c-white">{this.props.playlist.name}</div>
					<div className="creator flex flex-vertical-middle">
						<div><img src={this.props.playlist.creator.avatarUrl} className="avatarUrl"/></div>
						<span className="flex-1 c-white">{this.props.playlist.creator.nickname}</span>
					</div>
				</div>
			</section>
		);
	}
}

class SongList extends React.Component {
	render(){
		let list = this.props.playlist.tracks;
		let songList = list.map((v,i)=>
			<div className="flex flex-vertical-middle songItem" key={i}>
				<div className="songIndex f18">{i+1}</div>
				<div className="flex-1 itemBorder">
					<div className="f18">{v.name}</div>
					<div className="c-6 singInfo">{this.props.singer[i]}-{v.al.name}</div>
				</div>
			</div>
		)
		return(
			<section id="songList">
				<div id="listTitle" className="f16 flex">
					<div className="songIndex"></div>
					<span className="itemBorder flex-1 titleText">播放列表（共{this.props.playlist.tracks.length}首）</span>
				</div>
				{songList}
			</section>
		);
	}
}

export default ListComponent;