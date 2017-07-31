import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './components/Main'
import List from './components/List'
import 'antd/dist/antd.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import PropTypes from 'prop-types'
require('./common_css/common.css')

const store = createStore(reducer);

// Render the main component into the dom
// ReactDOM.render(<App />, document.getElementById('app'));
class main extends React.Component {
	render(){
		return(
			<div>
				<div>{ this.props.children }</div>
			</div>
		);
	}
}

ReactDOM.render((
	<Provider store={store}>
	  	<BrowserRouter>
	  		<div>
				<Route path="/" component={main}/>
				<Route path="/App" component={App} />
		    	<Route path="/List" component={List}/>
		    </div>
	    </BrowserRouter>
	</Provider>
), document.getElementById('app'))

//flexble
if(/qiakr_wv/i.test(navigator.userAgent)){
    var metaEl = document.querySelector('meta[name="viewport"]'), doc = document;
	if (!metaEl) {
	    metaEl = doc.createElement('meta');
	    metaEl.setAttribute('name', 'viewport');
	    metaEl.setAttribute('content', 'initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
	    if (doc.documentElement.firstElementChild) {
	        doc.documentElement.firstElementChild.appendChild(metaEl);
	    } else {
	        var wrap = doc.createElement('div');
	        wrap.appendChild(metaEl);
	        doc.write(wrap.innerHTML);
	    }
	}
}
!function(a,b){function c(){var b=f.getBoundingClientRect().width;b/i>540&&(b=540*i);var c=b/10;f.style.fontSize=c+"px",k.rem=a.rem=c}var d,e=a.document,f=e.documentElement,g=e.querySelector('meta[name="viewport"]'),h=e.querySelector('meta[name="flexible"]'),i=0,j=0,k=b.flexible||(b.flexible={});if(g){console.warn("将根据已有的meta标签来设置缩放比例");var l=g.getAttribute("content").match(/initial\-scale=([\d\.]+)/);l&&(j=parseFloat(l[1]),i=parseInt(1/j))}else if(h){var m=h.getAttribute("content");if(m){var n=m.match(/initial\-dpr=([\d\.]+)/),o=m.match(/maximum\-dpr=([\d\.]+)/);n&&(i=parseFloat(n[1]),j=parseFloat((1/i).toFixed(2))),o&&(i=parseFloat(o[1]),j=parseFloat((1/i).toFixed(2)))}}if(!i&&!j){var p=(a.navigator.appVersion.match(/android/gi),a.navigator.appVersion.match(/iphone/gi)),q=a.devicePixelRatio;i=p?q>=3&&(!i||i>=3)?3:q>=2&&(!i||i>=2)?2:1:1,j=1/i}if(f.setAttribute("data-dpr",i),!g)if(g=e.createElement("meta"),g.setAttribute("name","viewport"),g.setAttribute("content","initial-scale="+j+", maximum-scale="+j+", minimum-scale="+j+", user-scalable=no"),f.firstElementChild)f.firstElementChild.appendChild(g);else{var r=e.createElement("div");r.appendChild(g),e.write(r.innerHTML)}a.addEventListener("resize",function(){clearTimeout(d),d=setTimeout(c,300)},!1),a.addEventListener("pageshow",function(a){a.persisted&&(clearTimeout(d),d=setTimeout(c,300))},!1),"complete"===e.readyState?e.body.style.fontSize=14*i+"px":e.addEventListener("DOMContentLoaded",function(){e.body.style.fontSize=14*i+"px"},!1),c(),k.dpr=a.dpr=i,k.refreshRem=c,k.rem2px=function(a){var b=parseFloat(a)*this.rem;return"string"==typeof a&&a.match(/rem$/)&&(b+="px"),b},k.px2rem=function(a){var b=parseFloat(a)/this.rem;return"string"==typeof a&&a.match(/px$/)&&(b+="rem"),b}}(window,window.lib||(window.lib={}));

