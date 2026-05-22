// ── 라이브박스 공유 데이터 레이어 ──
const LB = {
  KEYS: { products:'lb_products', orders:'lb_orders', cart:'lb_cart', wishlist:'lb_wishlist' },

  getProducts(){ try{ return JSON.parse(localStorage.getItem(this.KEYS.products))||[]; }catch{ return []; } },
  saveProducts(d){ localStorage.setItem(this.KEYS.products, JSON.stringify(d)); },

  getOrders(){ try{ return JSON.parse(localStorage.getItem(this.KEYS.orders))||[]; }catch{ return []; } },
  saveOrders(d){ localStorage.setItem(this.KEYS.orders, JSON.stringify(d)); },

  getCart(){ try{ return JSON.parse(localStorage.getItem(this.KEYS.cart))||[]; }catch{ return []; } },
  saveCart(d){ localStorage.setItem(this.KEYS.cart, JSON.stringify(d)); window.dispatchEvent(new Event('cart-updated')); },

  getWishlist(){ try{ return JSON.parse(localStorage.getItem(this.KEYS.wishlist))||[]; }catch{ return []; } },
  saveWishlist(d){ localStorage.setItem(this.KEYS.wishlist, JSON.stringify(d)); },

  addToCart(productId, qty=1){
    const p = this.getProducts().find(x=>x.id===productId);
    if(!p) return false;
    const cart = this.getCart();
    const existing = cart.find(x=>x.productId===productId);
    if(existing){ existing.qty += qty; } else { cart.push({productId, qty, addedAt: Date.now()}); }
    this.saveCart(cart);
    return true;
  },

  getCartTotal(){
    const products = this.getProducts();
    return this.getCart().reduce((sum, item)=>{
      const p = products.find(x=>x.id===item.productId);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  },

  getCartCount(){
    return this.getCart().reduce((s,i)=>s+i.qty, 0);
  },

  toggleWishlist(productId){
    const list = this.getWishlist();
    const idx = list.indexOf(productId);
    if(idx>=0) list.splice(idx,1); else list.push(productId);
    this.saveWishlist(list);
    return idx < 0; // true = added
  },

  generateOrderId(){
    return 'ORD-' + Date.now().toString().slice(-8);
  },

  DEMO_PRODUCTS: [
    {id:'demo1',name:'V-STEAM 진공 스팀 다리미 Pro',category:'생활가전',brand:'LIVEBOX CARE',price:68000,original:105000,stock:50,status:'판매중',badge:'LIVE',images:[],desc:'강력한 진공 스팀으로 깔끔하게 다려지는 프리미엄 다리미. 2,481명이 선택한 베스트셀러.',date:'2025-05-22'},
    {id:'demo2',name:'클린에어 공기청정기 5평용',category:'생활가전',brand:'LIVEBOX CARE',price:129000,original:169000,stock:30,status:'판매중',badge:'NEW',images:[],desc:'초미세먼지 99.9% 제거. 조용하고 강력한 공기청정.',date:'2025-05-22'},
    {id:'demo3',name:'듀얼 에어프라이어 6L 대용량',category:'주방가전',brand:'LIVEBOX KITCHEN',price:89000,original:138000,stock:20,status:'판매중',badge:'SALE',images:[],desc:'6L 대용량으로 4인 가족도 한번에. 기름 없이 바삭하게.',date:'2025-05-22'},
    {id:'demo4',name:'무선 핸디 청소기 25Kpa',category:'청소/세탁',brand:'LIVEBOX CLEAN',price:79000,original:99000,stock:40,status:'판매중',badge:'BEST',images:[],desc:'강력 흡입력 25Kpa. 가볍고 오래가는 배터리.',date:'2025-05-22'},
    {id:'demo5',name:'초음파 세탁조 클리너 UV살균',category:'청소/세탁',brand:'LIVEBOX CARE',price:45000,original:62000,stock:60,status:'판매중',badge:'NEW',images:[],desc:'UV 살균으로 세탁조 안 곰팡이 완벽 제거.',date:'2025-05-22'},
    {id:'demo6',name:'캡슐 커피머신 에스프레소 15bar',category:'주방가전',brand:'LIVEBOX KITCHEN',price:112000,original:178000,stock:15,status:'판매중',badge:'LIVE',images:[],desc:'카페 수준의 에스프레소를 집에서. 15bar 고압 추출.',date:'2025-05-22'},
    {id:'demo7',name:'스마트 LED 스탠드 조명 3색',category:'조명/인테리어',brand:'LIVEBOX LIGHT',price:38000,original:55000,stock:80,status:'판매중',badge:'NEW',images:[],desc:'주광색·주백색·전구색 3가지 모드. 터치 밝기 조절.',date:'2025-05-22'},
    {id:'demo8',name:'직수형 정수기 냉온정수 필터',category:'생활가전',brand:'LIVEBOX WATER',price:198000,original:280000,stock:10,status:'판매중',badge:'BEST',images:[],desc:'직수형으로 위생적인 냉온정수. 필터 교체 알림 기능.',date:'2025-05-22'},
  ],

  getActiveProducts(){
    const saved = this.getProducts().filter(p=>p.status==='판매중');
    return saved.length ? saved : this.DEMO_PRODUCTS;
  },

  BG: [
    'linear-gradient(145deg,#EEE8DF,#D8D0C0)',
    'linear-gradient(145deg,#E8EFF5,#D4E0EA)',
    'linear-gradient(145deg,#FFF0E8,#F5E0D0)',
    'linear-gradient(145deg,#EEE8F5,#E0D4EC)',
    'linear-gradient(145deg,#E8F5EE,#D4ECE0)',
    'linear-gradient(145deg,#FFF5E8,#F5E8D0)',
    'linear-gradient(145deg,#F5F0E8,#EDE8D8)',
    'linear-gradient(145deg,#E8F0F8,#D0E0F0)',
  ],
  ICONS: ['IRON','AIR','FRY','VAC','WASH','BREW','LAMP','PURE'],
};
