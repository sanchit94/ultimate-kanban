(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{207:function(e,t,a){e.exports=a(392)},390:function(e,t,a){},392:function(e,t,a){"use strict";a.r(t);var n,r=a(0),o=a.n(r),d=a(28),i=a.n(d),c=a(407),s=a(26),l=a(177),u=a.n(l),p=a(42),m=a(178),b=a(38),f=a(39),E=a(37),h=a.n(E),v=h()(),g=h()(),I=h()(),y=(n={},Object(f.a)(n,v,{id:v,name:"Todo",cardIds:[],editing:!1}),Object(f.a)(n,g,{id:g,name:"Doing",cardIds:[],editing:!1}),Object(f.a)(n,I,{id:I,name:"Done",cardIds:[],editing:!1}),n),_={boards:{0:{id:0,name:"Development",listIds:[v,g,I],editing:!1},1:{id:1,name:"Personal Project",listIds:[v],editing:!1}},boardIds:[0,1]},C=a(196),D={addListEditor:{boardId:null,open:!1},addCardEditor:{listId:null,open:!1},boardDrawer:{open:!1,pinned:!1},createBoardModal:{open:!1}},O=Object(p.combineReducers)({boards:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_BOARD":var a=t.payload.boardId,n=Object.assign({},e);return n.boards[a]||(n.boardIds.push(a),n.boards[a]=t.payload),n;case"DELETE_LIST":var r=t.payload,o=r.boardId,d=r.listId,i=Object.assign({},e.boards);if(i[o]){var c=i[o].listIds.indexOf(d);i[o].listIds.splice(c,1)}return Object(b.a)({},e,{boards:i});case"ATTACH_TO_BOARD":var s=t.payload,l=s.boardId,u=s.listId,p=Object.assign({},e);return p.boards[l]&&p.boards[l].listIds.push(u),p;case"UPDATE_BOARD":var m=t.payload,f=m.boardId,E=m.name,h=m.editing,v=Object.assign({},e);return v.boards[f]&&(v.boards[f].name=E,v.boards[f].editing=h),v;default:return e}},lists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_LIST":return Object(b.a)({},e,Object(f.a)({},t.payload.id,t.payload));case"DELETE_LIST":var a=Object.assign({},e);return a[t.payload.listId]&&delete a[t.payload.listId],a;case"ATTACH_TO_LIST":var n=t.payload,r=n.listId,o=n.cardId,d=Object.assign({},e);return d[r].cardIds.push(o),d;case"DETACH_FROM_LIST":var i=t.payload,c=i.listId,s=i.cardId,l=Object.assign({},e),u=l[c].cardIds.indexOf(s);return l[c].cardIds.splice(u,1),l;case"UPDATE_LIST":var p=t.payload,m=p.listId,E=p.name,h=p.editing,v=Object.assign({},e);return v[m].name=E,v[m].editing=h,v;case"DELETE_CARD":var g=t.payload,I=g.cardId,_=g.listId,C=function(e){return Object.assign({},e)}(e),D=C[_];if(!D)return e;var O=D.cardIds.findIndex(function(e){return I===e});return D.cardIds.splice(O,1),C;default:return e}},cards:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_CARD":return[].concat(Object(C.a)(e),[t.payload]);case"UPDATE_CARD":var a=e.slice(0),n=a.findIndex(function(e){return e.id===t.payload.id});return a[n]=Object(b.a)({},a[n],t.payload),a;case"DELETE_CARD":var r=e.slice(0),o=r.findIndex(function(e){return e.id===t.payload.cardId});return r.splice(o,1),r;default:return e}},ui:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0,a=function(a){return Object(b.a)({},e,Object(f.a)({},a,Object(b.a)({},e[a],t.payload)))};switch(t.type){case"UI_ADD_LIST_EDITOR":return a("addListEditor");case"UI_ADD_CARD_EDITOR":return a("addCardEditor");case"UI_BOARD_DRAWER":return a("boardDrawer");case"UI_CREATE_BOARD_MODAL":return a("createBoardModal");default:return e}}}),j=function(){try{var e=localStorage.getItem("state");if(null===e)return;return JSON.parse(e)}catch(t){return}}(),A=Object(p.createStore)(O,j,Object(m.composeWithDevTools)());A.subscribe(u()(function(){var e=A.getState();!function(e){try{var t=JSON.stringify(e);localStorage.setItem("state",t)}catch(a){alert("Failed to save state: ".concat(a))}}({boards:e.boards,lists:e.lists,cards:e.cards})},1e3));var T=A,R=function(e){return o.a.createElement(s.a,{store:T},e.children)},B=a(17),k=a(18),w=a(20),N=a(19),L=a(21),S=a(179),x=a.n(S),M=a(61),U=a(411),P=a(406),F=a(129),H=a(402),K=a(401),J=function(e){function t(){return Object(B.a)(this,t),Object(w.a)(this,Object(N.a)(t).apply(this,arguments))}return Object(L.a)(t,e),Object(k.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"board-card",onClick:this.props.onClick},o.a.createElement("div",{className:"board-card__thumbnail"},"\xa0"),o.a.createElement("div",{className:"board-card__name"},this.props.name))}}]),t}(o.a.Component),W=function(e){var t=e.content;return o.a.createElement("div",{className:"link-button",onClick:e.onClick},t)},V=function(e){return i.a.createPortal(o.a.createElement("div",{className:"click-catcher",onClick:e.onDismiss}),document.getElementById("clickCatcher"))},q=function(e){return{type:"UI_CREATE_BOARD_MODAL",payload:{open:e}}},z=function(e){if("string"!==typeof e)throw new Error("input need to be string");return e.trim().toLowerCase().split(" ").join("")},G=function(e){function t(){var e,a;Object(B.a)(this,t);for(var n=arguments.length,r=new Array(n),d=0;d<n;d++)r[d]=arguments[d];return(a=Object(w.a)(this,(e=Object(N.a)(t)).call.apply(e,[this].concat(r)))).boards=Object.values(a.props.boards),a.state={filteredBoardIds:a.props.boardIds,keyword:""},a.handleSearch=function(e){a.setState({keyword:e.target.value},function(){var e=z(a.state.keyword);if(""===e)return a.setState({filteredBoardIds:a.props.boardIds});var t=a.boards.filter(function(t){return z(t.name).includes(e)}).map(function(e){return e.id});a.setState({filteredBoardIds:t})})},a.renderBoards=function(){var e=a.props.boards;return a.state.filteredBoardIds.map(function(t){return o.a.createElement(K.a,{to:"/".concat(t),key:t},o.a.createElement(J,Object.assign({},e[t],{onClick:a.props.onDismiss})))})},a.renderPinToggleButton=function(){var e=a.props,t=e.pinned,n=e.pinBoardDrawer;return t?o.a.createElement(W,{content:"Don't keep this menu open",onClick:function(){return n(!t)}}):o.a.createElement(W,{content:"Always keep this menu open",onClick:function(){return n(!t)}})},a}return Object(L.a)(t,e),Object(k.a)(t,[{key:"render",value:function(){var e=this.props,t=e.pinned,a=e.toggleCreateBoardModal,n=t?"board-drawer--pinned":"";return i.a.createPortal(o.a.createElement("div",{className:"board-drawer ".concat(n)},o.a.createElement("div",{className:"board-drawer__header ".concat(n)},o.a.createElement("span",null,"Boards")),o.a.createElement("div",{className:"board-drawer__content"},o.a.createElement("div",{className:"board-drawer__content__search"},o.a.createElement(H.a,{fluid:!0,placeholder:"Find boards by name...",value:this.state.keyword,onChange:this.handleSearch})),o.a.createElement("div",{className:"board-drawer__content__boards"},this.renderBoards()),o.a.createElement("div",{className:"board-drawer__content__buttons"},o.a.createElement(W,{content:"Create new board...",onClick:function(){return a(!0)}}),this.renderPinToggleButton())),t||o.a.createElement(V,{onDismiss:this.props.onDismiss})),document.getElementById("drawer"))}}]),t}(o.a.Component),Q=Object(s.b)(function(e){return{boardIds:e.boards.boardIds,boards:e.boards.boards}},{pinBoardDrawer:function(e){return{type:"UI_BOARD_DRAWER",payload:{pinned:e}}},toggleCreateBoardModal:q})(G),X=Object(s.b)(function(e){return{boardDrawer:e.ui.boardDrawer}},{toggleBoardDrawer:function(e){return{type:"UI_BOARD_DRAWER",payload:{open:e}}}})(function(e){var t=function(){if(e.boardDrawer.open)return e.toggleBoardDrawer(!1);e.toggleBoardDrawer(!0)};return o.a.createElement("header",{className:"app-bar"},e.boardDrawer.pinned?null:o.a.createElement(P.a,{className:"app-bar__boards-button",primary:!0,onClick:t},o.a.createElement(F.a,{name:"square"}),"Boards"),o.a.createElement("div",{className:"app-bar__logo"}),function(){var t=e.boardDrawer,a=t.pinned,n=t.open;return a?o.a.createElement(Q,{pinned:a}):n?o.a.createElement(Q,{pinned:a,onDismiss:function(){return e.toggleBoardDrawer(!1)}}):void 0}())}),Y=a(408),Z=a(409),$=a(405),ee=function(e){return o.a.createElement(P.a,e)};ee.displayName="button";var te=ee,ae=function(e){return o.a.createElement(H.a,Object.assign({},e,{ref:e.forwardref}))};ae.displayName="input";var ne=ae,re=a(403),oe=function(e){return o.a.createElement(re.a,e)};oe.displayName="textarea";var de=oe,ie=function(e){function t(){var e,a;Object(B.a)(this,t);for(var n=arguments.length,r=new Array(n),d=0;d<n;d++)r[d]=arguments[d];return(a=Object(w.a)(this,(e=Object(N.a)(t)).call.apply(e,[this].concat(r)))).state={content:a.props.value||"",count:a.props.value?a.props.value.length:0,error:{}},a.editorRef=o.a.createRef(),a.inputRef=o.a.createRef(),a.handleClick=function(e){e.stopPropagation()},a.handleDismiss=function(){var e=a.editorRef.current.style;e.opacity=0,e.maxHeight="36px",setTimeout(function(){a.props.onDismiss()},160)},a.handleInputChange=function(e){if(!a.props.limit)return a.setState({content:e.target.value});var t=e.target.value.trim().length;t>=a.props.limit?a.setState({error:{exceedMaxCount:!0}}):a.state.error.exceedMaxCount&&a.setState({error:{exceedMaxCount:!1}}),a.setState({content:e.target.value,count:t})},a.handleKeyDown=function(e){if("Enter"===e.key)return a.handleSubmit(e)},a.handleSubmit=function(e){e&&e.preventDefault();var t=a.state.content.trim();t&&!a.state.error.exceedMaxCount&&(a.setState({content:""}),a.inputRef.current.focus(),a.props.onSubmit(t))},a.renderInput=function(e){var t=a.props.placeholder;return o.a.createElement("div",{className:"editor__input"},o.a.cloneElement(e,{placeholder:t,value:a.state.content,onChange:a.handleInputChange,onKeyDown:a.handleKeyDown,forwardref:a.inputRef}),a.renderCount())},a.renderTextArea=function(e){var t=a.props.placeholder;return o.a.createElement("div",{className:"editor__textarea"},o.a.createElement(Z.a,{innerRef:a.inputRef},o.a.cloneElement(e,{placeholder:t,value:a.state.content,onChange:a.handleInputChange,onKeyDown:a.handleKeyDown})),a.renderCount())},a.renderCount=function(){var e=a.props.limit,t=a.state,n=t.count,r=t.error;return o.a.createElement("div",{className:"editor__count ".concat(r.exceedMaxCount&&"editor__count--error")},o.a.createElement("span",null,e&&n+"/"+e))},a.renderButton=function(e){return o.a.createElement("div",{className:"editor__button"},o.a.cloneElement(e,{primary:!0,onClick:a.handleSubmit}))},a.renderChildren=function(){var e=a.props.children;return o.a.Children.map(e,function(e){switch(e.type.displayName){case"input":return a.renderInput(e);case"textarea":return a.renderTextArea(e);case"button":return a.renderButton(e);default:return e}})},a}return Object(L.a)(t,e),Object(k.a)(t,[{key:"componentDidMount",value:function(){this.inputRef.current.focus(),this.inputRef.current.select();var e=this.editorRef.current.style;e.opacity=1,e.maxHeight="200px"}},{key:"render",value:function(){var e=this.props.className;return o.a.createElement(Z.a,{innerRef:this.editorRef},o.a.createElement($.a,{className:"editor ".concat(e||""),onSubmit:this.handleSubmit,onClick:this.handleClick},this.renderChildren(),o.a.createElement(V,{onDismiss:this.handleDismiss})))}}]),t}(o.a.Component);ie.Input=ne,ie.TextArea=de,ie.Button=te;var ce=ie,se=function(e){var t=e.onUpdate,a=e.value,n=e.location,r=n.x,d=n.y;return o.a.createElement("div",{className:"card-editor",style:{left:r-8,top:d-8}},o.a.createElement(ce,{onSubmit:t,value:a,limit:80},o.a.createElement(ce.TextArea,{autoHeight:!0}),o.a.createElement(ce.Button,{content:"Save"})))},le=function(e){return i.a.createPortal(o.a.createElement("div",{className:"overlay",onClick:function(t){t.stopPropagation(),e.onDismiss()}},e.children),document.getElementById("overlay"))},ue=function(e){function t(){var e,a;Object(B.a)(this,t);for(var n=arguments.length,r=new Array(n),d=0;d<n;d++)r[d]=arguments[d];return(a=Object(w.a)(this,(e=Object(N.a)(t)).call.apply(e,[this].concat(r)))).cardRef=o.a.createRef(),a.getLocation=function(){var e=a.cardRef.current.getClientRects()[0];return{x:e.x,y:e.y}},a.renderEditor=function(){var e=a.props,t=e.id,n=e.content,r=e.onUpdate,d=a.getLocation();return o.a.createElement(le,{onDismiss:function(){return r(t,n,!1)}},o.a.createElement(se,{location:d,value:n,onUpdate:function(e){return r(t,e)}}))},a.renderCard=function(){var e=a.props,t=e.connectDragSource,n=e.id,r=e.onDelete,d=e.editing,i=e.content;return t(o.a.createElement("div",null,o.a.createElement("div",{ref:a.cardRef,className:"card",onClick:function(){return a.props.onClick(n)}},o.a.createElement("div",{className:"card__labels"}),o.a.createElement("div",{className:"card__content"},o.a.createElement("p",null,i)),o.a.createElement("div",{className:"card__close",onClick:function(){return r(n)}},o.a.createElement(F.a,{name:"times"})),d&&a.renderEditor())))},a}return Object(L.a)(t,e),Object(k.a)(t,[{key:"render",value:function(){return this.props.isDragging?null:this.renderCard()}}]),t}(o.a.Component),pe=Object(M.DragSource)("CARD",{beginDrag:function(e){return{id:e.id,listId:e.listId}},isDragging:function(e,t){return t.getItem().id===e.id}},function(e,t){return{connectDragSource:e.dragSource(),isDraggin:t.isDragging()}})(ue),me=function(e){return{type:"CREATE_CARD",payload:{id:h()(),editing:!1,content:e,labels:[]}}},be=function(e,t){return{type:"DELETE_CARD",payload:{cardId:t,listId:e}}},fe=function(e){return{type:"CREATE_LIST",payload:{id:h()(),name:e,editing:!1,cardIds:[]}}},Ee=function(e,t){return{type:"ATTACH_TO_LIST",payload:{cardId:t,listId:e}}},he=Object(s.b)(null,{openAddCardEditor:function(e){return{type:"UI_ADD_CARD_EDITOR",payload:{listId:e,open:!0}}},closeAddCardEditor:function(){return{type:"UI_ADD_CARD_EDITOR",payload:{listId:null,open:!1}}},createCard:me,attachToList:Ee})(function(e){var t=o.a.createElement("button",{className:"list__content__button",onClick:function(){return e.openAddCardEditor(e.listId)}},o.a.createElement(F.a,{name:"plus"}),o.a.createElement("span",null,"Add another card")),a=o.a.createElement(ce,{placeholder:"Enter a title for this card...",onSubmit:e.onCreateCard,onDismiss:e.closeAddCardEditor,limit:80},o.a.createElement(ce.TextArea,{autoHeight:!0,autoFocus:!0}),o.a.createElement(ce.Button,{content:"Add Card"}));return e.open?a:t}),ve=Object(s.b)(function(e){return{lists:e.lists,cards:e.cards,addCardEditor:e.ui.addCardEditor}},{createCard:me,updateCard:function(e){return{type:"UPDATE_CARD",payload:e}},deleteCard:be,attachToList:Ee,detachFromList:function(e,t){return{type:"DETACH_FROM_LIST",payload:{listId:e,cardId:t}}}})(Object(M.DropTarget)("CARD",{drop:function(e,t){var a=t.getItem().id,n=t.getItem().listId;e.detachFromList(n,a),e.attachToList(e.id,a)}},function(e,t){return{connectDropTarget:e.dropTarget(),isOver:t.isOver()}})(function(e){var t=e.id,a=e.cardIds,n=e.onDelete,r=e.connectDropTarget,d=function(t){e.deleteCard(e.id,t)},i=function(t,a){var n={id:t,content:a,editing:arguments.length>2&&void 0!==arguments[2]&&arguments[2]};e.updateCard(n)},c=function(t){var a=e.cards.find(function(e){return e.id===t});a.editing=!0,e.updateCard(a)};return r(o.a.createElement("div",{className:"list"},o.a.createElement("div",{className:"list__dragging-over ".concat(e.isOver&&"list__dragging-over--active")}),o.a.createElement("div",{className:"list__header"},e.children,o.a.createElement("div",{className:"list__header__close",onClick:function(){return n(t)}},o.a.createElement(F.a,{name:"times"}))),o.a.createElement("div",{className:"list__content"},a.map(function(t){var a=e.cards.find(function(e){return e.id===t});return o.a.createElement(pe,Object.assign({key:t,onDelete:d,onUpdate:i,onClick:c,listId:e.id},a))}),o.a.createElement(he,{open:e.addCardEditor.open&&t===e.addCardEditor.listId,onCreateCard:function(t){var a=e.createCard(t);e.attachToList(e.id,a.payload.id)},listId:t}))))})),ge=function(e){function t(){var e,a;Object(B.a)(this,t);for(var n=arguments.length,r=new Array(n),d=0;d<n;d++)r[d]=arguments[d];return(a=Object(w.a)(this,(e=Object(N.a)(t)).call.apply(e,[this].concat(r)))).state={content:a.props.content},a.inputRef=o.a.createRef(),a.handleFinishEdit=function(e){var t=a.props,n=t.content,r=t.id,o=t.onEdit;if("keydown"!==e.type||"Enter"===e.key){if(!a.state.content.trim())return a.setState({content:n}),o(r,n);o(r,e.target.value)}},a.handleInputChange=function(e){a.setState({content:e.target.value})},a.renderValue=function(){return o.a.createElement("input",{type:"text",className:"editable ".concat(a.props.className),onClick:a.props.onClick,value:a.state.content,onChange:a.handleInputChange,readOnly:!0})},a.renderEdit=function(){return o.a.createElement("input",{ref:a.inputRef,type:"text",className:"editable editable--editing ".concat(a.props.className),onKeyDown:a.handleFinishEdit,onBlur:a.handleFinishEdit,onChange:a.handleInputChange,defaultValue:a.props.content,autoFocus:!0,value:a.state.content})},a}return Object(L.a)(t,e),Object(k.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return this.props.editing?this.renderEdit():this.renderValue()}}]),t}(o.a.Component);ge.defaultProps={editing:!1};var Ie=ge,ye=Object(s.b)(null,{openAddListEditor:function(e){return{type:"UI_ADD_LIST_EDITOR",payload:{boardId:e,open:!0}}},closeAddListEditor:function(){return{type:"UI_ADD_LIST_EDITOR",payload:{open:!1}}},createList:fe,attachToBoard:function(e,t){return{type:"ATTACH_TO_BOARD",payload:{boardId:e,listId:t}}}})(function(e){var t=o.a.createElement("button",{className:"add-list__button",onClick:function(){return e.openAddListEditor(e.boardId)}},o.a.createElement(F.a,{name:"plus"})," Add another list"),a=o.a.createElement(ce,{className:"add-list__editor",placeholder:"Enter list title...",onSubmit:function(t){var a=e.createList(t);e.attachToBoard(e.boardId,a.payload.id)},onDismiss:e.closeAddListEditor,limit:25},o.a.createElement(ce.Input,{fluid:!0,autoFocus:!0}),o.a.createElement(ce.Button,{content:"Add List"}));return o.a.createElement("div",{className:"add-list"},e.open?a:t)}),_e=function(e){function t(){var e,a;Object(B.a)(this,t);for(var n=arguments.length,r=new Array(n),d=0;d<n;d++)r[d]=arguments[d];return(a=Object(w.a)(this,(e=Object(N.a)(t)).call.apply(e,[this].concat(r)))).boardId=a.props.match.params.id,a.handleNameClick=function(){var e=a.props.boards[a.boardId].name;a.props.updateBoard(a.boardId,e,!0)},a.handleDeleteList=function(e){a.props.lists[e].cardIds.forEach(function(t){return a.props.deleteCard(e,t)}),a.props.deleteList(a.boardId,e)},a.renderLists=function(){var e=a.props,t=e.boards,n=e.lists;return t[a.boardId].listIds.map(function(e){var t=n[e];return o.a.createElement(ve,Object.assign({key:t.id},t,{onDelete:function(){return a.handleDeleteList(t.id)}}),o.a.createElement(Ie,{id:t.id,content:t.name,editing:t.editing,onClick:function(){return a.props.updateList(t.id,t.name,!0)},onEdit:a.props.updateList}))})},a}return Object(L.a)(t,e),Object(k.a)(t,[{key:"render",value:function(){var e=this.props.boards[this.boardId];if(!e)return o.a.createElement(Y.a,{to:"/"});var t=e.name,a=e.editing;return o.a.createElement("div",{className:"board"},o.a.createElement("div",{className:"board__header"},o.a.createElement(Ie,{className:"board__header__board-name",id:this.boardId,onClick:this.handleNameClick,editing:a,onEdit:this.props.updateBoard,content:t})),o.a.createElement("div",{className:"board__content"},this.renderLists(),o.a.createElement("div",{className:"board__content__add"},o.a.createElement(ye,{open:this.props.addListEditor.open&&this.boardId===this.props.addListEditor.boardId,boardId:this.boardId}))))}}]),t}(o.a.Component),Ce=Object(s.b)(function(e){return{boards:e.boards.boards,lists:e.lists,addListEditor:e.ui.addListEditor}},{updateList:function(e,t){return{type:"UPDATE_LIST",payload:{listId:e,name:t,editing:arguments.length>2&&void 0!==arguments[2]&&arguments[2]}}},createList:fe,deleteList:function(e,t){return{type:"DELETE_LIST",payload:{boardId:e,listId:t}}},deleteCard:be,updateBoard:function(e,t){return{type:"UPDATE_BOARD",payload:{boardId:e,name:t,editing:arguments.length>2&&void 0!==arguments[2]&&arguments[2]}}}})(_e),De=function(){return o.a.createElement("div",null,"Boards")},Oe=a(410),je=a(404),Ae=function(e){function t(){return Object(B.a)(this,t),Object(w.a)(this,Object(N.a)(t).apply(this,arguments))}return Object(L.a)(t,e),Object(k.a)(t,[{key:"render",value:function(){return o.a.createElement(Oe.a,null,o.a.createElement(je.a,{exact:!0,path:"/",component:De}),o.a.createElement(je.a,{path:"/:id",exact:!0,render:function(e){return o.a.createElement(Ce,Object.assign({key:e.match.params.id},e))}}))}}]),t}(o.a.Component),Te=function(e){function t(){return Object(B.a)(this,t),Object(w.a)(this,Object(N.a)(t).apply(this,arguments))}return Object(L.a)(t,e),Object(k.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"create-board-modal"},o.a.createElement(ce,{className:"create-board-modal__editor",placeholder:"Add board title",onSubmit:this.props.onSubmit},o.a.createElement(ce.Input,null),o.a.createElement(ce.Button,{content:"Create Board"})))}}]),t}(o.a.Component),Re=function(e){function t(){var e,a;Object(B.a)(this,t);for(var n=arguments.length,r=new Array(n),d=0;d<n;d++)r[d]=arguments[d];return(a=Object(w.a)(this,(e=Object(N.a)(t)).call.apply(e,[this].concat(r)))).handleCreateBoard=function(e){var t=a.props.createBoard(e).payload;a.props.toggleCreateBoardModal(!1),a.props.history.push("/".concat(t.boardId))},a.createBoardModal=o.a.createElement(le,{onDismiss:function(){return a.props.toggleCreateBoardModal(!1)}},o.a.createElement(Te,{onSubmit:a.handleCreateBoard})),a}return Object(L.a)(t,e),Object(k.a)(t,[{key:"render",value:function(){var e=this.props.pinned?"app app--drawer-pinned":"app";return o.a.createElement("div",{className:e},o.a.createElement("div",{id:"clickCatcher"}),o.a.createElement(X,null),o.a.createElement(Ae,null),this.props.createBoardModal.open&&this.createBoardModal)}}]),t}(o.a.Component),Be=Object(U.a)(Object(M.DragDropContext)(x.a)(Object(s.b)(function(e){return{boards:e.boards,pinned:e.ui.boardDrawer.pinned,createBoardModal:e.ui.createBoardModal}},{toggleCreateBoardModal:q,createBoard:function(e){return{type:"CREATE_BOARD",payload:{boardId:h()(),name:e,listIds:[],editing:!1}}}})(Re)));a(387),a(390);i.a.render(o.a.createElement(R,null,o.a.createElement(c.a,null,o.a.createElement(Be,null))),document.getElementById("root"))}},[[207,2,1]]]);
//# sourceMappingURL=main.7d1294df.chunk.js.map