import{V as h,W as E,X as y,Y as w,Z as I,$ as b,S as T,C as $,_ as i,E as O,a as q,a0 as x,b as U,c as M,h as z,G as F,f as N,j,k as D,l as L,A as Y,B as l,w as A,x as f,y as B,z as Q,F as G,H as C}from"./index.d67c4351.js";const m=h.object({contractAddress:E}),H=m.extend({quantity:y}),V=m.extend({tokenId:w}),Z=m.extend({tokenId:w,quantity:w}),v=H.omit({quantity:!0}).extend({quantityPerReward:y}),P=V,S=Z.omit({quantity:!0}).extend({quantityPerReward:w}),X=v.extend({totalRewards:w.default("1")}),J=P,K=S.extend({totalRewards:w.default("1")});h.object({erc20Rewards:h.array(v).default([]),erc721Rewards:h.array(P).default([]),erc1155Rewards:h.array(S).default([])});const W=h.object({erc20Rewards:h.array(X).default([]),erc721Rewards:h.array(J).default([]),erc1155Rewards:h.array(K).default([])}),_=W.extend({packMetadata:I,rewardsPerPack:w.default("1"),openStartTime:b.default(new Date)});class k extends T{constructor(e,r,s){let a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},d=arguments.length>4?arguments[4]:void 0,c=arguments.length>5?arguments[5]:void 0,o=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new $(e,r,d,a.gasless&&"openzeppelin"in a.gasless?{...a,gasless:{openzeppelin:{...a.gasless.openzeppelin,useEOAForwarder:!0}}}:a);super(o,s,c),i(this,"abi",void 0),i(this,"metadata",void 0),i(this,"roles",void 0),i(this,"encoder",void 0),i(this,"events",void 0),i(this,"estimator",void 0),i(this,"royalties",void 0),i(this,"interceptor",void 0),i(this,"erc1155",void 0),i(this,"owner",void 0),this.abi=d,this.erc1155=new O(this.contractWrapper,this.storage,c),this.metadata=new q(this.contractWrapper,x,this.storage),this.roles=new U(this.contractWrapper,k.contractRoles),this.royalties=new M(this.contractWrapper,this.metadata),this.encoder=new z(this.contractWrapper),this.estimator=new F(this.contractWrapper),this.events=new N(this.contractWrapper),this.interceptor=new j(this.contractWrapper),this.owner=new D(this.contractWrapper)}onNetworkUpdated(e){this.contractWrapper.updateSignerOrProvider(e)}getAddress(){return this.contractWrapper.readContract.address}async get(e){return this.erc1155.get(e)}async getAll(e){return this.erc1155.getAll(e)}async getOwned(e){return this.erc1155.getOwned(e)}async getTotalCount(){return this.erc1155.totalCount()}async isTransferRestricted(){return!await this.contractWrapper.readContract.hasRole(L("transfer"),Y)}async getPackContents(e){const{contents:r,perUnitAmounts:s}=await this.contractWrapper.readContract.getPackContents(e),a=[],d=[],c=[];for(let o=0;o<r.length;o++){const n=r[o],t=s[o];switch(n.tokenType){case 0:{const u=await A(this.contractWrapper.getProvider(),n.assetContract),p=f(n.totalAmount,u.decimals);a.push({contractAddress:n.assetContract,quantityPerReward:t.toString(),totalRewards:l.from(p).div(t).toString()});break}case 1:{d.push({contractAddress:n.assetContract,tokenId:n.tokenId.toString()});break}case 2:{c.push({contractAddress:n.assetContract,tokenId:n.tokenId.toString(),quantityPerReward:t.toString(),totalRewards:l.from(n.totalAmount).div(t).toString()});break}}}return{erc20Rewards:a,erc721Rewards:d,erc1155Rewards:c}}async create(e){const r=await this.contractWrapper.getSignerAddress();return this.createTo(r,e)}async addPackContents(e,r){const s=await this.contractWrapper.getSignerAddress(),a=W.parse(r),{contents:d,numOfRewardUnits:c}=await this.toPackContentArgs(a),o=await this.contractWrapper.sendTransaction("addPackContents",[e,d,c,s]),n=this.contractWrapper.parseLogs("PackUpdated",o==null?void 0:o.logs);if(n.length===0)throw new Error("PackUpdated event not found");const t=n[0].args.packId;return{id:t,receipt:o,data:()=>this.erc1155.get(t)}}async createTo(e,r){const s=await B(r.packMetadata,this.storage),a=_.parse(r),{erc20Rewards:d,erc721Rewards:c,erc1155Rewards:o}=a,n={erc20Rewards:d,erc721Rewards:c,erc1155Rewards:o},{contents:t,numOfRewardUnits:u}=await this.toPackContentArgs(n),p=await this.contractWrapper.sendTransaction("createPack",[t,u,s,a.openStartTime,a.rewardsPerPack,e]),g=this.contractWrapper.parseLogs("PackCreated",p==null?void 0:p.logs);if(g.length===0)throw new Error("PackCreated event not found");const R=g[0].args.packId;return{id:R,receipt:p,data:()=>this.erc1155.get(R)}}async open(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;const s=await this.contractWrapper.sendTransaction("openPack",[e,r],{gasLimit:5e5}),a=this.contractWrapper.parseLogs("PackOpened",s==null?void 0:s.logs);if(a.length===0)throw new Error("PackOpened event not found");const d=a[0].args.rewardUnitsDistributed,c=[],o=[],n=[];for(const t of d)switch(t.tokenType){case 0:{const u=await A(this.contractWrapper.getProvider(),t.assetContract);c.push({contractAddress:t.assetContract,quantityPerReward:f(t.totalAmount,u.decimals).toString()});break}case 1:{o.push({contractAddress:t.assetContract,tokenId:t.tokenId.toString()});break}case 2:{n.push({contractAddress:t.assetContract,tokenId:t.tokenId.toString(),quantityPerReward:t.totalAmount.toString()});break}}return{erc20Rewards:c,erc721Rewards:o,erc1155Rewards:n}}async toPackContentArgs(e){const r=[],s=[],{erc20Rewards:a,erc721Rewards:d,erc1155Rewards:c}=e,o=this.contractWrapper.getProvider(),n=await this.contractWrapper.getSignerAddress();for(const t of a){const p=(await Q(o,t.quantityPerReward,t.contractAddress)).mul(t.totalRewards);if(!await G(this.contractWrapper,t.contractAddress,p))throw new Error(`ERC20 token with contract address "${t.contractAddress}" does not have enough allowance to transfer.

You can set allowance to the multiwrap contract to transfer these tokens by running:

await sdk.getToken("${t.contractAddress}").setAllowance("${this.getAddress()}", ${p});

`);s.push(t.totalRewards),r.push({assetContract:t.contractAddress,tokenType:0,totalAmount:p,tokenId:0})}for(const t of d){if(!await C(this.contractWrapper.getProvider(),this.getAddress(),t.contractAddress,t.tokenId,n))throw new Error(`ERC721 token "${t.tokenId}" with contract address "${t.contractAddress}" is not approved for transfer.

You can give approval the multiwrap contract to transfer this token by running:

await sdk.getNFTCollection("${t.contractAddress}").setApprovalForToken("${this.getAddress()}", ${t.tokenId});

`);s.push("1"),r.push({assetContract:t.contractAddress,tokenType:1,totalAmount:1,tokenId:t.tokenId})}for(const t of c){if(!await C(this.contractWrapper.getProvider(),this.getAddress(),t.contractAddress,t.tokenId,n))throw new Error(`ERC1155 token "${t.tokenId}" with contract address "${t.contractAddress}" is not approved for transfer.

You can give approval the multiwrap contract to transfer this token by running:

await sdk.getEdition("${t.contractAddress}").setApprovalForAll("${this.getAddress()}", true);

`);s.push(t.totalRewards),r.push({assetContract:t.contractAddress,tokenType:2,totalAmount:l.from(t.quantityPerReward).mul(l.from(t.totalRewards)),tokenId:t.tokenId})}return{contents:r,numOfRewardUnits:s}}async call(e){for(var r=arguments.length,s=new Array(r>1?r-1:0),a=1;a<r;a++)s[a-1]=arguments[a];return this.contractWrapper.call(e,...s)}}i(k,"contractRoles",["admin","minter","asset","transfer"]);export{k as Pack};
